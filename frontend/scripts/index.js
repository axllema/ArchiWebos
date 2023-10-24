let works = 'http://localhost:5678/api/works';
const gallery = document.getElementById('gallery');

// Fetch works data from the API
async function getWorks() {
  try {
    // Send a GET request to the 'works' API endpoint to fetch the list of works
    const response = await fetch(works);
    // Check if the response status is okay (HTTP status 200)
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    // Parse the response body as JSON and store it in 'responseWork'
    const responseWork = await response.json();
    // Call the 'createGallery' function and pass the parsed works data to it
    createGallery(responseWork);
  } catch (error) {
    // Handle errors, such as network issues or failed requests
    console.error('Error fetching data:', error);
  }
}
getWorks();

// Create HTML elements for each work and add them to the gallery
function createGallery(works) {
  works.forEach((work) => {
    // Creating the HTML elements
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    // Adding the data to those HTML elements
    image.src = work.imageUrl;
    image.alt = work.title;
    figcaption.textContent = work.title;

    figure.setAttribute('data-category', work.category.id);
    /* Setting the data-category attribute with the category ID - this allows us to associate each image with a specific category for filtering. */
    console.log('Item category:', work.category);

    // Adding img & figcaption to figure
    figure.appendChild(image);
    figure.appendChild(figcaption);

    // Adding the HTML elements to the gallery
    gallery.appendChild(figure);
  });
}

// Check if the user is connected (has a token in sessionStorage)
function isUserConnected() {
  const token = window.sessionStorage.getItem('token'); // Store the token in sessionStorage
  if (token) {
    return true;
  } else {
    return false;
  }
}

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

/* FILTERS */
const filtersArray = [];
// Initializes the variable with an empty array - used to store or manage data related to filters

const filtersContainer = document.querySelector('.filters_div');
const allFilters = document.querySelector('.btn_filters');

async function createFilterButtons() {
  const categoriesResponse = await fetch('http://localhost:5678/api/categories');
  // Fetch the categories data from the API
  const categoryData = await categoriesResponse.json();

  // Create a "Tous" button (All)
  const allFilterButton = document.createElement('div');
  allFilterButton.classList.add('btn_filters', 'btn_active');
  allFilterButton.dataset.filter = 'all';
  allFilterButton.textContent = 'Tous';
  // Makes the "Tous/all" button being in the <div class="filters_div"> - filtersContainer is the parent of allFilterButton
  filtersContainer.appendChild(allFilterButton);

  allFilterButton.addEventListener('click', activatedFilter);

  categoryData.forEach((category) => {
    const filterButton = document.createElement('div');
    filterButton.classList.add('btn_filters');
    filterButton.dataset.filter = category.id;
    // Store the category ID as a data attribute
    filterButton.textContent = category.name;

    filterButton.addEventListener('click', activatedFilter);

    filtersContainer.appendChild(filterButton);
  });
}

// Call the createFilterButtons function to generate the buttons
createFilterButtons();

function activatedFilter(event) {
  const selectedFilter = event.target.dataset.filter;
  console.log('Selected filter:', selectedFilter);

  const filterButtons = document.querySelectorAll('.btn_filters');

  // Remove 'btn_active' class from all filter buttons
  filterButtons.forEach((button) => {
    button.classList.remove('btn_active');
  });

  // Add 'btn_active' class to the clicked filter button
  event.target.classList.add('btn_active');

  filterGallery(selectedFilter);
}

function filterGallery(selectedFilter) {
  // Selects all the figure elements with the class "gallery" and stores them in 'galleryItems'.
  const galleryItems = document.querySelectorAll('.gallery figure');

  // Loops through each figure element in the gallery
  galleryItems.forEach((item) => {
    // Get the category of the current item from its data attribute
    const itemCategory = item.dataset.category;
    console.log(itemCategory);
    /* Check if the selectedFilter is "all" or matches the item's category -
    '===' checks if selectedFilter is exactly equal to "all." If not exactly equal -> moves to the second condition.
    '||' logical OR operator - allows to combine conditions, checks if 'selectedFilter' is equal to "all" or if it is equal to 'itemCategory'. */
    if (selectedFilter === 'all' || selectedFilter === itemCategory) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// When the page is loaded, directly shows ALL the works by default
filterGallery('all');

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

/* END FILTERS */

const modifPortfolioButton = document.querySelector('.btn_portfolio');

function updateButtons() {
  if (isUserConnected()) {
    modifPortfolioButton.style.display = 'flex';
  } else {
    modifPortfolioButton.style.display = 'none';
  }
}
updateButtons();

/* Edition mode, black thingy at the top of homepage */

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

/* Works for modal */

async function getWorksForModal() {
  // Call your function to populate the modal
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();

  const modalGallery = document.querySelector('.modal-gallery');
  modalGallery.innerHTML = '';

// Loop through the data from the API to create elements
data.forEach((item, index) => {
  const workElement = document.createElement('figure');
  workElement.classList.add('figureModal');
  // Generate a unique ID for each <figure> element based on the work's ID
  const dynamicId = item.id;
  // Create a unique ID by combining "figureModal" and the dynamic ID
  const concatenedId = 'figureModal' + dynamicId;
  // Set the ID of the <figure> element to the unique ID
  workElement.id = concatenedId;
  modalGallery.appendChild(workElement);

  const imgWorkElement = document.createElement('img');
  imgWorkElement.src = item.imageUrl;
  imgWorkElement.classList.add('imgModal');
  workElement.appendChild(imgWorkElement);

  // Create a container for other actions (delete, add, ...)
  const trashContainer = document.createElement('div');
  trashContainer.classList.add('figureContainer', 'trashContainer');
  workElement.appendChild(trashContainer);

  // Create an icon for deleting the work - later on
  const trashElement = document.createElement('i');
  trashElement.classList.add('fa-solid', 'fa-trash-can');
  trashContainer.appendChild(trashElement);
}); 
}

/* MODAL */

const modal = document.getElementById('myModal');
const modalContent = document.querySelector('.modal-content');

const modalGallery = document.createElement('div');
modalGallery.classList.add('modal-gallery');
// 'modalGallery' is the "child" of 'modal', meaning it's displayed inside the 'modal', on the webpage
modal.appendChild(modalGallery);

const btnModal = document.getElementById('btn_open_modal');
// Get the <span> element that closes the modal - [0] is used to get the first element with the class "close."
const span = document.getElementsByClassName('close')[0];

btnModal.onclick = function() {
  modal.style.display = 'flex';
  getWorksForModal();
};

span.onclick = function() {
  modal.style.display = 'none';
};

const addPhotoBtn = document.createElement('div');
addPhotoBtn.classList.add('addPhotoBtn');
modal.appendChild(addPhotoBtn);

const addPhotoBtnText = document.createElement('p');
addPhotoBtnText.innerText = 'Ajouter une photo';
addPhotoBtn.appendChild(addPhotoBtnText);

const hrLine = document.createElement('hr');
modal.appendChild(hrLine);


/*
TO DO : 
- add / delete pictures in the modale !
- 

*/