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

  //Test

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
    if (result && result.token){
    // if result = truthy and result.token = truthy, so we're logged in
      alert('Bienvenue!');
      saveToken();
      redirectHomepage();
     } else {
         alert('Identifiant ou mot de passe incorrect.');
     }
  });
})




/*
async function saveToken() {
  const token = ###.token;
  console.log(token)

  sessionStorage.setItem("token", token);
}

 TO DO : 
- find a way to save the token ( session storage ? local storage ?)
- 

window.localStorage.setItem
Window.sessionStorage

const token = sessionStorage.getItem('token');

*/