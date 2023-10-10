const loginForm = document.getElementById('login_form');
const submitButton = document.getElementById('submit_button');

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
    if(result.message === “SUCCESS”){
      alert(“You are logged in.”);
      this.goToMain(index.html);
     } else {
         alert('Erreur lors de la connexion');
     }
  });
})