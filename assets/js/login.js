let method = 'login';

const message = document.getElementById('form-info');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const submitButton = document.getElementById('form-submit');

function openDashboard() {
  window.location.replace("https://gymscribe.vercel.app/dashboard/analytics.html");
}

function toggleMethod(method) {
  if (method === "register") {
    registerBtn.disabled = true;
    loginBtn.disabled = false;
    registerBtn.classList.add('active-btn');
    if (loginBtn.classList.contains('active-btn')) {
      loginBtn.classList.remove('active-btn');
    }
    message.textContent = "Hello!";
    submitButton.textContent = "Register";
    method = "register"
  } else {
    loginBtn.disabled = true;
    registerBtn.disabled = false;
    loginBtn.classList.add('active-btn')
    if (registerBtn.classList.contains('active-btn')) {
      registerBtn.classList.remove('active-btn');
    }
    message.textContent = "Welcome Back!";
    submitButton.textContent = "Login";
    method = "login"
  }
}

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  toggleMethod("login");
});
registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  toggleMethod("register");
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  openDashboard();
});

document.addEventListener("DOMContentLoaded", (event) => {
  toggleMethod("login");
})