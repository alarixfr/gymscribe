const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');

let opened = false;

burger.addEventListener('click', () => {
  if (opened === true) return;
  opened = true;
  burger.classList.add('open');
  if (navbar.style.display === 'none') {
    navbar.style.display = 'flex';
  } else {
    navbar.style.display = 'none';
  }
  setTimeout(() => {
    burger.classList.remove('open');
    opened = false;
  }, 200);
});
