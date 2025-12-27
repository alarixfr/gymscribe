let method = 'login';

const message = document.getElementById('form-info');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

function toggleMethod(method) {
  if (method === "register") {
    registerBtn.disabled = true;
    loginBtn.disabled = false;
    registerBtn.classList.add('active-btn');
    if (loginBtn.classList.contains('active-btn')) {
      loginBtn.classList.remove('active-btn');
    }
    message.textContent = "Hello!";
    method = "register"
  } else {
    loginBtn.disabled = true;
    registerBtn.disabled = false;
    loginBtn.classList.add('active-btn')
    if (registerBtn.classList.contains('active-btn')) {
      registerBtn.classList.remove('active-btn');
    }
    message.textContent = "Welcome Back!";
    method = "login"
  }
}

loginBtn.addEventListener("click", (event) => {
  toggleMethod("login");
  event.preventDefault();
});
registerBtn.addEventListener("click", (event) => {
  toggleMethod("register");
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", (event) => {
  toggleMethod("login");
})