import { chatAI } from '../assets/js/handler.js';

const chatContainer = document.querySelector('.chat-window-container');
const chatPlaceholder = document.querySelector('.chat-window-placeholder');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

let messageHistory = [];

function generateBubble(role, message) {
  const bubbleElement = document.createElement('div');
  bubbleElement.classList.add('bubble', `bubble-${role}`);
  const bubbleMessageElement = document.createElement('p');
  bubbleMessageElement.textContent = message;
  bubbleElement.append(bubbleMessageElement);
  
  chatContainer.append(bubbleElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return bubbleElement;
}

chatForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    
    const msg = chatInput.value.trim();
    if (!msg) return;
    
    chatForm.reset();
    chatPlaceholder.style.display = 'none';
    messageHistory.push({ role: 'user', content: msg });
    generateBubble('user', msg);
    
    const aiResponse = await chatAI(msg, messageHistory);
    if (aiResponse.error) return generateBubble('ai', `Error: ${aiResponse.error}`);
    
    messageHistory.push({ role: 'assistant', content: aiResponse.response });
    generateBubble('ai', aiResponse.response);
    
    chatForm.reset();
  } catch (e) {
    console.error(e.message);
  }
});