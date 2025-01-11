document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

document.getElementById('search-btn').addEventListener('click', function () {
  const query = prompt('Enter your search query:');
  if (query) {
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayMessage(`Search results: ${data.results}`, 'bot');
      })
      .catch((error) => {
        console.error('Error:', error);
        displayMessage('Sorry, something went wrong.', 'bot');
      });
  }
});

document.getElementById('create-image-btn').addEventListener('click', function () {
  const prompt = prompt('Enter a prompt to create an image:');
  if (prompt) {
    fetch('/api/create-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayMessage(`Image created: ${data.imageUrl}`, 'bot');
      })
      .catch((error) => {
        console.error('Error:', error);
        displayMessage('Sorry, something went wrong.', 'bot');
      });
  }
});

document.getElementById('make-plan-btn').addEventListener('click', function () {
  const task = prompt('Enter a task to make a plan:');
  if (task) {
    fetch('/api/make-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayMessage(`Plan: ${data.plan}`, 'bot');
      })
      .catch((error) => {
        console.error('Error:', error);
        displayMessage('Sorry, something went wrong.', 'bot');
      });
  }
});

document.getElementById('get-advice-btn').addEventListener('click', function () {
  const topic = prompt('Enter a topic to get advice:');
  if (topic) {
    fetch('/api/get-advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: topic }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayMessage(`Advice: ${data.advice}`, 'bot');
      })
      .catch((error) => {
        console.error('Error:', error);
        displayMessage('Sorry, something went wrong.', 'bot');
      });
  }
});

document.getElementById('brainstorm-btn').addEventListener('click', function () {
  const idea = prompt('Enter an idea to brainstorm:');
  if (idea) {
    fetch('/api/brainstorm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea: idea }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayMessage(`Brainstorming ideas: ${data.ideas}`, 'bot');
      })
      .catch((error) => {
        console.error('Error:', error);
        displayMessage('Sorry, something went wrong.', 'bot');
      });
  }
});

function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim();
  if (!userInput) return;

  // Display user message
  displayMessage(userInput, 'user');

  // Clear input
  document.getElementById('user-input').value = '';

  // Send message to backend (e.g., OpenAI API)
  fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display bot response
      displayMessage(data.response, 'bot');
    })
    .catch((error) => {
      console.error('Error:', error);
      displayMessage('Sorry, something went wrong.', 'bot');
    });
}

function displayMessage(message, sender) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${sender}-message`);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}