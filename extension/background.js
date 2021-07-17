// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.

console.log('Service Worker (a.k.a Background Script) is running SIR!');

// return a promise
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

chrome.runtime.onInstalled.addListener(async (tab) => {
    console.log(`on Installed, tab id: `, tab);
})

chrome.action.onClicked.addListener(async (tab) => {

    // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
    // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
    // runtime.
    // let url = chrome.runtime.getURL("hello.html");

    // Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
    //
    // Many of the extension platform's APIs are asynchronous and can either take a callback argument
    // or return a promise. Since we're inside an async function, we can await the resolution of the
    // promise returned by the tabs.create call. See the following link for more info on async/await.
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
    // let tab = await chrome.tabs.create('https://brave-colden-44b82e.netlify.app/.netlify/functions/copy-node');

    // Finally, let's log the ID of the newly created tab using a template literal.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //
    // To view this log message, open chrome://extensions, find "Hello, World!", and click the
    // "service worker" link in th card to open DevTools.
    console.log(`on Clicked, tab id: `, tab);


    const SSR_URL = 'https://brave-colden-44b82e.netlify.app/.netlify/functions/copy-node'
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
    };

    console.log(navigator);


    // chrome.scripting.executeScript(
    //     {
    //         target: {tabId: tab.id},
    //         function: copyToClipboard("I'm going to the clipboard !"),
    //     },
    //     (result) => {
    //         console.log(result);
    //     }
    // );

    // copyToClipboard("I'm going to the clipboard !")
    // .then(() => console.log('text copied !'))
    // .catch(() => console.log('error'));

    // await navigator.clipboard.writeText('copied');
    // console.log(await navigator.clipboard.readText());
    // if (navigator.clipboard) {
    //     // navigator clipboard api method'
    //     return navigator.clipboard.writeText('Copy me!');
    // }

    // fetch(SSR_URL, options)
    //     .then(async (res) => {
    //         res.json().then(async (data) => {
    //             await navigator.clipboard.writeText(data.message);

    //             // navigator.clipboard.writeText('Copy me!')
    //             //     .then(() => {
    //             //         console.log('Text is on the clipboard.');
    //             //     });
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
});