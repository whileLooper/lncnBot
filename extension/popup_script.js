//Remember https://imgflip.com/i/57j1ib
/*
Please remember to use proper formatting:
ID's and names should be using 'snake_case' 
Classes should be using 'BEM'
Add a semicolon to the appropriate lines
Use single quotes (instead of double quotes) where necessary
*/

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    console.log(navigator);

    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method

        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

let toolbar = document.getElementById('open_toolbar');
let select_form = document.getElementById('select_form');
let textArea = document.getElementById('content_textarea');

const SSR_URL = 'https://brave-colden-44b82e.netlify.app/.netlify/functions/copy-node'
const options = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
};

fetch(SSR_URL, options)
    .then(async (res) => {
        res.json().then(async (data) => {
            console.log(data);
            textArea.value = data.message;
            
            //Code to send message from popup to content to open toolbar #WIP
            toolbar.addEventListener('click', copyToClipboard(data.message));
        })
    })
    .catch((err) => {
        console.log(err)
    });

//Checks the state of the toolbar and changes the text content of the Toolbar Button
window.onload = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, msger);

    function msger(tabs) {
        let content_script_message = 'state_of_toolbar';
        chrome.tabs.sendMessage(tabs[0].id, content_script_message, function (response) {
            console.log('chome tabs')
            if (typeof (response) != 'undefined' && response != null) {
                if (response.state === 1) {
                    toolbar.textContent = 'Close Toolbar';
                }
                if (response.state === 0) {
                    toolbar.textContent = 'Open Toolbar (CTRL+Q)';
                }
            }
        });
    }
};

function toolbar_state_receiver() {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let message = "state_of_toolbar"
        //Ask to check if the toolbar is opened or closed
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            //Calls the function that opens or closes the toolbar
            //   toolbar_opener(response.state, tabs);
        });
    });
};
