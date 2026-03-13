import { GB_EXERCISES_URL } from '../assets/js/handler.js';

const exercisesForm = document.getElementById('exercisesForm');
const exercisesContainer = document.getElementById('exercisesContainer');
const exercisesMetadataStatus = document.getElementById('exercisesMetadataStatus');
const exercisesMetadataFound = document.getElementById('exercisesMetadataFound');
const exercisesMetadataListed = document.getElementById('exercisesMetadataListed');

function apiTypeUrl(type) {
  switch (type) {
    case 'name':
      return 'api/v1/exercises/search';
    case 'bodyPart':
      return;
    case 'muscle':
      return;
    case 'equipment':
      return;
    default:
      return;
  }
}

async function fetchGymDB(type, search) {
  try {
    const typeUrl = apiTypeUrl(type);
    
    const response = await fetch(`${GB_EXERCISES_URL}/${typeUrl}?q='${search}'`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    exercisesMetadataStatus.textContent = `Status: ${data.success}`;
    exercisesMetadataFound.textContent = `Found: ${data.metadata.totalExercises}`;
    exercisesMetadataListed.textContent = `Listed: ${data.data.length}`;
    
    return data;
  } catch (e) {
    console.error(e.message);
  }
}

function generateExercise(id, name, gifUrl, targetMuscle, bodyPart, equipment, secondaryMuscle, instructions) {
  const exerciseElement = document.createElement('div');
  
}

exercisesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const type = document.getElementById('exercisesType').value;
  const search = document.getElementById('exercisesSearch').value;
  
  exercisesForm.reset();
  
  if (!type || !search) return;
  
  const data = await fetchGymDB(type, search);
});