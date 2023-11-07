const overlay = document.createElement('div');
overlay.classList.add('modalOverlay');

body.appendChild(overlay);
const modal = createModal();

// functions to open & close modals - get works, shows/hides modals when needed 
function openModal() {
  getWorksForModal();
  modal.style.display = "flex";
}
  function openAddPhotoModal() {
  addPhotoModal.style.display = "flex";
  document.querySelector('.addPhotoButtonText').style.display = 'block';
}
  function closeModal() {
  modal.style.display = "none";
}
  function closeAddPhotoModal() {
  addPhotoModal.style.display = "none";
}

const btnModal = document.getElementById('btn_open_modal');
// get the <span> element that closes the modal - [0] is used to get the first element with the class "close."
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

// creates a new "add photo / ajouter une photo", and appends it to the modal
function createAddPhotoBtn() {
  const addPhotoBtn = document.createElement('div');
  addPhotoBtn.classList.add('addPhotoBtn');
  modal.appendChild(addPhotoBtn);
  return addPhotoBtn;
}
// creates a new modal element, and appends it to the body
function createModal() {
  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content');
  const modalGallery = document.createElement('div');
  modalGallery.classList.add('modal-gallery');
  // 'modalGallery' is the "child" of 'modal', meaning it's displayed inside the 'modal', on the webpage
  modal.appendChild(modalGallery);
  return modal;
}

// updates the gallery without having to refresh the page
async function updateGallery() {
  try {
    // Fetch the latest works from the API
    const response = await fetch('http://localhost:5678/api/works');
    if (response.ok) {
      const data = await response.json();
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML = '';
      createGallery(data, gallery);
    } else {
      console.error('Failed to fetch the latest works.');
    }
  } catch (error) {
    console.error('Error fetching works:', error);
  }
}


