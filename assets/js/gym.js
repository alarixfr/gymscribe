import { init, updateGymInfo, journalsSave, journalsLoad, journalsClear, journalsReset, attendanceSave, attendanceLoad, attendanceClear, attendanceReset } from './handler.js';
import { initGymInfo } from './getGymInfo.js';

const form = document.getElementById('gymSettingForm');
const nameInput = document.getElementById('nameInput');
const ownerInput = document.getElementById('ownerInput');
const addressInput = document.getElementById('addressInput');
const descInput = document.getElementById('descInput');
const submitBtn = document.getElementById('form-submit');

const journalsSaveBtn = document.getElementById('journals-save');
const journalsLoadBtn = document.getElementById('journals-load');
const journalsClearBtn = document.getElementById('journals-clear');
const journalsResetBtn = document.getElementById('journals-reset');

const attendanceSaveBtn = document.getElementById('attendance-save');
const attendanceLoadBtn = document.getElementById('attendance-load');
const attendanceClearBtn = document.getElementById('attendance-clear');
const attendanceResetBtn = document.getElementById('attendance-reset');

let allowClick = true;

document.addEventListener('DOMContentLoaded', async (e) => {
  await init();
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Updating...';
    
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const gymData = {
        name: nameInput.value.trim(),
        owner: ownerInput.value.trim(),
        description: descInput.value.trim(),
        address: addressInput.value.trim(),
        timezone: userTimezone
      };
      
      const result = await updateGymInfo(gymData);
      if (result?.error) throw new Error(result.error);
    } catch (error) {
      console.error(error.message);
    } finally {
      await initGymInfo();
      nameInput.value = '';
      ownerInput.value = '';
      descInput.value = '';
      addressInput.value = '';
        
      setTimeout(() => {
        submitBtn.textContent = 'Update';
        submitBtn.disabled = false;
      }, 2000);
    }
  });
  
  journalsSaveBtn.addEventListener('click', async () => {
    if (!allowClick) return;
    
    allowClick = false;
    journalsSaveBtn.disabled = true;
    journalsSaveBtn.textContent = 'Loading...';
    await journalsSave();
    setTimeout(() => {
      journalsSaveBtn.textContent = 'Save data to server';
      journalsSaveBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
  
  journalsLoadBtn.addEventListener('click', async () => {
    if (!allowClick) return;
    
    allowClick = false;
    journalsLoadBtn.disabled = true;
    journalsLoadBtn.textContent = 'Loading...';
    await journalsLoad();
    setTimeout(() => {
      journalsLoadBtn.textContent = 'Load data from server';
      journalsLoadBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
  
  journalsClearBtn.addEventListener('click', () => {
    if (!allowClick) return;
    
    allowClick = false;
    journalsClearBtn.disabled = true;
    journalsClearBtn.textContent = 'Loading...';
    journalsClear();
    setTimeout(() => {
      journalsClearBtn.textContent = 'Clear local data';
      journalsClearBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
  
  journalsResetBtn.addEventListener('click', async () => {
    if (!allowClick) return;
    
    allowClick = false;
    journalsResetBtn.disabled = true;
    journalsResetBtn.textContent = 'Loading...';
    await journalsReset();
    setTimeout(() => {
      journalsResetBtn.textContent = 'Clear local and server data';
      journalsResetBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
  
  attendanceSaveBtn.addEventListener('click', async () => {
    if (!allowClick) return;
    
    allowClick = false;
    attendanceSaveBtn.disabled = true;
    attendanceSaveBtn.textContent = 'Loading...';
    await attendanceSave();
    setTimeout(() => {
      attendanceSaveBtn.textContent = 'Save data to server';
      attendanceSaveBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
  
  attendanceLoadBtn.addEventListener('click', async () => {
    if (!allowClick) return;
    
    allowClick = false;
    attendanceLoadBtn.disabled = true;
    attendanceLoadBtn.textContent = 'Loading...';
    await attendanceLoad();
    setTimeout(() => {
      attendanceLoadBtn.textContent = 'Load data from server';
      attendanceLoadBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
  
  attendanceClearBtn.addEventListener('click', () => {
    if (!allowClick) return;
    
    allowClick = false;
    attendanceClearBtn.disabled = true;
    attendanceClearBtn.textContent = 'Loading...';
    attendanceClear();
    setTimeout(() => {
      attendanceClearBtn.textContent = 'Clear local data';
      attendanceClearBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
  
  attendanceResetBtn.addEventListener('click', async () => {
    if (!allowClick) return;
    
    allowClick = false;
    attendanceResetBtn.disabled = true;
    attendanceResetBtn.textContent = 'Loading...';
    await attendanceReset();
    setTimeout(() => {
      attendanceResetBtn.textContent = 'Clear local and server data';
      attendanceResetBtn.disabled = false;
      allowClick = true;
    }, 2000);
  });
});