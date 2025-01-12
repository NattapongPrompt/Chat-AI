# Chat AI Backend Service

This is the backend service for the Chat AI application, built with FastAPI.

## Development Setup

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the development server**
   ```bash
   uvicorn main:app --reload
   ```

3. **Access the API**
   - Docs: http://localhost:8000/docs
   - Health check: http://localhost:8000/health

## Docker Setup

1. **Build the Docker image**
   ```bash
   docker-compose build
   ```

2. **Run the service**
   ```bash
   docker-compose up
   ```

3. **Access the API**
   - Docs: http://localhost:8000/docs
   - Health check: http://localhost:8000/health

## Environment Variables

Create a `.env` file with the following variables:
- `ENVIRONMENT`: development/production
- `API_VERSION`: API version
- `DEBUG`: true/false
