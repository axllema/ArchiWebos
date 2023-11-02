/* MODAL */

const overlay = document.createElement('div');
overlay.classList.add('modalOverlay');

body.appendChild(overlay);
const modal = createModal();

function openModal() {
  getWorksForModal();
  modal.style.display = "flex";
  }
  function openAddPhotoModal() {
  addPhotoModal.style.display = "flex";
  }
  function closeModal() {
  modal.style.display = "none";
  }
  function closeAddPhotoModal() {
  addPhotoModal.style.display = "none";
}

const btnModal = document.getElementById('btn_open_modal');
// Get the <span> element that closes the modal - [0] is used to get the first element with the class "close."
const span = document.getElementsByClassName('close')[0];

btnModal.onclick = function() {
  openModal();
  document.querySelector('.modalOverlay').style.display = 'block';
};

span.onclick = function() {
  closeModal();
  document.querySelector('.modalOverlay').style.display = 'none';
};


// creation of a little gray line to separate the gallery from the button
const hrLine = document.createElement('hr');
modal.appendChild(hrLine);

// creation of a button to add a photo
const addPhotoBtn = createAddPhotoBtn();

// adding text to this button so it says 'Ajouter une photo'
const addPhotoBtnText = document.createElement('p');
addPhotoBtnText.innerText = 'Ajouter une photo';
addPhotoBtn.appendChild(addPhotoBtnText);

// clicking on the button to close the original modal and open the modal to add photo
addPhotoBtn.addEventListener("click", function () {
  console.log("addPhotoBtn clicked");
  closeModal();
  openAddPhotoModal();
}); 

function createAddPhotoBtn() {
  const addPhotoBtn = document.createElement('div');
  addPhotoBtn.classList.add('addPhotoBtn');
  modal.appendChild(addPhotoBtn);
  return addPhotoBtn;
}

function createModal() {
  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content');
  const modalGallery = document.createElement('div');
  modalGallery.classList.add('modal-gallery');
  // 'modalGallery' is the "child" of 'modal', meaning it's displayed inside the 'modal', on the webpage
  modal.appendChild(modalGallery);
  return modal;
}

/* WORKS FOR MODAL */
async function getWorksForModal() {
  // Call your function to populate the modal
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();

  const modalGallery = document.querySelector('.modal-gallery');
  modalGallery.innerHTML = '';
  
    // Loop through the data from the API to create elements for the modal
    data.forEach((item) => {
      const workElement = createWorkElement(item);
  
      addImgToWorkElement(item, workElement);

      trashContainer = document.createElement('div');
      // Create a container for other actions (delete, add, ...)
      trashContainer.classList.add('figureContainer', 'trashContainer');
      workElement.appendChild(trashContainer);
      // Add the container to the figure

      const trashElement = document.createElement('i');
      // Create an icon for deleting the work (to be implemented later)
      trashElement.classList.add('fa-solid', 'fa-trash-can');
      trashContainer.appendChild(trashElement);
      // Add the icon to the container

      // Appel a la fonction de suppression au click sur icone corbeille
      trashContainer.addEventListener('click', async () => {
      // Retrieve the user's authentication token from local storage
      const token = sessionStorage.getItem('token');

      // Send a DELETE request to the API to delete the element with the given ID
      const response = await fetch(`http://localhost:5678/api/works/${item.id}`, {
        method: 'DELETE', // Use the HTTP DELETE method
        headers: {
          Authorization: `Bearer ${token}`,
          // Include the user's token in the request headers for authentication
        },
        });

      // Check if the DELETE request was successful (HTTP status 200 or OK)
      if (response.ok) {
      // Find the HTML element associated with the deleted element in the modal
      const elementToRemove = document.getElementById('figureModal' + item.id);

      // Check if the element exists in the DOM
      if (elementToRemove) {
        // Remove the element from the DOM by removing its parent node
        elementToRemove.parentNode.removeChild(elementToRemove);
      }
      }
      });
      });
  
    function addImgToWorkElement(item, workElement) {
      const imgWorkElement = document.createElement('img');
      imgWorkElement.src = item.imageUrl;
      imgWorkElement.classList.add('imgModal');
      workElement.appendChild(imgWorkElement);
    }
  
    function createWorkElement(item) {
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
      return workElement;
    }

// Add a click event listener for the modal to close it when clicked outside
    closeModalsWhenClickedOutside();

    function closeModalsWhenClickedOutside() {
        modal.onclick = function (event) {
            if (event.target === modal) {
                closeModal();
                document.querySelector('.modalOverlay').style.display = 'none';
            }
        };

        // add a click event listener for the addPhotoModal to close it when clicked outside
        addPhotoModal.onclick = function (event) {
            if (event.target === addPhotoModal) {
                closeAddPhotoModal();
                document.querySelector('.modalOverlay').style.display = 'none';
            }
        };

        // Add a click event listener for the overlay to close both modals when clicked outside
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeModal();
                closeAddPhotoModal();
                overlay.style.display = 'none';
            }
        });
    }
};


