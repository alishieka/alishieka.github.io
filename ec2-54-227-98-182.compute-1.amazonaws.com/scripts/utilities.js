import appConfig from './settings.js';
import {
    verifyToken
} from './validateLogin.js';

export async function makeRequest(url, requestBody = null, actionType = "GET") {
    try {
        //   console.log(actionType);
        let options = {
            method: actionType,
            headers: {
                "Content-Type": "application/json",
            },
            body: actionType != "GET" ? JSON.stringify(requestBody) : null, // Convert requestBody to JSON if provided
        };
        const jwtToken = getIdToken();
        //   console.log(jwtToken);
        if (jwtToken) {
            options.headers["Authorization"] = `Bearer ${jwtToken}`;
        } else {
            console.log("no token");
        }

        const response = await fetch(url, options);

        if (response.ok) {
            return await response.json(); // Parse response body as JSON
        } else {
            const error = await response.text();
            throw new Error(error);
        }
    } catch (err) {
        console.error("Error making request:", err);
        throw err; // Re-throw the error to handle it further up the call stack
    }
}

function getIdToken() {
    const poolData = {
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


    const loginName = userPool.getCurrentUser();
    // console.log("loginName",loginName);
    let idToken = false;
    if (loginName) {
        idToken = loginName.getSession(function(err, data) {
            if (err) {
                return false;
                // Prompt the user to reauthenticate by hand...
            } else {
                const cognitoUserSession = data;
                const yourIdToken = cognitoUserSession.getIdToken().jwtToken;
                const yourAccessToken = cognitoUserSession.getAccessToken().jwtToken;
                // console.log(yourAccessToken,yourIdToken,cognitoUserSession);
                return yourIdToken;
            }
        });
    } else {
        return false;
    }
    return idToken;
    // const loginName = localStorage.getItem('CognitoIdentityServiceProvider.'+appConfig.ClientId+'.LastAuthUser'); 
    // const idToken = localStorage.getItem('CognitoIdentityServiceProvider.'+appConfig.ClientId+'.'+loginName.username+".idToken");

}

export async function updateNavForAdmins() {
    const valid = await verifyToken();
    if (valid) {
        document.querySelector("nav").innerHTML = '<a href="index.html">Home</a><a href="request-service.html">Request Service</a><a href="private.html">Admin</a><a href="login.html?logout=true">Logout</a>';
    }
}

// Function to get query parameters from the URL
export const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};