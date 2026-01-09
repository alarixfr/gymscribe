const API_URL = "https://gymscribe.up.railway.app";
const STORAGE_KEY = 'gymscribe-auth';

function isStorageExist() {
  if (typeof(Storage) === undefined) {
    return false;
  }
  return true;
}

async function getChallenge() {
  try {
    const response = await fetch(`${API_URL}/auth/challenge`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch altcha challenge');
    }
    
    return data.challenge;
  } catch (error) {
    return { error: error.message };
  }
}

async function register(email, password, altchaPayload) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        altchaPayload
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch auth register');
    }
    
    if (isStorageExist()) {
      localStorage.setItem(STORAGE_KEY, data.token);
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function login(email, password, altchaPayload) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        altchaPayload
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch auth login');
    }
    
    if (isStorageExist()) {
      localStorage.setItem(STORAGE_KEY, data.token);
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function getGym() {
  try {
    
  } catch (error) {
    
  }
}

export { API_URL, getChallenge, register, login };