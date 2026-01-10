import { getGymInfo } from './handler.js';

function getDate() {
  const now = new Date();
  
  const formattedDate = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  return formattedDate;
}

async function initGymInfo() {
  const gymName = document.getElementById('gymInfoName');
  const gymId = document.getElementById('gymInfoId');
  const date = document.getElementById('gymInfoDate');
  
  try {
    date.textContent = getDate();
    gymName.textContent = 'Fetching gym data...';
    gymId.textContent = 'Fetching gym data...';
    
    const gym = await getGymInfo();
    
    if (gym.name === 'none' || gym.name === '') {
      gymName.textContent = 'Untitled, rename your gym on the "gym" page!';
    } else {
      gymName.textContent = gym.name;
    }
    gymId.textContent = `ID: ${gym.id}`;
  } catch (error) {
    console.error(`Error fetching gym info: ${error.message}`);
  }
}

initGymInfo();

export { initGymInfo };