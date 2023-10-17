let works = ("http://localhost:5678/api/works");
let categories = ("http://localhost:5678/api/categories");

const gallery = document.getElementById('gallery')
const portfolio = document.querySelector('#portfolio');

const header = document.querySelector('header')

const filters = document.querySelector(".filters");

let loginLink = document.getElementById('loginLink');

function createGallery(works) {
    works.forEach((work) => {
      // creating the HTML elements
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const figcaption = document.createElement('figcaption');
  
      // adding the data to those HTML elements
      image.src = work.imageUrl;
      image.alt = work.title;
      figcaption.textContent = work.title;
  
      // adding img & figcaption to figure
      figure.appendChild(image);
      figure.appendChild(figcaption);
  
      // & adding the HTML elements to the gallery
      gallery.appendChild(figure);
    });
}
  
async function getWorks() {
    const response = await fetch(works);
    const responseWork = await response.json();
    createGallery(responseWork);
}
getWorks();
  
async function getCategories() {
    const response = await fetch(categories);
    const responseCategorie = await response.json();

    for (let i = 0; i < responseCategorie.length; i++) {
        console.log(responseCategorie[i]);
    }
}
getCategories();


function isUserConnected(){
    const token = window.sessionStorage.getItem('token'); // Store the token in sessionStorage
    if (token) {
        return true;
    } else {
        return false;
    }
}
console.log('token')

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
                console.log('Token removed');
                updateLoginLink();
                window.location.href = 'index.html'; // Redirect to index.html when logging out
                console.log('Redirecting to index.html');
            } else {
                window.location.href = 'login.html'; // Redirect to login.html when clicking on login
                updateLoginLink();
                console.log('Redirecting to login.html');
            }
        });
    }

function updateFilters() {
    if (isUserConnected()) {
        filters.style.display = 'none';
    } else {
        filters.style.display = 'flex';
        filters.style.justifyContent = 'center';
        filters.style.gap = '10px';
        filters.style.marginBottom = '50px';
    }
}

updateFilters();

const modifButton = document.querySelector('.btn_modification');
const modifPortfolioButton = document.querySelector('.btn_portfolio');

function updateButtons() {
  if (isUserConnected()) {
    modifButton.style.display = 'block';
    modifPortfolioButton.style.display = 'block';
  } else {
    modifButton.style.display = 'none';
    modifPortfolioButton.style.display = 'none';
  }
}

updateButtons();


/*

TO DO : 
- find a way to have filters clickable to choose your category
- edit the page for when logged in (no more filters showing / modify button)

- modale - https://www.w3schools.com/howto/howto_css_modals.asp
+ https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
*/


