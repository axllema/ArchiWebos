const loginForm = document.getElementById('login_form');
let loginLink = document.getElementById('loginLink');

function redirectHomepage() {
    window.location.href = 'index.html';
}

loginForm.addEventListener('submit', async function (event) {
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
        body: JSON.stringify(user),
    })
    .then((response) => response.json())
    .then((result) => {
        if (result && result.token) {
            alert('Bienvenue!');
            window.sessionStorage.setItem('token', result.token);
            updateLoginLink();
            redirectHomepage();
        } else {
            alert('Identifiant ou mot de passe incorrect.');
        }
    });
});

function isUserConnected() {
    const token = window.sessionStorage.getItem('token');
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