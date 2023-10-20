let works = ("http://localhost:5678/api/works");
let categories = ("http://localhost:5678/api/categories");

const gallery = document.getElementById('gallery')
const portfolio = document.querySelector('#portfolio');

let loginLink = document.getElementById('loginLink');

const body = document.body;

async function getWorks() {
  const response = await fetch(works);
  const responseWork = await response.json();
  createGallery(responseWork);
}
getWorks();

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
    } else {
        loginLink.textContent = 'login';
    }
}

updateLoginLink();

function logout() {
        loginLink.addEventListener('click', (event) => {
            if (isUserConnected()) {
                window.sessionStorage.removeItem('token');
                updateLoginLink();
            } else {
                window.location.href = 'login.html'; // Redirect to login.html when clicking on login
                updateLoginLink();
            }
        });
    }

    async function getCategories() {
      const response = await fetch(categories);
      const responseCategorie = await response.json();
    
      for (let i = 0; i < responseCategorie.length; i++) {
          console.log(responseCategorie[i]);
      }
    }
    getCategories();

/* FILTERS */

const filtersContainer = document.querySelector(".filters");
const allFilters = document.querySelector(".btn_filters");

async function createFilterButtons() {
  const filterData = [
      { id: 'all', text: 'Tous' },
      { id: 'objects', text: 'Objets' },
      { id: 'apartments', text: 'Appartements' },
      { id: 'hotels', text: 'Hôtel & restaurants' },
  ];
  
  filterData.forEach((filter) => {
      const filterButton = document.createElement("div");
      filterButton.classList.add("btn_filters");
      filterButton.dataset.filter = filter.id;
      filterButton.textContent = filter.text;
  
      filterButton.addEventListener("click", activatedFilter);
  
      filtersContainer.appendChild(filterButton);
  });
  }
  
  function activatedFilter(event) {
  const selectedFilter = event.target.dataset.filter;
  
  // Remove 'btn_active' class from all filter buttons
  const filterButtons = document.querySelectorAll(".btn_filters");
  filterButtons.forEach((button) => {
      button.classList.remove("btn_active");
  });
  
  // Add 'btn_active' class to the clicked filter button
  event.target.classList.add("btn_active");
  
  // Use the selectedFilter for filtering the gallery items
  // You can add your filtering logic here
  // Example: filterGallery('all');
  //Example: filterGallery('objects');
   //Example: filterGallery('apartments');
      //Example: function filterGallery('hotels');
  }
  
  // Call the createFilterButtons function to generate the buttons
  createFilterButtons();

/* END FILTERS */

function updateFilters() {
    if (isUserConnected()) {
      filtersContainer.style.display = 'none';
    } else {
      filtersContainer.style.display = 'flex';
      filtersContainer.style.justifyContent = 'center';
      filtersContainer.style.gap = '10px';
      filtersContainer.style.marginBottom = '50px';
    }
}

updateFilters();

const modifPortfolioButton = document.querySelector('.btn_portfolio');

function updateButtons() {
  if (isUserConnected()) {
    modifPortfolioButton.style.display = 'flex';
  } else {
    modifPortfolioButton.style.display = 'none';
  }
}
updateButtons();

/* edition mode, black thingy at the top of homepage */

const editLine = document.querySelector('.edition_mode');

function showBanner() {
    if (isUserConnected()) {
      editLine.style.display = 'flex';
      editLine.style.position = 'fixed';
      body.style.paddingTop = '55px';

    } else {
      editLine.style.display = 'none';
    }
  }
  showBanner();


/* MODAL */

const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");

const modalGallery = document.createElement("div");
modalGallery.classList.add("modal-gallery");
// 'modalGallery' is the "child" of 'modal', meaning it's displayed inside the 'modal', on the webpage
modal.appendChild(modalGallery)

const btnModal = document.getElementById("btn_open_modal");
// Get the <span> element that closes the modal - [0] is used to get the first element with the class "close."
const span = document.getElementsByClassName("close")[0];


btnModal.onclick = function() {
  modal.style.display = "flex";
}

span.onclick = function() {
  modal.style.display = "none";
}

const addPhotoBtn = document.createElement("div");
  addPhotoBtn.classList.add("addPhotoBtn");
  modal.appendChild(addPhotoBtn);

  const addPhotoBtnText = document.createElement("p");
  addPhotoBtnText.innerText = "Ajouter une photo";
  addPhotoBtn.appendChild(addPhotoBtnText);

  const hrLine = document.createElement("hr");
  modal.appendChild(hrLine);


/*
TO DO : 
- find a way to have filters clickable to choose your category + clean code and make it better and more simple !

- shows gallery in modale
- put the little grey line (hr) at the right place
- put the add photo btn at the right place
- add / delete pictures in the modale !
- 
*/