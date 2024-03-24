/* RELEVANT JAVASCRIPT: Non-streaming*/

let prompt_type = 'default';

function uploadText() {
    const outputTextarea = document.getElementById('textOutputA');

    // Show loading animation or progress bar
    outputTextarea.value = 'Processing...';

    const data = { text: highlightedText, //                               LLM_process text args for views.py
                prompt_type: prompt_type,
            };

    fetch('/process_text/', { //                fetch process_text
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

/* RELEVANT JAVASCRIPT: Streaming*/

function uploadText() {
    const outputTextarea = document.getElementById('textOutputA');

    // Show loading animation or progress bar
    outputTextarea.value = 'Processing...';

    const data = {
        text: highlightedText,
        prompt_type: prompt_type,
    };

    fetch('/process_text/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        let output = '';

        function readChunk({ done, value }) {
            if (done) {
                outputTextarea.value = output;
                return;
            }

            const chunk = new TextDecoder().decode(value);
            output += chunk;
            outputTextarea.value = output;

            return reader.read().then(readChunk);
        }

        reader.read().then(readChunk);
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