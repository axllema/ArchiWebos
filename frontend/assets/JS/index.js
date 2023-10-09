
let works = ("http://localhost:5678/api/works");
let categories = ("http://localhost:5678/api/categories");

const gallery = document.getElementById('gallery')
const portfolio = document.querySelector('#portfolio');

function createGallery(works) {
    works.forEach((work) => {
      // on crée les éléments HTML
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const figcaption = document.createElement('figcaption');
  
      // on ajoute les données aux éléments HTML
      image.src = work.imageUrl;
      image.alt = work.title;
      figcaption.textContent = work.title;
  
      // on ajoute l'img et le figcaption au figure
      figure.appendChild(image);
      figure.appendChild(figcaption);
  
      // on ajoute les éléments HTML à la gallery
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
  

