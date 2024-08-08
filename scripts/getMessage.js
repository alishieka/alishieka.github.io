import appConfig from './settings.js';
// Function to parse query parameters from URL
function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}
export function initMessages() {
    // Function to execute when the page loads
    window.onload = function() {
        const hostedUI = appConfig.HostedId;
        // Check for the 'msg' query parameter
        const message = getQueryParam('msg');
        const errors = ["No such Username or Password", "Thank you for Logging In", "Session Expired. Please Log in.", "Need to reset password. Follow this <a href='" + hostedUI + "'>link</a>"];
        // Display the value of 'msg' parameter
        if (message && errors[message]) {
            //alert('Message from query parameter: ' + message);
            addQuickMessage(errors[message]);
        }
    };
}
export function addQuickMessage(message) {
    const msgElement = document.querySelector("#message")
    msgElement.classList.add("show");
    msgElement.innerHTML = message;
    scrollToElement("nav");
    // Hide the message after 5 seconds
    setTimeout(function() {
        msgElement.classList.add("fade");
    }, 5000); // 5000 milliseconds = 5 seconds   
    setTimeout(function() {
        msgElement.classList.remove("fade");
        msgElement.classList.remove("show");
    }, 5500); // 5000 milliseconds = 5 seconds 
}

function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}