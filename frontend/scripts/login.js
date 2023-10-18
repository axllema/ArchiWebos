const loginForm = document.getElementById('login_form');
let loginLink = document.getElementById('loginLink');

function redirectHomepage() {
  // returns the href (URL) of the current page - https://www.scaler.com/topics/javascript-window-location/
  window.location.href = 'index.html';
}

loginForm.addEventListener('submit', async function (event) {

  //prevent refreshing the whole page every time the button is clicked
  event.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const user = {
    email: email.value,
    password: password.value
  };

await fetch('http://localhost:5678/api/users/login', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  /* assigning an object with keys that represent the information the server needs
  JSON.stringify() means we are sending the information in a string form to the server */
  body: JSON.stringify(user),
  })
  .then((response) => response.json())
  .then((result) => {
    if (result && result.token) {
      // If result is truthy and result.token is truthy, we're logged in
      alert('Bienvenue!');
      window.sessionStorage.setItem('token', result.token); // Store the token in sessionStorage
      updateLoginLink(); // Update login link text
    // Redirect to the homepage
    redirectHomepage();
    } else {
      alert('Identifiant ou mot de passe incorrect.');
    }
  });
})

function isUserConnected(){
  const token = window.sessionStorage.getItem('token'); // Store the token in sessionStorage
  console.log('token', token);
  if (token) {
      return true;
  } else {
      return false;
  }
}
function updateLoginLink() {
  if (isUserConnected()) {
      loginLink.textContent = 'logout';
      loginLink.style.fontSize = '1.2em';
  } else {
      loginLink.textContent = 'login';
      loginLink.style.fontSize = '1.2em';
  }
}

function logout() {
  loginLink.addEventListener('click', (event) => {
    if (isUserConnected()) {
      window.sessionStorage.removeItem('token');
      updateLoginLink();
  }
});
}

/*
TO DO : 
- have an error message when email not right
- have another error message when password not right

- try to have a modal for the forgotten password?
*/