// MODAL ADD PHOTO
let addPhotoModal;
let portfolio = document.getElementById('portfolio');

// Create the add photo modal
function createAddPhotoModal() {
    console.log("createAddPhotoModal is called");
    addPhotoModal = document.createElement("div");
    addPhotoModal.classList.add("photoModal");
    addPhotoModal.style.display = 'none';
    // Append the entire modal to portfolio div
    portfolio.appendChild(addPhotoModal);

    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");
    addPhotoModal.appendChild(modalBackground);
    // Append to addPhotoModal

//creating a top bar - putting arrow, title and close button in it
    const topBarDiv = createTopBarDiv();
// Append to addPhotoModal

const arrowButton = document.createElement("i");
arrowButton.classList.add("fa-solid", "fa-arrow-left", "arrow");
topBarDiv.appendChild(arrowButton);

// clicking to have the modal add photo closed and go back to origin modal
arrowButton.addEventListener("click", function (){
    closeAddPhotoModal();
    openModal();
//addPhotoModal.style.display = 'none';
//modal.style.display = 'flex';
  // You might want to reset any content within addPhotoModal here
});

    const closeBtn = createCloseBtn();
    closeBtn.addEventListener("click", function() {
  //addPhotoModal.style.display = 'none';
  closeAddPhotoModal();
  document.querySelector('.modalOverlay').style.display = 'none';
});

//NOT WORKING
// when the user clicks anywhere outside of the modals, closes them
// Add a click event listener for the modal to close it when clicked outside
modal.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
        document.querySelector('.modalOverlay').style.display = 'none';
    }
};

// Add a click event listener for the addPhotoModal to close it when clicked outside
addPhotoModal.onclick = function (event) {
    if (event.target === addPhotoModal) {
        closeAddPhotoModal();
        document.querySelector('.modalOverlay').style.display = 'none';
    }
};

// create the h3 title 'Ajout photo'
const addPhotoTitle = document.createElement('h3');
// Set the text content for the h3 element
addPhotoTitle.textContent = 'Ajout photo';
addPhotoModal.appendChild(addPhotoTitle);

// adding new photo VIGNETTE & form
const addPhotoForm = document.createElement("form");
addPhotoForm.classList.add("addPhotoForm");
addPhotoModal.appendChild( addPhotoForm);

//Endroit où vignette pour ajouter photo
const addPhotoContainer = document.createElement("div");
addPhotoContainer.classList.add("addPhotoContainer");
addPhotoForm.appendChild(addPhotoContainer);

// icon d'ajout de photo/vignette
const addPhotoIcon = document.createElement("i");
addPhotoIcon.classList.add("fa-regular", "fa-image", "thumbnail");
addPhotoContainer.appendChild(addPhotoIcon);

// add photo button - in container 
const uploadPhotoButtonContainer = document.createElement("div");
uploadPhotoButtonContainer.classList.add("uploadPhotoButtoncontainer");
addPhotoContainer.appendChild(uploadPhotoButtonContainer);

// create a label element for the file input - to stylize it as a button
const addPhotoButtonText = document.createElement("label");
addPhotoButtonText.classList.add("addPhotoButtonText");
// associate the label with the file input by setting its 'for' attribute to the input's ID
addPhotoButtonText.setAttribute("for", "photo");
addPhotoButtonText.type = "file";
addPhotoButtonText.textContent = "+ Ajouter photo";
// append the label to a container for styling purposes
uploadPhotoButtonContainer.appendChild(addPhotoButtonText);

