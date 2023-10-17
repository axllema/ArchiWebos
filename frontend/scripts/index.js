let works = ("http://localhost:5678/api/works");
let categories = ("http://localhost:5678/api/categories");

const gallery = document.getElementById('gallery')
const portfolio = document.querySelector('#portfolio');

const header = document.querySelector('header')

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

const filters = document.querySelector(".filters");

console.log(filters)


/*
const filters = document.querySelector(".filters");

TO DO : 
- add the filters elements ()
- find a way to have filters clickable to choose your category
- change login to logout when connected (toggle ?)
- edit the page for when logged in 

if (localStorage.token) {
...
}

- filter only here when not connected

- modale - https://www.w3schools.com/howto/howto_css_modals.asp
+ https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
*/


