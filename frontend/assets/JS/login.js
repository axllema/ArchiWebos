const loginForm = document.getElementById('login_form');

/* 
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
*/

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const user = {
  email: email,
  password: password,
};

console.log(user)

fetch("http://localhost:5678/api/users/login");
