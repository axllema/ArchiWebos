const loginForm = document.getElementById('login_form');
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

      const token = result.token;
      window.sessionStorage.setItem("token", token); // Store the token in sessionStorage
      console.log('token', token);

    if (token) {
      // Changer le texte en "logout" si le token est présent
      const loginLink = document.getElementById("loginLink");
      // "textcContent" : used to set or get text content - in this case, it changes if the token is found
      loginLink.textContent = 'logout';
    }

    // Redirect to the homepage
    redirectHomepage();
    } else {
      alert('Identifiant ou mot de passe incorrect.');
    }
  });
})


/*
TO DO : 
- find a way to still be connected on the homepage, with the token
*/