import { init, updateGymInfo, journalsSave, journalsLoad, attendanceSave, attendanceLoad, attendanceClear, attendanceReset } from './handler.js';
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
    //journals save
  });
  
  journalsLoadBtn.addEventListener('click', async () => {
    //journals load
  });
  
  journalsClearBtn.addEventListener('click', () => {
    //journals clear
  });
  
  journalsResetBtn.addEventListener('click', async () => {
    //journals reset
  });
  
  attendanceSaveBtn.addEventListener('click', async () => {
    //attendance save
  });
  
  attendanceLoadBtn.addEventListener('click', async () => {
    //attendance load
  });
  
  attendanceClearBtn.addEventListener('click', () => {
    //attendance clear
  });
  
  attendanceResetBtn.addEventListener('click', async () => {
    //attendance reset
  });
});