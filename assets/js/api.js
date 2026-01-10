const API_URL = "https://gymscribe.up.railway.app";
const DASHBOARD_URL = 'https://gymscribe.vercel.app/dashboard/analytics.html';
const LOGIN_URL = 'https://gymscribe.vercel.app/login.html';
const STORAGE_KEY = 'gymscribe-auth';

function openDashboard() {
  window.location.replace(DASHBOARD_URL);
}

function openLogin() {
  window.location.replace(LOGIN_URL);
}

function isStorageExist() {
  if (typeof(Storage) === undefined) {
    return false;
  }
  return true;
}

function isAuthenticated() {
  if (!isStorageExist()) return false;
  
  const token = localStorage.getItem(STORAGE_KEY);
  return !!token;
}

function getToken() {
  return localStorage.getItem(STORAGE_KEY);
}

async function verifyToken() {
  try {
    const token = getToken();
    
    if (!token) return false;
    
    const response = await fetch(`${API_URL}/gym`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 401) {
      return false;
    }
    
    if (response.ok) return true;
    
    return false;
  } catch (error) {
    return false;
  }
}

function logout() {
  localStorage.removeItem(gymscribe-auth);
  openLogin();
}

function requireAuth() {
  if (!isAuthenticated()) {
    openLogin();
    return false;
  }
  return true;
}

async function init() {
  if (!requireAuth) {
    return;
  }
  
  try {
    const isValid = await verifyToken();
    
    if (!isValid) {
      logout();
      return;
    }
  } catch (error) {
    console.error(error.message);
  }
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

async function getGymInfo() {
  try {
    requireAuth();
    
    const token = getToken();
    
    const response = await fetch(`${API_URL}/gym`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch gym details');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function updateGymInfo(gymData) {
  try {
    requireAuth();
    
    const token = getToken();
    
    const response = await fetch(`${API_URL}/gym`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(gymData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update gym details');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export {
  API_URL,
  openDashboard,
  isAuthenticated,
  getToken,
  logout,
  requireAuth,
  init,
  getChallenge,
  register,
  login,
  getGymInfo,
  updateGymInfo
};