const targetUrl = 'https://gymscribe.vercel.app/dashboard/analytics.html';

function redirect() {
  setTimeout(() => {
    window.location.replace(targetUrl);
  }, 500);
}

window.addEventListener('DOMContentLoaded', (event) => {
  redirect();
});