// create the file input element to actually upload photos
const uploadPhotoButton = document.createElement("input");
uploadPhotoButton.classList.add("uploadPhotoButton");
uploadPhotoButton.type = "file";
// set the input type to 'file' to allow file selection
uploadPhotoButton.id = "photo";
// assign a unique ID to the input element
uploadPhotoButton.accept = ".jpg, .png";
// specify accepted file types (in this case, only .jpg and .png files)
uploadPhotoButtonContainer.appendChild(uploadPhotoButton);
// append the file input to its container

const addPhotoDescription = document.createElement("p");
addPhotoDescription.classList.add("addPhotoDescription");
addPhotoDescription.innerText = "jpg, png : 4mo max";
addPhotoContainer.appendChild(addPhotoDescription);

 // IMAGE PREVIEW 
// adding an <img> element for displaying the image preview
const imagePreview = document.createElement("img");
imagePreview.classList.add("imagePreview");
addPhotoContainer.appendChild(imagePreview);


// ading an event listener to the file input to update the image preview
uploadPhotoButton.addEventListener("change", function() {
  const selectedFile = uploadPhotoButton.files[0];
  if (selectedFile) {
    // Create a URL for the selected image and set it as the source of the <img> element
    imagePreview.src = URL.createObjectURL(selectedFile);
    addPhotoButtonText.style.display = 'none';
  } else {
    // If no file is selected, clear the image preview
    imagePreview.src = "";
    addPhotoButtonText.style.display = 'block';
  }
});


 // INPUTS FOR LABELS & CATEGORIES, ...

    createLabelForTitleInput();
// create an input field for the title
    const nameInput = createInputFiledForPhotoTitle();

// create a label for the category select
    createCategoryLabel();
// create a select element for choosing a category
  const categorySelect = createCategorySelect(); 

    function createInputFiledForPhotoTitle() {
        const nameInput = document.createElement("input");
        nameInput.classList.add("nameInput");
        nameInput.type = "text";
        nameInput.name = "titre";
        addPhotoForm.appendChild(nameInput);
        return nameInput;
    }

    function createLabelForTitleInput() {
        const titleLabel = document.createElement("label");
        titleLabel.classList.add("titleLabel");
        titleLabel.textContent = "Titre";
        addPhotoForm.appendChild(titleLabel);
    }

    function createCategorySelect() {
        const categorySelect = document.createElement("select");
        categorySelect.name = "Categorie";
        categorySelect.classList.add("categorySelect");
        addPhotoForm.appendChild(categorySelect);
        return categorySelect;
    }

    function createCategoryLabel() {
        const categoryLabel = document.createElement("Label");
        categoryLabel.classList.add("categoryLabel");
        categoryLabel.innerText = "Catégorie";
        addPhotoForm.appendChild(categoryLabel);
    }

    function createCloseBtn() {
        const closeBtn = document.createElement("span");
        closeBtn.classList.add("closeBtn");
        closeBtn.innerHTML = "&times;";
        topBarDiv.appendChild(closeBtn);
        return closeBtn;
    }

    function createTopBarDiv() {
        const topBarDiv = document.createElement("div");
        topBarDiv.classList.add("top-bar");
        addPhotoModal.appendChild(topBarDiv);
        return topBarDiv;
    }

  // asynchronously fetch the categories from an API
  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:5678/api/categories');
      if (response.ok) {
        const data = await response.json();
        // create the category options in the dropdown menu
        const categorySelect = document.querySelector('.categorySelect');
         // this code loops through each category in the 'data' array
        data.forEach((category) => {
          const option = document.createElement('option');
        // create an 'option' element - this represents an option within a <select> element in an HTML form
          option.value = category.id;
          /* setting the 'value' property of the 'option' element to the 'id' of the current category
          - value = what will be sent to the server when the user selects an option. */
          option.text = category.name;
        /* setting the 'text' property of the 'option' element to the 'name' of the current category
          - what the user will see in the dropdown list as the option's label. */
          categorySelect.appendChild(option);
        });
      } else {
        console.error('Failed to fetch categories.');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
  // call the function to fetch and populate the category options
  fetchCategories();

// creation of a little gray line to separate the gallery from the button
const hrLine = document.createElement('hr');
addPhotoForm.appendChild(hrLine);

// "Valider" button, for the form
    const sendButton = createSendButton();

// sendButton.disabled = true;
/* the "valider" button is disabled if the form is not complete / category not selected / the picture is not uploaded
- the color also switches from grey to green when the button isn't disabled */

sendButton.addEventListener('click', async (event) => {
    // prevent the default form submission behavior
    event.preventDefault();
    // get the selected category's ID from the <select> element
    selectedCategoryId = categorySelect.value;
    // call the function to send the data to the API
    await postDatas();
    overlay.style.display = 'none';
});

    function createSendButton() {
        const sendButton = document.createElement("button");
        sendButton.type = "submit";
        sendButton.classList.add("sendButton");
        addPhotoForm.appendChild(sendButton);

        const sendButtonText = document.createElement("p");
        sendButtonText.classList.add("sendButtonText");
        sendButtonText.innerText = "Valider";
        sendButton.appendChild(sendButtonText);
        return sendButton;
    }

// this is an asynchronous function to send data to the API
async function postDatas() {
    // Promise object =represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    return new Promise((resolve) => {
    //resolve parameter is a function that you can call when the asynchronous operation is successful.
      const token = sessionStorage.getItem("token");
      // retrieving the authentication token from session storage

    // creating a FormData object to prepare data for the POST request
    const formData = new FormData();
    // attaches the selected image - title - category id
    formData.append("image", uploadPhotoButton.files[0]);
    formData.append("title", nameInput.value);
    formData.append("category", selectedCategoryId);

    // Send a POST request to the API endpoint
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
        // Include the token in the request headers
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((response) => {
        if (response.status === 201) {
          resolve();
          // resolves the promise when the request is successful

          // clears the form fields and hide the modal when the request is successful
          nameInput.value = '';
          categorySelect.value = '';
          imagePreview.src = '';
          addPhotoModal.style.display = 'none';
        }
      });
      
    });
}

