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
  return bubbleElement;
}

chatForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    chatPlaceholder.style.display = 'none';
    
    const msg = chatInput.value.trim();
    
    if (!msg) return chatForm.reset();
    generateBubble('user', msg);
    
    const aiResponse = { message: "sure" }; //chatAI(msg);
    generateBubble('ai', aiResponse.message);
    
    chatForm.reset();
  } catch (e) {
    console.error(e.message);
  }
});