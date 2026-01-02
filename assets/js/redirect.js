const targetUrl = 'https://gymscribe.vercel.app/dashboard/analytics.html';

function redirect() {
  window.location.replace(targetUrl);
}

window.addEventListener('DOMContentLoaded', (event) => {
  redirect();
});