async function updateGallery() {
    try { 
        // Fetch the latest works from the API
        const response = await fetch('http://localhost:5678/api/works');
        if (response.ok) {
            const data = await response.json();

            const modalGallery = document.querySelector('.modal-gallery');
            modalGallery.innerHTML = '';

            // Loop through the data and create elements for the modal
            data.forEach((item) => {
                const workElement = createWorkElement(item);

                addImgToWorkElement(item, workElement);

                // ... (similar to your existing code for creating work elements)

                // Append the work element to the modal gallery
                modalGallery.appendChild(workElement);
            });
        } else {
            console.error('Failed to fetch the latest works.');
        }
    } catch (error) {
        console.error('Error fetching works:', error);
    }
}
}
createAddPhotoModal();



/* 
TO DO : 

- no need to refresh the page when a photo is added / deleted

- the "valider" button is disabled if the form is not complete / the picture is not uploaded
& not disabled anymore if everything's complete ! 
+ Un message d’erreur si le formulaire n’est pas correctement rempli.
+ Une réponse de l’API si le formulaire est correctement envoyé.
+ Si je recharge la page, le nouveau projet qui doit s’afficher dans la galerie. 

/*
function changeColorSendButton() {
  if ( ..... truc machin form completed) {
  sendButton.disabled =  false;
  sendButton.style.backgroundColor = "...."; (green)
  } else {
  sendButton.disabled =  true;
  sendButton.style.backgroundColor = "...."; (grey)
  }
}

POUR QUE LE BOUTON SOIT PLUS DISABLED QUAND TOUT EST REMPLI
/* // create an array to store references to the form inputs and category select
const formElements = [nameInput, categorySelect];

// add an event listener to each form element
formElements.forEach((element) => {
  element.addEventListener('input', checkFormCompletion);
});

// function to check if the form is complete and an image is uploaded
function checkFormCompletion() {
  const isFormComplete = formElements.every((element) => element.value);
  // Check if all form elements have values

  const isImageUploaded = 
  // Add a condition to check if an image is uploaded here;

  // Enable or disable the "Valider" button based on the conditions
  sendButton.disabled = !(isFormComplete && isImageUploaded);
} 

- add better comments and change some variables & functions name so it's more understandable

- "The code is divided into functions, which makes it more modular and easier to read and maintain."
-> could be split into smaller functions for better readability.
*/