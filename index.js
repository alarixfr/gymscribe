ScrollReveal({
  reset: false,
  delay: 100,
  origin: 'bottom',
  distance: '40px',
  easing: 'ease-out'
});

ScrollReveal().reveal('.load-hidden');

document.addEventListener('DOMContentLoaded', () => {
  console.log("Gymscribe")

  const menu = document.querySelector('.menu');
      
  function toggleMenu() {
    menu.classList.toggle('show');
  }
  
  window.toggleMenu = toggleMenu;
  
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => { menu.classList.remove('show');
    });
  });
});
