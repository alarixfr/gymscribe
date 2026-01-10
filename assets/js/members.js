import { init, getMembers } from './handler.js';
import { createModal, deleteModal } from './modal.js';

const viewButtons = document.querySelectorAll('.view-btn');
const editButtons = document.querySelectorAll('.edit-btn');
const renewButtons = document.querySelectorAll('.renew-btn');
const removeButtons = document.querySelectorAll('.remove-btn');

let members;

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