/* WORKS FOR MODAL */
async function getWorksForModal() {
// fetch works data from the API
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();

  const modalGallery = document.querySelector('.modal-gallery');
  modalGallery.innerHTML = '';

    // loops through the data from the API to create elements for the modal
    data.forEach((item) => {
      const workElement = createWorkElement(item);
  
      // add an image to the work element
      addImgToWorkElement(item, workElement);

      // creates a container for the "trash elements" and the "delete" action
      createContainerAndTrashElement(workElement);


      // adds a click event listener to the trash icon for item deletion
      trashContainer.addEventListener('click', async () => {
        // retrieve the user's authentication token from session storage
        const token = sessionStorage.getItem('token');

        // sends a DELETE request to the API to delete the element with the given ID
        const response = await fetch(`http://localhost:5678/api/works/${item.id}`, {
          method: 'DELETE', // Use the HTTP DELETE method
          headers: {
            Authorization: `Bearer ${token}`,
            // includes the user's token in the request headers for authentication
          },
        });

        // checks if the DELETE request was successful (HTTP status 200 or OK)
        if (response.ok) {
        // finds the HTML element associated with the deleted element in the modal
        const elementToRemove = document.getElementById('figureModal' + item.id);

        // checks if the element exists in the DOM
        if (elementToRemove) {
          // removes the element from the DOM by removing its parent node
          elementToRemove.parentNode.removeChild(elementToRemove);
          updateGallery();
        }
        }
      });
    });
  
  //creates a container for actions and adds it to a work element - here, create the container for trash element
  function createContainerAndTrashElement(workElement) {
    trashContainer = document.createElement('div');
    trashContainer.classList.add('figureContainer', 'trashContainer');
    workElement.appendChild(trashContainer);
    // adds the container to the figure
    const trashElement = document.createElement('i');
    // creates an icon element for deleting the work
    trashElement.classList.add('fa-solid', 'fa-trash-can');
    trashContainer.appendChild(trashElement);
  }

    // adds an image to a work element based on the provided item's URL
    function addImgToWorkElement(item, workElement) {
      const imgWorkElement = document.createElement('img');
      imgWorkElement.src = item.imageUrl;
      // sets the image source (URL) from the item's imageUrl property
      imgWorkElement.classList.add('imgModal');
      workElement.appendChild(imgWorkElement);
    }
  
    // creates a work element (figure) for a given item - appends it to the modalGallery
    function createWorkElement(item) {
      const workElement = document.createElement('figure');
      workElement.classList.add('figureModal');
      const dynamicId = item.id;
      // generates a unique ID for each <figure> element based on the work's ID
      const concatenedId = 'figureModal' + dynamicId;
      // creates a unique ID by combining "figureModal" and the dynamic ID
      workElement.id = concatenedId;
      // set the ID of the <figure> element to the unique ID
      modalGallery.appendChild(workElement);
      return workElement;
    }

    // adss a click event listener for the modal to close it when clicked outside
    closeModalsWhenClickedOutside();

    // closes the main modal and hide the modal overlay when clicking outside the main (first) modal
    function closeModalsWhenClickedOutside() {
        modal.onclick = function (event) {
            if (event.target === modal) {
                closeModal();
                document.querySelector('.modalOverlay').style.display = 'none';
            }
        };

        // adds a click event listener for the addPhotoModal to close it when clicked outside
        addPhotoModal.onclick = function (event) {
            if (event.target === addPhotoModal) {
                closeAddPhotoModal();
                document.querySelector('.modalOverlay').style.display = 'none';
            }
        };

        // adss a click event listener for the overlay to close both modals when clicked outside
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

// creates the add photo modal
function createAddPhotoModal() {
  addPhotoModal = document.createElement("div");
  addPhotoModal.classList.add("photoModal");
  addPhotoModal.style.display = 'none';
  // appends the entire modal to portfolio div
  portfolio.appendChild(addPhotoModal);

  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");
  addPhotoModal.appendChild(modalBackground);
  // appends to addPhotoModal

  // creating a top bar - putting arrow, title and close button in it
  const topBarDiv = createTopBarDiv();

  const arrowButton = document.createElement("i");
  arrowButton.classList.add("fa-solid", "fa-arrow-left", "arrow");
  topBarDiv.appendChild(arrowButton);

  // clicking to have the modal add photo closed and go back to origin modal
  arrowButton.addEventListener("click", function (){
    closeAddPhotoModal();
    openModal();

    nameInput.value = "";
    categorySelect.value = "";
    imagePreview.src = "";
    errorMessage.style.display = "none";
  });

  const closeBtn = createCloseBtn();
  closeBtn.addEventListener("click", function() {
    //addPhotoModal.style.display = 'none';
    closeAddPhotoModal();
    document.querySelector('.modalOverlay').style.display = 'none';

    nameInput.value = "";
    categorySelect.value = "";
    imagePreview.src = "";
    errorMessage.style.display = "none";
  });

  // CLOSING THE MODALS - clicking outside
  // adds a click event listener for the modal to close it when clicked outside
  modal.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
        document.querySelector('.modalOverlay').style.display = 'none';
    }
  };

  // adds a click event listener for the addPhotoModal to close it when clicked outside
  addPhotoModal.onclick = function (event) {
    if (event.target === addPhotoModal) {
        closeAddPhotoModal();
        document.querySelector('.modalOverlay').style.display = 'none';
        nameInput.value = "";
        categorySelect.value = "";
        imagePreview.src = "";
    }
  };

  // create the h3 title 'Ajout photo'
  const addPhotoTitle = document.createElement('h3');
  // sets the text content for the h3 element
  addPhotoTitle.textContent = 'Ajout photo';
  addPhotoModal.appendChild(addPhotoTitle);

  // adding new photo 'thumbnail' & form
  const { uploadPhotoButtonContainer, addPhotoContainer, addPhotoForm } = createNewPhotoContainer();

  // creates a label element for the file input - to stylize it as a button
  const { uploadPhotoButton, addPhotoButtonText } = createAddPhotoButton();

  const addPhotoDescription = document.createElement("p");
  addPhotoDescription.classList.add("addPhotoDescription");
  addPhotoDescription.innerText = "jpg, png : 4mo max";
  addPhotoContainer.appendChild(addPhotoDescription);

  // IMAGE PREVIEW 
  // adding an <img> element for displaying the image preview
  const imagePreview = document.createElement("img");
  imagePreview.classList.add("imagePreview");
  addPhotoContainer.appendChild(imagePreview);

  // creates an error message, so when needed it can appear
  const errorMessage = createErrorMessage();


  // adding an event listener to the file input to update the image preview
  uploadPhotoButton.addEventListener("change", function() {
  const selectedFile = uploadPhotoButton.files[0];
  if (selectedFile) {
    // Create a URL for the selected image and set it as the source of the <img> element
    imagePreview.src = URL.createObjectURL(selectedFile);
    addPhotoButtonText.style.display = 'none';
  } else {
    // if no file is selected, clears the image preview
    imagePreview.src = "";
    addPhotoButtonText.style.display = 'block';
    checkFormCompletion();
  }
  });


  /* INPUTS FOR LABELS & CATEGORIES, ... */

  // creates a label for the photo title input
  createLabelForTitleInput();
  // creates an input field for the title
  const nameInput = createInputFiledForPhotoTitle();

  // creates a label for the category select
  createCategoryLabel();
  // creates a select element for choosing a category
  const categorySelect = createCategorySelect(); 

  // function to create an error message element
  function createErrorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('errorMessage');
    errorMessage.style.display = 'none';
    addPhotoForm.appendChild(errorMessage);
    return errorMessage;
  }

  // function to create the "Add Photo" button and its associated label
  function createAddPhotoButton() {
    const addPhotoButtonText = document.createElement("label");
    addPhotoButtonText.classList.add("addPhotoButtonText");
    // associates the label with the file input by setting its 'for' attribute to the input's ID
    addPhotoButtonText.setAttribute("for", "photo");
    addPhotoButtonText.type = "file";
    addPhotoButtonText.textContent = "+ Ajouter photo";
    // appends the label to a container for styling purposes
    uploadPhotoButtonContainer.appendChild(addPhotoButtonText);

    // creates the file input element to actually upload photos
    const uploadPhotoButton = document.createElement("input");
    uploadPhotoButton.classList.add("uploadPhotoButton");
    uploadPhotoButton.type = "file";
    // sets the input type to 'file' to allow file selection
    uploadPhotoButton.id = "photo";
    // assign sa unique ID to the input element
    uploadPhotoButton.accept = ".jpg, .png";
    // specifies accepted file types (in this case, only .jpg and .png files)
    uploadPhotoButtonContainer.appendChild(uploadPhotoButton);
    return { uploadPhotoButton, addPhotoButtonText };
  }

  // function to create a container for the new photo and the form
  function createNewPhotoContainer() {
    const addPhotoForm = document.createElement("form");
    addPhotoForm.classList.add("addPhotoForm");
    addPhotoModal.appendChild(addPhotoForm);

    // container for the thumbnail to add a photo
    const addPhotoContainer = document.createElement("div");
    addPhotoContainer.classList.add("addPhotoContainer");
    addPhotoForm.appendChild(addPhotoContainer);

    // icon for adding a photo/preview image
    const addPhotoIcon = document.createElement("i");
    addPhotoIcon.classList.add("fa-regular", "fa-image", "thumbnail");
    addPhotoContainer.appendChild(addPhotoIcon);

    // container for the upload photo button
    const uploadPhotoButtonContainer = document.createElement("div");
    uploadPhotoButtonContainer.classList.add("uploadPhotoButtoncontainer");
    addPhotoContainer.appendChild(uploadPhotoButtonContainer);
    return { uploadPhotoButtonContainer, addPhotoContainer, addPhotoForm };
  }

    // creates an input field for the photo title
    function createInputFiledForPhotoTitle() {
        const nameInput = document.createElement("input");
        nameInput.classList.add("nameInput");
        nameInput.type = "text";
        nameInput.name = "titre";
        addPhotoForm.appendChild(nameInput);
        nameInput.addEventListener('input', checkFormCompletion);
        return nameInput;
    }

    // creates a label for the photo title input
    function createLabelForTitleInput() {
        const titleLabel = document.createElement("label");
        titleLabel.classList.add("titleLabel");
        titleLabel.textContent = "Titre";
        addPhotoForm.appendChild(titleLabel);
    }

    // creates a select element for choosing a category
    function createCategorySelect() {
        const categorySelect = document.createElement("select");
        categorySelect.name = "Categorie";
        categorySelect.classList.add("categorySelect");
        addPhotoForm.appendChild(categorySelect);
        categorySelect.addEventListener('change', checkFormCompletion);
        return categorySelect;
    }

    // creates a label for the category select
    function createCategoryLabel() {
        const categoryLabel = document.createElement("Label");
        categoryLabel.classList.add("categoryLabel");
        categoryLabel.innerText = "Catégorie";
        addPhotoForm.appendChild(categoryLabel);
    }

    // creates the close button for the top bar
    function createCloseBtn() {
        const closeBtn = document.createElement("span");
        closeBtn.classList.add("closeBtn");
        closeBtn.innerHTML = "&times;";
        topBarDiv.appendChild(closeBtn);
        return closeBtn;
    }

    // creates the top bar element
    function createTopBarDiv() {
        const topBarDiv = document.createElement("div");
        topBarDiv.classList.add("top-bar");
        // appends to addPhotoModal
        addPhotoModal.appendChild(topBarDiv);

        return topBarDiv;
    }

  // asynchronously fetch the categories from an API
  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:5678/api/categories');
      if (response.ok) {
        const data = await response.json();
        // creates the category options in the dropdown menu
        const categorySelect = document.querySelector('.categorySelect');
        // loops through each category in the 'data' array
        data.forEach((category) => {
          // creates an 'option' element - this represents an option within a <select> element in an HTML form
          const option = document.createElement('option');
          /* sets the 'value' property of the 'option' element to the 'id' of the current category
          - value = what will be sent to the server when the user selects an option. */
          option.value = category.id;
          /* sets the 'text' property of the 'option' element to the 'name' of the current category
          - what the user will see in the dropdown list as the option's label. */
          option.text = category.name;

          categorySelect.appendChild(option);
        });
      } else {
        console.error("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données.", error);
    }
  }
  // calls the function to fetch and populate the category options
  fetchCategories();

  // creation of a little gray line to separate the gallery from the button
  const hrLine = document.createElement('hr');
  addPhotoForm.appendChild(hrLine);

  // "Valider" button, for the form
  const sendButton = createSendButton();

  sendButton.disabled = true;
  /* the "valider" button is disabled if the form is not complete / category not selected / the picture is not uploaded
  - the color also switches from grey to green when the button isn't disabled */

  // checks whether the form is complete - image selecte, photo title input filled, category selected
  function checkFormCompletion() {
    const isImageSelected = uploadPhotoButton.files.length > 0;
    const isTitleFilled = nameInput.value.trim() !== '';
    const isCategorySelected = categorySelect.value !== '';

    // if all conditions are met, enable the "Valider" button
    if (isImageSelected && isTitleFilled && isCategorySelected) {
      sendButton.disabled = false;
  }
}
  // adds a click event listener to the "Valider" button for form submission
  sendButton.addEventListener('click', async (event) => {
    // prevents the default form submission behavior
    event.preventDefault();

    const isImageSelected = uploadPhotoButton.files.length > 0;
    const isTitleFilled = nameInput.value.trim() !== '';
    const isCategorySelected = categorySelect.value !== '';

    if (isImageSelected && isTitleFilled && isCategorySelected) {
      // gets the selected category's ID from the <select> element
      selectedCategoryId = categorySelect.value;
      // calls the function to send the data to the API
      await postDatas();
      // hides the overlay/modal
      overlay.style.display = 'none';
      // enables the "Valider" button
      sendButton.disabled = false;
    } else {
      // handles the case where the form is not complete
      errorMessage.innerText = 'Veuillez compléter tous les champs.';
      console.error('Veuillez compléter tous les champs.');
      errorMessage.style.display = 'flex';
      // disables the "Valider" button
      sendButton.disabled = true;
    }
    });

    // adds event listeners to various form elements to check form completion
    imagePreview.addEventListener('input', checkFormCompletion);
    nameInput.addEventListener('input', checkFormCompletion);
    categorySelect.addEventListener('change', checkFormCompletion);

    // reates and returns the "Valider" button for form submission
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

  // asynchronous function to send data to the API
  async function postDatas() {
    console.log("postDatas function is called");
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", uploadPhotoButton.files[0]);
    formData.append("title", nameInput.value);
    formData.append("category", selectedCategoryId);
  
    if (!formData.get("image") || !formData.get("title") || !formData.get("category")) {
      // checks if any of the required fields is missing
      errorMessage.innerText = "Veuillez compléter tous les champs.";
      errorMessage.style.display = "flex";
      sendButton.disabled = true;
    } else {
      // hides the error message if all fields are filled
      errorMessage.style.display = "none"; 
      sendButton.disabled = false;
    }
      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (response.status === 201 || (formData.get("image") || formData.get("title") || formData.get("category"))) {
          console.log("Formulaire envoyé correctement.");
          // clears the form fields and hide the modal when the request is successful
          sendButton.disabled = false;
          updateGallery();
          console.log(response.status === 201, 'response.status === 201')

          nameInput.value = "";
          categorySelect.value = "";
          imagePreview.src = "";
          addPhotoModal.style.display = "none";
        } else if (response.status === 400) {
          // indicates not all required fields are filled in
          errorMessage.innerText = "Veuillez compléter tous les champs.";
          console.error("Veuillez compléter tous les champs.");
          errorMessage.style.display = "flex";
          sendButton.disabled = true;
      
          nameInput.value = "";
          categorySelect.value = "";
          imagePreview.src = "";
        } else if (response.status === 401 || response.status === 500) {
          errorMessage.style.display = "flex";
          errorMessage.innerHTML = "Problème de connexion avec l'API.";
          console.error("Erreur dans l'envoi de data / la connexion avec l'API.", error);
          sendButton.disabled = true;

          titleLabel.style.marginTop = '0px';
      
          nameInput.value = "";
          categorySelect.value = "";
          imagePreview.src = "";
          addPhotoModal.style.display = "flex";
        }
      } catch (error) {
        errorMessage.style.display = "flex";
        sendButton.disabled = true;
        errorMessage.innerHTML = "Problème de connexion avec l'API.";
        console.error("Error sending data:", error);
      }
    }
  } //create add photos

// creates the "Ajout photo" modal
createAddPhotoModal();
