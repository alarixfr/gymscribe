const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');

let animating = false;

burger.addEventListener('click', () => {
  if (animating) return;
  animating = true;
  
  burger.classList.add('open');
  navbar.classList.toggle('show');
  
  setTimeout(() => {
    burger.classList.remove('open');
    animating = false;
  }, 200);
});
