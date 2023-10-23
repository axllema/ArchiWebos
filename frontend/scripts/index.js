let works = "http://localhost:5678/api/works";

async function getWorks() {
  const response = await fetch(works);
  const responseWork = await response.json();
  createGallery(responseWork);
}
getWorks();

const gallery = document.getElementById('gallery')

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
  
      figure.setAttribute('data-category', work.category);

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


let loginLink = document.getElementById('loginLink');

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

let categories = "http://localhost:5678/api/categories";

  async function getCategories() {
    const response = await fetch(categories);
    const responseCategorie = await response.json();

    for (let i = 0; i < responseCategorie.length; i++) {
        console.log(responseCategorie[i]);
    }
  }
  getCategories();

  

/* FILTERS */
const filtersArray = [];
// initializes the variable with an empty array - used to store or manage data related to filters

const filtersContainer = document.querySelector(".filters_div");
const allFilters = document.querySelector(".btn_filters");

  
/* allFilters.classList.add("filter");
allFilters.setAttribute("id", "selected");
filtersArray.push(allFilters); */

let currentIndex = 0;

async function createFilterButtons() {
  const filterData = [
      { id: 'all', text: 'Tous' },
      { id: 'objects', text: 'Objets' },
      { id: 'apartments', text: 'Appartements' },
      { id: 'hotels', text: 'Hôtel & restaurants' },
  ];
  
  /*   const filterSection = document.querySelector(".filters");
  const filterTous = document.createElement("div");
  filterTous.classList.add("filter");

  filterTous.setAttribute("id", "selected");
  filterTous.innerText = "Tous";
  filterSection.appendChild(filterTous);
  filtersArray.push(filterTous);
  const gallery = document.querySelector(".gallery");

  let currentIndex = 0; */ 
  filterData.forEach((filter) => {
      const filterButton = document.createElement("div");
      filterButton.classList.add("btn_filters");
      filterButton.dataset.filter = filter.id;
      filterButton.textContent = filter.text;
  
      filterButton.addEventListener("click", activatedFilter);
  
      filtersContainer.appendChild(filterButton);
  });
  }

    // Call the createFilterButtons function to generate the buttons */
    createFilterButtons();
  
  function activatedFilter(event) {
  const selectedFilter = event.target.dataset.filter;
  
  // Remove 'btn_active' class from all filter buttons
  const filterButtons = document.querySelectorAll(".btn_filters");
  filterButtons.forEach((button) => {
      button.classList.remove("btn_active");
  });
  
  // Add 'btn_active' class to the clicked filter button
  event.target.classList.add("btn_active");

  filterGallery(selectedFilter);
}

function filterGallery(selectedFilter) {
  const galleryItems = document.querySelectorAll(".gallery figure");

  galleryItems.forEach((item) => {
    const itemCategory = item.dataset.category;
    if (selectedFilter === "all" || selectedFilter === itemCategory) {
      item.style.display = "block"; 
    } else {
      item.style.display = "none"; 
    }
  });
}

// When the page is loaded, direclty shows ALL the works by default
filterGallery('all');

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
const body = document.body;

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