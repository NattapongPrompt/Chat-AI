const express = require('express');
const bodyParser = require('body-parser');
const { loadModel, generateResponse } = require('./src/services/modelService');
const app = express();
const port = 3000;

// Initialize multiple agents
const agents = {
  'chat': null,
  'search': null,
  'image': null,
  'planning': null,
  'advice': null,
  'brainstorm': null
};

// Load models for each agent
async function initializeAgents() {
  try {
    agents.chat = await loadModel('llama2-7b');
    agents.search = await loadModel('llama2-7b');
    agents.image = await loadModel('stable-diffusion-v1-5');
    agents.planning = await loadModel('llama2-7b');
    agents.advice = await loadModel('llama2-7b');
    agents.brainstorm = await loadModel('llama2-7b');
    console.log('All agents initialized successfully');
  } catch (error) {
    console.error('Error initializing agents:', error);
  }
}

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" folder

// Initialize agents when server starts
initializeAgents();

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  
  if (!agents.chat) {
    return res.status(503).json({ response: 'Chat agent not ready' });
  }

  try {
    const response = await generateResponse(agents.chat, userMessage);
    res.json({ response });
  } catch (error) {
    console.error('Chat agent error:', error);
    res.status(500).json({ response: 'Sorry, something went wrong.' });
  }
});

app.post('/api/search', async (req, res) => {
  const query = req.body.query;
  
  if (!agents.search) {
    return res.status(503).json({ response: 'Search agent not ready' });
  }

  try {
    const response = await generateResponse(agents.search, `Search for: ${query}`);
    res.json({ results: response });
  } catch (error) {
    console.error('Search agent error:', error);
    res.status(500).json({ response: 'Sorry, something went wrong.' });
  }
});

app.post('/api/create-image', async (req, res) => {
  const prompt = req.body.prompt;
  
  if (!agents.image) {
    return res.status(503).json({ response: 'Image agent not ready' });
  }

  try {
    const response = await generateResponse(agents.image, prompt);
    res.json({ imageUrl: response });
  } catch (error) {
    console.error('Image agent error:', error);
    res.status(500).json({ response: 'Sorry, something went wrong.' });
  }
});

app.post('/api/make-plan', async (req, res) => {
  const task = req.body.task;
  
  if (!agents.planning) {
    return res.status(503).json({ response: 'Planning agent not ready' });
  }

  try {
    const response = await generateResponse(agents.planning, `Make a plan for: ${task}`);
    res.json({ plan: response });
  } catch (error) {
    console.error('Planning agent error:', error);
    res.status(500).json({ response: 'Sorry, something went wrong.' });
  }
});

app.post('/api/get-advice', async (req, res) => {
  const topic = req.body.topic;
  
  if (!agents.advice) {
    return res.status(503).json({ response: 'Advice agent not ready' });
  }

  try {
    const response = await generateResponse(agents.advice, `Give advice on: ${topic}`);
    res.json({ advice: response });
  } catch (error) {
    console.error('Advice agent error:', error);
    res.status(500).json({ response: 'Sorry, something went wrong.' });
  }
});

app.post('/api/brainstorm', async (req, res) => {
  const idea = req.body.idea;
  
  if (!agents.brainstorm) {
    return res.status(503).json({ response: 'Brainstorm agent not ready' });
  }

  try {
    const response = await generateResponse(agents.brainstorm, `Brainstorm ideas for: ${idea}`);
    res.json({ ideas: response });
  } catch (error) {
    console.error('Brainstorm agent error:', error);
    res.status(500).json({ response: 'Sorry, something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
