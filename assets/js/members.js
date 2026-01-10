import { init, getMembers } from './handler.js';
import { createModal, deleteModal } from './modal.js';

const allCount = document.getElementById('allCount');
const activeCount = document.getElementById('activeCount');
const expiresSoonCount = document.getElementById('expiresSoonCount');
const expiredCount = document.getElementById('expiredCount');
const attendedCount = document.getElementById('attendedCount');
const absenceCount = document.getElementById('absenceCount');

const viewButtons = document.querySelectorAll('.view-btn');
const editButtons = document.querySelectorAll('.edit-btn');
const renewButtons = document.querySelectorAll('.renew-btn');
const removeButtons = document.querySelectorAll('.remove-btn');

let members;

async function loadMembers() {
  try {
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

viewButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    createModal('memberView', 'Alarixfr', '123', '67/67/6767', "very nice modal i guess");
  });
});

editButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    createModal('memberEdit');
  });
});

renewButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    createModal('memberRenew');
  });
});

removeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    createModal('memberRemove');
  });
});

(async () => {
  await loadMembers;
})();