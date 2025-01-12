from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import pandas as pd
import logging
import joblib
import os
from datetime import datetime
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.exceptions import NotFittedError

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configuration
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

class ModelInput(BaseModel):
    features: list[float]
    model_version: Optional[str] = "v1"

    @validator('features')
    def validate_features(cls, v):
        if not v:
            raise ValueError('Features cannot be empty')
        if len(v) < 2:
            raise ValueError('At least 2 features required')
        return v

# Model registry
MODEL_REGISTRY = {}

def load_model(version: str):
    model_path = os.path.join(MODEL_DIR, f"model_{version}.pkl")
    if os.path.exists(model_path):
        return joblib.load(model_path)
    return None

def save_model(version: str, model):
    model_path = os.path.join(MODEL_DIR, f"model_{version}.pkl")
    joblib.dump(model, model_path)

# Initialize default model
default_model = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])
MODEL_REGISTRY["v1"] = default_model

@app.post("/train")
async def train_model(data: list[dict], model_version: str = "v1"):
    try:
        if not data:
            raise HTTPException(status_code=400, detail="Training data cannot be empty")
            
        df = pd.DataFrame(data)
        if 'target' not in df.columns:
            raise HTTPException(status_code=400, detail="Target column is required")
            
        X = df.drop('target', axis=1)
        y = df['target']
        
        # Create new model instance
        new_model = Pipeline([
            ('scaler', StandardScaler()),
            ('classifier', LogisticRegression())
        ])
        
        new_model.fit(X, y)
        MODEL_REGISTRY[model_version] = new_model
        save_model(model_version, new_model)
        
        logger.info(f"Model {model_version} trained successfully")
        return {
            "message": "Model trained successfully",
            "model_version": model_version,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Training failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict(input_data: ModelInput):
    try:
        model = MODEL_REGISTRY.get(input_data.model_version)
        if not model:
            raise HTTPException(
                status_code=404,
                detail=f"Model version {input_data.model_version} not found"
            )
            
        prediction = model.predict([input_data.features])
        logger.info(f"Prediction made for version {input_data.model_version}")
        return {
            "prediction": int(prediction[0]),
            "model_version": input_data.model_version,
            "timestamp": datetime.now().isoformat()
        }
    except NotFittedError:
        raise HTTPException(
            status_code=400,
            detail="Model not trained yet"
        )
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/status")
async def status():
    return {
        "status": "ready",
        "model_versions": list(MODEL_REGISTRY.keys()),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/models")
async def list_models():
    return {
        "available_models": list(MODEL_REGISTRY.keys()),
        "timestamp": datetime.now().isoformat()
    }
