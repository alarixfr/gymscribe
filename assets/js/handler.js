const API_URL = "https://gymscribe.up.railway.app";
const DASHBOARD_URL = 'https://gymscribe.vercel.app/dashboard/analytics.html';
const LOGIN_URL = 'https://gymscribe.vercel.app/login.html';
const STORAGE_KEY = 'gymscribe-auth';
const EMAIL_KEY = 'gymscribe-email';
const ATTENDANCE_KEY = 'gymscribe-attendance';
const ATTENDANCE_LAST_KEY = 'gymscribe-attendance-last';
const JOURNALS_KEY = 'gymscribe-journals';

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
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(ATTENDANCE_KEY);
  localStorage.removeItem(ATTENDANCE_LAST_KEY);
  
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
  if (!requireAuth()) {
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
    logout();
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
      localStorage.setItem(EMAIL_KEY, data.user.email);
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
      localStorage.setItem(EMAIL_KEY, data.user.email);
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function getGymInfo() {
  try {
    if (!requireAuth()) return { error: 'Not authenticated' };
    
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
    if (!requireAuth()) return { error: 'Not authenticated'};
    
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

async function getMembers() {
  try {
    if (!requireAuth()) return { error: 'Not authenticated' };
    
    const token = getToken();
    const gymInfo = await getGymInfo();
    
    if (gymInfo.error) throw new Error(gymInfo.error);
    
    const timezone = gymInfo.timezone;
    
    const response = await fetch(`${API_URL}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`,
        "x-timezone": timezone
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch gym members');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function createMember(memberData) {
  try {
    if (!requireAuth()) return { error: 'Not authenticated' };
    
    const token = getToken();
    
    const response = await fetch(`${API_URL}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(memberData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to add gym member');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function updateMember(memberId, memberData) {
  try {
    if (!requireAuth()) return { error: 'Not authenticated' };
    
    const token = getToken();
    
    const response = await fetch(`${API_URL}/members/${memberId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(memberData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update member');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function deleteMember(memberId) {
  try {
    if (!requireAuth()) return { error: 'Not authenticated' };
    
    const token = getToken();
    
    const response = await fetch(`${API_URL}/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete member');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function renewMember(memberId, plan) {
  try {
    if (!requireAuth()) return { error: 'Not authenticated' };
    
    const token = getToken();
    
    const response = await fetch(`${API_URL}/members/${memberId}/renew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ plan })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to renew member plans');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function toggleAttendance(memberId) {
  try {
    if (!requireAuth()) return { error: 'Not authenticated' };
    
    const token = getToken();
    const gymInfo = await getGymInfo();
    
    if (gymInfo.error) throw new Error(gymInfo.error);
    
    const timezone = gymInfo.timezone;
    
    const response = await fetch(`${API_URL}/members/${memberId}/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-timezone': timezone
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to toggle member attendance');
    }
    
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

async function journalsSave(journalsData) {
  try {
    
  } catch (error) {
    return { error: error.message };
  }
}

async function journalsLoad() {
  try {
    
  } catch (error) {
    return { error: error.message };
  }
}

function journalsClear() {
  try {
    if (!isStorageExist()) throw new Error('Storage error');
    
    localStorage.removeItem(JOURNALS_KEY);
  } catch (error) {
    return { error: error.message };
  }
}

async function journalsReset() {
  try {
    
    
    journalsReset();
  } catch (error) {
    return { error: error.message };
  }
}

async function attendanceSave(attendanceData) {
  try {
    
  } catch {
    return { error: error.message };
  }
}

async function attendanceLoad() {
  try {
    
  } catch {
    return { error: error.message };
  }
}

function attendanceClear() {
  try {
    if (!isStorageExist()) throw new Error('Storage error');
    
    localStorage.removeItem(ATTENDANCE_KEY);
    localStorage.removeItem(ATTENDANCE_LAST_KEY);
  } catch(error) {
    return { error: error.message };
  }
}

async function attendanceReset() {
  try {
    
    
    attendanceClear();
  } catch (error) {
    return { error: error.message };
  }
}

export {
  API_URL,
  DASHBOARD_URL,
  EMAIL_KEY,
  ATTENDANCE_KEY,
  ATTENDANCE_LAST_KEY,
  JOURNALS_KEY,
  openDashboard,
  isStorageExist,
  isAuthenticated,
  getToken,
  logout,
  requireAuth,
  init,
  getChallenge,
  register,
  login,
  getGymInfo,
  updateGymInfo,
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  renewMember,
  toggleAttendance,
  journalsSave,
  journalsLoad,
  attendanceSave,
  attendanceLoad,
  attendanceClear,
  attendanceReset
};