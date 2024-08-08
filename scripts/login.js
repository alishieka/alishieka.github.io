import appConfig from './settings.js';
import {
    initMessages
} from './getMessage.js';
import {
    getQueryParam
} from "./utilities.js";

initMessages();

const logout = getQueryParam("logout");
console.log(logout);
if (logout) {
    // console.log("here");
    // Define the user pool data
    const poolData = {
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId,
    };

    // Initialize the user pool
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    // Get the current authenticated user
    const currentUser = userPool.getCurrentUser();

    if (currentUser) {
        // Sign out the user
        currentUser.signOut();
        console.log('User successfully logged out.');
    } else {
        console.log('No user is currently logged in.');
    }
}


document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("submitted");

    const username = document.getElementById('username').value;
    const password = document.getElementById('passwd').value;
    getCognitoJWT(username, password)
        .then(accessToken => {
            //console.log('JWT Token:', accessToken);
            // localStorage.setItem('jwtToken', accessToken);
            // Redirect to private page
            window.location.href = 'private.html?msg=1';
        })

        .catch(err => {
            console.error('Authentication error:', err);
            window.location.href = 'login.html?msg=0';
        });
});

function getCognitoJWT(username, password) {
    const poolData = {
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const authenticationData = {
        Username: username,
        Password: password
    };

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                const accessToken = result.getAccessToken().getJwtToken();
                // const cognitoUser = userPool.getCurrentUser();
                // // console.log(cognitoUser.getSession());
                // console.log("cognitoUser",cognitoUser);
                resolve(accessToken);
            },
            onFailure: err => {
                // console.log(err);
                reject(err);
            },
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                window.location.href = "login.html?msg=3";
            }
        });
    });
}