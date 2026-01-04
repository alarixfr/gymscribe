import createModal from './modal.js';

const viewButtons = document.querySelectorAll('.view-btn');

viewButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    createModal('memberView', 'Alarixfr', '123', '67/67/6767', "very nice modal i guess");
  });
});