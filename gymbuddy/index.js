import { chatAI } from '../assets/js/handler.js';

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

chatForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    
    const msg = chatInput.value;
    const aiResponse = chatAI(msg);
    
    console.log(aiResponse);
  } catch (e) {
    console.error(e.message);
  }
});