document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu') || document.querySelector('.navbar-content');
      
  function toggleMenu() {
    menu.classList.toggle('show');
  }
  
  window.toggleMenu = toggleMenu;
  
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { menu.classList.remove('show');
    });
  });
});