// get the login form and login link elements from the DOM
const loginForm = document.getElementById('login_form');
let loginLink = document.getElementById('loginLink');

// function to redirect to the homepage
function redirectHomepage() {
    window.location.href = 'index.html';
}

// event listener for the login form submission
loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // gets user input (email and password) from the form
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const user = {
        email: email.value,
        password: password.value
    };

    // sends a POST request to the server for user login
    await fetch('http://localhost:5678/api/users/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((result) => {
        if (result && result.token) {
        // if the server returns a valid toke
            alert('Bienvenue!');
            window.sessionStorage.setItem('token', result.token);
            // if login fails, show an alert
            updateLoginLink();
            redirectHomepage();
        } else {
            alert('Identifiant ou mot de passe incorrect.');
        }
    });
});

// function to check if the user is connected (logged in)
function isUserConnected() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
        return true;
    } else {
        return false;
    }
}

// function to update the login link in the UI based on the user's login status
function updateLoginLink() {
    if (isUserConnected()) {
        loginLink.textContent = 'logout';
        // if the user is connected, show "logout" in the login link
        loginLink.style.fontSize = '1.2em';
    } else {
        loginLink.textContent = 'login';
        // if the user is not connected, show "login" in the login link
        loginLink.style.fontSize = '1.2em';
    }
}

// adds event listener to the login link in the header
loginLink.addEventListener('click', (event) => {
    if (!isUserConnected()) {
    window.location.href = 'login.html';
    // if not logged in, redirect to login.html when clicking "login"
    }
});

  // function to log out the user
function logout() {
    loginLink.addEventListener('click', (event) => {
    // adds an event listener to the login link in the header
    if (isUserConnected()) {
        window.sessionStorage.removeItem('token');
        // if the user is logged in, remove the token to log them out
        updateLoginLink();
        window.location.href = window.location.href;
        // refreshes the current page after logging out to stay on login.js - but logged out
    }
    });
}
// calls the logout function to enable the "logout" functionality
logout();
