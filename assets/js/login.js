import { API_URL, register, login } from './api.js';
const DASHBOARD_URL = 'https://gymscribe.vercel.app/dashboard/analytics.html';

let method = 'login';
let altchaPayload = '';

const message = document.getElementById('form-info');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const submitButton = document.getElementById('form-submit');
const errorMessage = document.getElementById('error-message');
const altchaWidget = document.querySelector('altcha-widget');

function openDashboard() {
  window.location.replace(DASHBOARD_URL);
}

function errorMessageToggle(type) {
  if (type === "block") {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
  }
}

function toggleMethod(type) {
  if (type === "register") {
    registerBtn.disabled = true;
    loginBtn.disabled = false;
    registerBtn.classList.add('active-btn');
    if (loginBtn.classList.contains('active-btn')) {
      loginBtn.classList.remove('active-btn');
    }
    message.textContent = "Hello!";
    submitButton.textContent = "Register";
    method = "register";
  } else {
    loginBtn.disabled = true;
    registerBtn.disabled = false;
    loginBtn.classList.add('active-btn');
    if (registerBtn.classList.contains('active-btn')) {
      registerBtn.classList.remove('active-btn');
    }
    message.textContent = "Welcome Back!";
    submitButton.textContent = "Login";
    method = "login";
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
  
  const emailInput = document.getElementById('email-input').value;
  const passwordInput = document.getElementById('password-input').value;
  
  if (!emailInput.trim() || !passwordInput.trim()) {
    errorMessageToggle('block');
    errorMessage.textContent = 'Please enter valid credentials!';
    return;
  }
  
  if (passwordInput.length < 6) {
    errorMessageToggle('block');
    errorMessage.textContent = 'Password need to be 6 characters or more!';
    return;
  }
  
  try {
    if (!altchaPayload) {
      errorMessageToggle('block');
      errorMessage.textContent = 'Please complete captcha';
    }
    
    if (method === 'register') {
      register(emailInput, passwordInput, altchaPayload).then(result => {
        console.log(`User Registered: ${result.user}`);
      });
    } else if (method === 'login') {
      login(emailInput, passwordInput, altchaPayload).then(result => {
        console.log(`Logged In: ${result.user}`);
      });
    } else {
      throw new Error('Invalid Method');
    }
  } catch (error) {
    errorMessageToggle('block');
    errorMessage.textContent = `Error: ${error.message}`;
    if (altchaWidget) altchaWidget.reset();
  }
});

altchaWidget.addEventListener('verified', (event) => {
  altchaPayload = event.detail;
  errorMessageToggle('none');
});

toggleMethod("login");
errorMessageToggle("none");