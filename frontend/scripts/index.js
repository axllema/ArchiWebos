let works = 'http://localhost:5678/api/works';
const gallery = document.getElementById('gallery');

// fetchs works data from the API
async function getWorks() {
  try {
    // sends a GET request to the 'works' API endpoint to fetch the list of works
    const response = await fetch(works);
    // checks if the response status is okay (HTTP status 200)
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    // parses the response body as JSON and store it in 'responseWork'
    const responseWork = await response.json();
    // calls the 'createGallery' function and pass the parsed works data to it
    createGallery(responseWork);
  } catch (error) {
    // handles errors, such as network issues or failed requests
    console.error('Error fetching data:', error);
  }
}
getWorks();

// creates HTML elements for each work and add them to the gallery
function createGallery(works) {
  works.forEach((work) => {
    // creates the HTML elements
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    // adds the data to those HTML elements
    image.src = work.imageUrl;
    image.alt = work.title;
    figcaption.textContent = work.title;

    // sets the data-category attribute with the category ID
    figure.setAttribute('data-category', work.category.id);

    // adds img & figcaption to figure
    figure.appendChild(image);
    figure.appendChild(figcaption);

    // adds the HTML elements to the gallery
    gallery.appendChild(figure);
  });
}

// checks if the user is connected (has a token in sessionStorage)
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

// adds event listener to the login link in the header
loginLink.addEventListener('click', (event) => {
  if (!isUserConnected()) {
     // If not logged in, redirect to login.html when clicking "login"
    window.location.href = 'login.html';
  }
});

// logs out the user
function logout() {
  // adds an event listener to the login link in the header
  loginLink.addEventListener('click', (event) => {
    if (isUserConnected()) {
      window.sessionStorage.removeItem('token');
      // if  user is logged in, remove the token to log them out
      updateLoginLink();
      // refreshes the current page after logging out to stay on index.html - but logged out
      window.location.href = window.location.href;
    }
  });
}
// calls the logout function to enable the "logout" functionality
logout();

/* FILTERS */
// initializes the variable with an empty array - used to store or manage data related to filters
const filtersArray = [];

const filtersContainer = document.querySelector('.filters_div');

async function createFilterButtons() {
  // fetchs the categories data from the API
  const categoriesResponse = await fetch('http://localhost:5678/api/categories');
  const categoryData = await categoriesResponse.json();

  // creates a "Tous" button (All) - first button for filtering
  const firstFilterButton = document.createElement('div');
  // adds CSS classes to style the button
  firstFilterButton.classList.add('btn_filters', 'btn_active');
  // sets a data attribute to mark it as the "All" filter
  firstFilterButton.dataset.filter = 'all';
  // sets a data attribute to mark it as the "All" filter
  firstFilterButton.textContent = 'Tous';

  // adds the "Tous" button to the filters container - filtersContainer is the parent of firstFilterButton
  filtersContainer.appendChild(firstFilterButton);

  // adds a click event listener to the "Tous" button to activate the filter
  firstFilterButton.addEventListener('click', activatedFilter);

// loops through category data from the API and create filter buttons for each category
  categoryData.forEach((category) => {
    const filterButton = document.createElement('div');
    filterButton.classList.add('btn_filters');
    // sets a data attribute with the category ID
    filterButton.dataset.filter = category.id;
    filterButton.textContent = category.name;

    // adds click event listener to each filter button to activate the filter
    filterButton.addEventListener('click', activatedFilter);
    filtersContainer.appendChild(filterButton);
  });
}
// Call the createFilterButtons function to generate the buttons
createFilterButtons();

function activatedFilter(event) {
  const selectedFilter = event.target.dataset.filter;
  const filterButtons = document.querySelectorAll('.btn_filters');

  // removes 'btn_active' class from all filter buttons
  filterButtons.forEach((button) => {
    button.classList.remove('btn_active');
  });
  // adss 'btn_active' class to the clicked filter button
  event.target.classList.add('btn_active');

filterGallery(selectedFilter);
}

function filterGallery(selectedFilter) {
  // selects all the figure elements with the class "gallery" and stores them in 'galleryItems'
  const galleryItems = document.querySelectorAll('.gallery figure');

  // loops through each figure element in the gallery
  galleryItems.forEach((item) => {
    // gets the category of the current item from its data attribute
    const itemCategory = item.dataset.category;

    /* checks if the selectedFilter is "all" or matches the item's category -
    '===' checks if selectedFilter is exactly equal to "all." If not exactly equal -> moves to the second condition.
    '||' logical OR operator - allows to combine conditions, checks if 'selectedFilter' is equal to "all" or if it is equal to 'itemCategory'. */
    if (selectedFilter === 'all' || selectedFilter === itemCategory) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// when the page is loaded, directly shows ALL the works by default
filterGallery('all');

// updates filters when the user is logged in or logged out
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

function showFilterButtons() {
  if (isUserConnected()) {
    modifPortfolioButton.style.display = 'flex';
  } else {
    modifPortfolioButton.style.display = 'none';
  }
}
showFilterButtons();

/* Edition mode, black thingy at the top of homepage */
const editLine = document.querySelector('.edition_mode');
const body = document.body;

// shows the "mode edition" black banner is user is connected - hides if not
function showBanner() {
  if (isUserConnected()) {
    editLine.style.display = 'flex' ;
    editLine.style.position = 'fixed';
    body.style.paddingTop = '55px';
  } else {
    editLine.style.display = 'none';
  }
}
showBanner();

