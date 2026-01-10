import { init, getMembers } from './handler.js';

const allCount = document.getElementById('allCount');
const activeCount = document.getElementById('activeCount');
const expiresSoonCount = document.getElementById('expiresSoonCount');
const expiredCount = document.getElementById('expiredCount');
const attendedCount = document.getElementById('attendedCount');
const absenceCount = document.getElementById('absenceCount');

let members;

async function loadMembers() {
  try {
    await init();
    
    allCount.textContent = 'Fetching';
    activeCount.textContent = 'Fetching';
    expiresSoonCount.textContent = 'Fetching';
    expiredCount.textContent = 'Fetching';
    
    const memberData = await getMembers();
    
    if (members?.error) throw new Error(members.error);
    
    allCount.textContent = memberData.membersCount.all;
    activeCount.textContent = memberData.membersCount.active;
    expiresSoonCount.textContent = memberData.membersCount.expiresSoon;
    expiredCount.textContent = memberData.membersCount.expired;
    
    members = memberData.membersList;
  } catch (error) {
    console.error(error.message);
  }
}

loadMembers();