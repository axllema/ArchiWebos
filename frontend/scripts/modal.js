
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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == body ||event.target == modal ) {
    modal.style.display = "none";
  }
}

// creation of a little gray line to separate the gallery from the button
const hrLine = document.createElement('hr');
modal.appendChild(hrLine);

// creation of a button to add a photo
const addPhotoBtn = document.createElement('div');
addPhotoBtn.classList.add('addPhotoBtn');
modal.appendChild(addPhotoBtn);

// adding text to this button so it says 'Ajouter une photo'
const addPhotoBtnText = document.createElement('p');
addPhotoBtnText.innerText = 'Ajouter une photo';
addPhotoBtn.appendChild(addPhotoBtnText);


/* WORKS FOR MODAL */
async function getWorksForModal() {
  // Call your function to populate the modal
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();

  const modalGallery = document.querySelector('.modal-gallery');
  modalGallery.innerHTML = '';

// Loop through the data from the API to create elements for the modal
data.forEach((item, index) => {
  const workElement = document.createElement('figure'); 
  workElement.classList.add('figureModal');
  // Add CSS class for styling
  const dynamicId = item.id;
   // Generate a unique ID for each <figure> element based on the work's ID
  const concatenedId = 'figureModal' + dynamicId;
  // Create a unique ID by combining "figureModal" and the dynamic ID
  workElement.id = concatenedId;
   // Set the ID of the <figure> element to the unique ID
  modalGallery.appendChild(workElement);
  // Add the figure to the modal gallery

  const imgWorkElement = document.createElement('img');
  imgWorkElement.src = item.imageUrl;
  imgWorkElement.classList.add('imgModal');
  workElement.appendChild(imgWorkElement);

  const trashContainer = document.createElement('div');
  // Create a container for other actions (delete, add, ...)
  trashContainer.classList.add('figureContainer', 'trashContainer');
  workElement.appendChild(trashContainer);
    // Add the container to the figure

  const trashElement = document.createElement('i');
  // Create an icon for deleting the work (to be implemented later)
  trashElement.classList.add('fa-solid', 'fa-trash-can');
  trashContainer.appendChild(trashElement);
  // Add the icon to the container

 /* // Appel a la fonction de suppression au click sur icone corbeille
  trashContainer.addEventListener("click", function(event) {
    deleteElementById(item.id);
  }); */
}); 
}

// MODAL ADD PHOTO
let addPhotoModal;

// Create the add photo modal
function createAddPhotoModal() {
  console.log("createAddPhotoModal is called");
  addPhotoModal = document.createElement("div");
  addPhotoModal.classList.add("photoModal");
  addPhotoModal.style.display = 'none';
  // Append the entire modal to the body
  document.body.appendChild(addPhotoModal);

  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");
  addPhotoModal.appendChild(modalBackground);
  // Append to addPhotoModal

//creating a top bar - putting arrow, title and close button in it
const topBarDiv = document.createElement("div");
topBarDiv.classList.add("top-bar");
addPhotoModal.appendChild(topBarDiv);
// Append to addPhotoModal

const arrowButton = document.createElement("i");
arrowButton.classList.add("fa-solid", "fa-arrow-left", "arrow");
topBarDiv.appendChild(arrowButton);

// clicking to have the modal add photo closed and go back to origin modal
arrowButton.addEventListener("click", function (){
addPhotoModal.style.display = 'none';
modal.style.display = 'flex';
  // You might want to reset any content within addPhotoModal here
});

const closeBtn = document.createElement("span");
closeBtn.classList.add("closeBtn");
closeBtn.innerHTML = "&times;";
topBarDiv.appendChild(closeBtn);
closeBtn.addEventListener("click", function() {
  addPhotoModal.style.display = 'none';
});

window.onclick = function(event) {
  if (event.target == body ||event.target == addPhotoModal) {
    addPhotoModal.style.display = "none";
  }
}

 // create the h3 title 'Ajout photo'
 const addPhotoTitle = document.createElement('h3');
 // Set the text content for the h3 element
 addPhotoTitle.textContent = 'Ajout photo';
 addPhotoModal.appendChild(addPhotoTitle);
}

createAddPhotoModal();

// clicking on the button to close the original modal and open the modal to add photo
addPhotoBtn.addEventListener("click", function () {
  console.log("addPhotoBtn clicked");
  addPhotoModal.style.display = 'flex'
  modal.style.display = 'none';
}); 