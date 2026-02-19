import { API_URL } from './handler.js';

const addressElement = document.getElementById('address');
const ipElement = document.getElementById('ip');
const regionElement = document.getElementById('region');

const statusElement = document.getElementById('status');
const pingElement = document.getElementById('ping');

const usersElement = document.getElementById('users');
const membersElement = document.getElementById('members');
const cachedElement = document.getElementById('cached');
const cacheAgeElement = document.getElementById('cacheAge');

const nameElement = document.getElementById('name');
const versionElement = document.getElementById('version');

const uptimeElement = document.getElementById('uptime');
const nodeElement = document.getElementById('node');
const osElement = document.getElementById('os');
const cpuElement = document.getElementById('cpu');

const totalMemoryElement = document.getElementById('total-memory');
const usedMemoryElement = document.getElementById('used-memory');

function addressFetch() {
  try {
    const data = API_URL;
    addressElement.textContent = data;
  } catch (e) {
    addressElement.textContent = 'ERROR: NOT FOUND';
  }
}

function ipFetch() {
  try {
    //todo
    const data = 'test';
    ipElement.textContent = data;
  } catch (e) {
    ipElement.textContent = 'ERROR: COULDNT CONNECT';
  }
}

function regionFetch() {
  try {
    //todo
    const data = 'test';
    regionElement.textContent = data;
  } catch (e) {
    regionElement.textContent = 'ERROR: COULDNT CONNECT';
  }
}

async function statusFetch() {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      statusElement.textContent = `${response.status} - offline`;
      return;
    }
    
    statusElement.textContent = `${response.status} - ${data.status}`;
  } catch (e) {
    statusElement.textContent = 'ERROR: COULDNT CONNECT';
  }
}

function pingFetch() {
  try {
    //todo
  } catch (e) {
    pingElement.textContent = 'ERROR: COULDNT CONNECT';
  }
}

async function statsFetch() {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!reponse.ok) {
      throw new Error('ERROR: COULDNT CONNECT');
    }
    
    usersElement.textContent = data.stats.totalAccounts;
    membersElement.textContent = data.stats.totalMembers;
  } catch (e) {
    usersElement.textContent = 'ERROR: COULDNT CONNECT';
    membersElement.textContent = 'ERROR: COULDNT CONNECT';
  }
}

async function cacheFetch() {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!reponse.ok) {
      throw new Error('ERROR: COULDNT CONNECT');
    }
    
    cachedElement.textContent = data.cache.cached;
    cacheAgeElement.textContent = data.cache.cacheAge;
  } catch (e) {
    cachedElement.textContent = 'ERROR: COULDNT CONNECT';
    cacheAgeElement.textContent = 'ERROR: COULDNT CONNECT';
  }
}

async function advancedFetch() {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = response.json();
    
    if (!response.ok) {
      throw new Error('ERROR: COULDNT CONNECT');
    }
    
    nameElement.textContent = data.name;
    versionElement.textContent = data.version;
    
    uptimeElement.textContent = data.system.uptime;
    nodeElement.textContent = data.system.node;
    osElement.textContent = data.system.platform;
    cpuElement.textContent = data.system.cpu;
    
    totalMemoryElement.textContent = data.memory.total;
    usedMemoryElement.textContent = data.memory.used;
  } catch (e) {
    nameElement.textContent = 'ERROR: COULDNT CONNECT';
    versionElement.textContent = 'ERROR: COULDNT CONNECT';
    
    uptimeElement.textContent = 'ERROR: COULDNT CONNECT';
    nodeElement.textContent = 'ERROR: COULDNT CONNECT';
    osElement.textContent = 'ERROR: COULDNT CONNECT';
    cpuElement.textContent = 'ERROR: COULDNT CONNECT';
    
    totalMemoryElement.textContent = 'ERROR: COULDNT CONNECT';
    usedMemoryElement.textContent = 'ERROR: COULDNT CONNECT';
  }
}

async function init() {
  try {
    addressFetch();
    await statusFetch();
    await statsFetch();
    await cacheFetch();
    await advancedFetch();
  } catch (e) {
    console.error(e.message);
  }
}

setInterval(async () => {
  await init();
}, 30000);

await init();