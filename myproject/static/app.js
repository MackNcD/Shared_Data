

console.log("Hello World");

//learn Vue or React or whatever, get basics course

//Story Object List JS ------------------------------------------------



//---------------------------------------------------------  

// JavaScript tab panel-------------------------------------
let currentTab = 'tab1'; // Default tab

function openTab(tab) {
  // Hide all content panels
  document.querySelectorAll('.tab-choice-display > div').forEach((content) => {
    content.style.display = 'none';
  });

  // Show the selected content panel
  document.getElementById(tab + 'Content').style.display = 'block';

  currentTab = tab;
}

//--------------------------------------------------

//Highlight text, store
var highlightedText = ''; // Global variable to store highlighted text
var originalTextareaContent = ''; // Global variable to store original content

// Flag to track if a key has been pressed
let keyPressed = false;

// Event listener for keydown event
document.addEventListener('keydown', function (event) {
  keyPressed = true;
});

// Event listener for mouseup event
document.addEventListener('mouseup', function (event) {
  // Check if a key has been pressed
  if (keyPressed) {
    // Use the getSelectedText function when the mouse button is released after a key press
    getSelectedText('highlightable-textarea');
    keyPressed = false;
  }
});

//End of panels JS

function getSelectedText(elementClass) {
    var textareas = document.getElementsByClassName(elementClass);
    // Check if any textareas were found
    if (textareas.length > 0) {
        // Loop through all textareas
        for (var i = 0; i < textareas.length; i++) {
            var elt = textareas[i];
            // Check if there is highlighted text in the current textarea
            if (elt.selectionStart !== elt.selectionEnd) {
                // Get the selected text within the textarea
                highlightedText = elt.value.substring(elt.selectionStart, elt.selectionEnd);
                console.log('Highlighted text:', highlightedText);
                // Store the original content of the textarea
                originalTextareaContent = elt.value;
                return elt; // Return the textarea element
            }
        }
        console.error('No highlighted text in any textarea with class ' + elementClass);
    } else {
        console.error('No textareas found with class ' + elementClass);
    }
}

function uploadText() {
    const outputTextarea = document.getElementById('textOutputA');

    // Show loading animation or progress bar
    outputTextarea.value = 'Processing...';

    const data = { text: highlightedText };

    fetch('/process_text/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            // Update the output textarea with the processed text
            outputTextarea.value = data.output;
            // You can proceed with further processing if needed
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Set the highlighted text in the textarea without overwriting existing content
    var textarea = getSelectedText('highlightable-textarea');
    if (textarea) {
        var startIndex = textarea.selectionStart;
        var endIndex = textarea.selectionEnd;
        textarea.value = originalTextareaContent.substring(0, startIndex) +
                            highlightedText +
                            originalTextareaContent.substring(endIndex);

        textarea.setSelectionRange(startIndex, startIndex + highlightedText.length);

        textarea.focus();
    }
}





function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function uploadImage() {
    var input = document.getElementById('imageInput');
    if (!input) return;

    // Trigger the click event on the file input
    input.click();

    // Listen for the file selection
    input.addEventListener('change', function () {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var imgUpload = document.getElementById('imgUpload');

                // Set a max height  for the uploaded image
                imgUpload.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image" style="min-width: auto; max-width: 25em; min-height: auto; max-height: 25em; place-self: center stretch;">';
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
}




/* VUE */

