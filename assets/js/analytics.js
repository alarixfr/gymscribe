import { init } from './handler.js';

const allCount = document.getElementById('allCount');
const activeCount = document.getElementById('activeCount');
const expiresSoonCount = document.getElementById('expiresSoonCount');
const expiredCount = document.getElementById('expiredCount');
const attendedCount = document.getElementById('attendedCount');
const absenceCount = document.getElementById('absenceCount');

let member;

async function loadMembers() {
  try {
    await init();
    allCount.textContent = 'Fetching...';
    activeCount.textContent = 'Fetching...';
    expiresSoonCount.textContent = 'Fetching...';
    expiredCount.textContent = 'Fetching...';
    
    await init();
    members = await getMembers();
    
    if (members?.error) throw new Error(members.error);
    
    allCount.textContent = members.membersCount.all;
    activeCount.textContent = members.membersCount.active;
    expiresSoonCount.textContent = members.membersCount.expiresSoon;
    expiredCount.textContent = members.membersCount.expired;
  } catch (error) {
    console.error(error.message);
  }
}

loadMembers();