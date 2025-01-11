import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const controller = new AbortController();
    const signal = controller.signal;

    // Handle client disconnect
    req.on('close', () => {
      controller.abort();
    });

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Simulate streaming response
    const responseText = "This is a simulated streaming response from ChatGPT.";
    const words = responseText.split(' ');
    
    for (const word of words) {
      if (signal.aborted) {
        res.end();
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
      res.write(`data: ${JSON.stringify({ content: word + ' ' })}\n\n`);
    }

    res.end();
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
