const API_URL = "https://gymscribe.up.railway.app/";

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
      throw new Error('Failed to fetch altcha challenge');
    }
    
    return data.challenge;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

export { API_URL, getChallenge };