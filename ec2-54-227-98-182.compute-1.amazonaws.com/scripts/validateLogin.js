import appConfig from './settings.js';
export async function validateLoggedIn() {
    document.addEventListener('DOMContentLoaded', async () => {

        try {
            const verificationResult = await verifyToken();
            if (verificationResult) {
                // console.log('Token is valid:', verificationResult);
                // refreshToken();
                // console.log("refreshed");

            } else {
                console.error('Token verification failed. Attempting to refresh:', error);
                refreshToken();
                const verificationResult = await verifyToken();
                if (verificationResult) {
                    console.log('Token is valid:', verificationResult);
                    // refreshToken();
                    // console.log("refreshed");
                } else {
                    // Handle token verification failure (e.g., redirect to login page) 
                    window.location.href = 'login.html?msg=2&refresh=false';
                }
                // console.log("refreshed");
            }
            // Add your logic here after successful token verification
        } catch (error) {
            console.error('Token verification failed:', error);
            // Handle token verification failure (e.g., redirect to login page)
            console.log('here');
            window.location.href = 'login.html?msg=2';
        }
    });
}
export async function verifyToken() {
    const poolData = {
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


    const loginName = userPool.getCurrentUser();
    // console.log(loginName.refreshToken);
    if (loginName) {
        const valid = await loginName.getSession(function(err, data) {
            if (err) {
                // Prompt the user to reauthenticate by hand...
            } else {
                return data.isValid();
            }
        });
        return valid;
    }
    return false;
}

// export function refreshToken(){
//     console.log("refreshing");
//     const poolData = {
//         UserPoolId: appConfig.UserPoolId,
//         ClientId: appConfig.ClientId        
//     };
//     const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);



//     const loginName = userPool.getCurrentUser();
//     // console.log(loginName.refreshToken);
//     const refreshToken = loginName.getSession(function(err, data) {
//         if (err) {
//         // Prompt the user to reauthenticate by hand...
//         } else {
//         const cognitoUserSession = data;
//         // console.log(data.isValid());
//         const yourIdToken = cognitoUserSession.getRefreshToken();
//         // const yourAccessToken = cognitoUserSession.getAccessToken().jwtToken;
//         // console.log(yourAccessToken,yourIdToken,cognitoUserSession);
//         // console.log("refresh",yourIdToken.jwtToken);
//         return yourIdToken;
//         }
//     });
//     console.log(refreshToken.token);
//     let authResult = userPool.client.makeUnauthenticatedRequest('initiateAuth', {
//         ClientId: appConfig.ClientId,
//         AuthFlow: 'REFRESH_TOKEN_AUTH',
//         AuthParameters: {
//         'REFRESH_TOKEN': refreshToken.token // client refresh JWT
//         }
//     }, (err, authResult) => {
//         if (err) {
//             throw err
//         }
//         console.log("NEWNESS",authResult);
//         return authResult // contains new session
//     })
//     return authResult;
// }
export function refreshToken() {
    console.log("refreshing");
    const poolData = {
        UserPoolId: appConfig.UserPoolId,
        ClientId: appConfig.ClientId
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    const cognitoUser = userPool.getCurrentUser();

    if (!cognitoUser) {
        console.error("No user currently logged in.");
        return;
    }

    cognitoUser.getSession(function(err, session) {
        if (err) {
            console.error(err);
            // Prompt the user to reauthenticate by hand...
            return;
        }

        const refreshToken = session.getRefreshToken();
        console.log(refreshToken);

        const authDetails = {
            ClientId: appConfig.ClientId,
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            AuthParameters: {
                'REFRESH_TOKEN': refreshToken.getToken()
            }
        };

        const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
            region: 'us-east-1' // Set your AWS region here
        });
        cognitoIdentityServiceProvider.initiateAuth(authDetails, function(err, authResult) {
            if (err) {
                console.error(err);
                return;
            }

            const newAccessToken = authResult.AuthenticationResult.AccessToken;
            const newIdToken = authResult.AuthenticationResult.IdToken;

            // Build the key names using the pool ID, client ID, and username
            const keyPrefix = `CognitoIdentityServiceProvider.${appConfig.ClientId}.${cognitoUser.username}`;
            const idTokenKey = `${keyPrefix}.idToken`;
            const accessTokenKey = `${keyPrefix}.accessToken`;

            // Update localStorage with the new tokens
            localStorage.setItem(idTokenKey, newIdToken);
            localStorage.setItem(accessTokenKey, newAccessToken);

            console.log("Tokens updated successfully:", newAccessToken, newIdToken);
        });
    });
}

// export async function verifyToken(jwtToken) {
//     var base64Url = jwtToken.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     let jsondata = JSON.parse(jsonPayload);
//     // refreshToken()
//     // .then(accessToken => {
//     //     //console.log('JWT Token:', accessToken);
//     //     // localStorage.setItem('jwtToken', accessToken);
//     //     // Redirect to private page
//     //     window.location.href = 'index.html?msg=refreshing';
//     // })

//     // .catch(err => {
//     //     console.error('Authentication error:', err);
//     //     window.location.href= 'login.html?msg=0';
//     // });  
//     // console.log(jsondata.exp);
//     // console.log(Date.now()/1000)
//     // console.log(jsondata.exp,Date.now()/1000);
//     return (jsondata.exp - Date.now()/1000)>0;
//     //return true;
// }

// function refreshToken() {
//     console.log("tyring to refresh");
//     const refreshToken = getRefreshToken();
//     const username = getUsername();

//     if (!refreshToken || !username) {
//         return Promise.reject('No refresh token available.');
//     }

//     const poolData = {
//         UserPoolId: appConfig.UserPoolId,
//         ClientId: appConfig.ClientId
//     };

//     const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//     const userData = {
//         Username: username,
//         Pool: userPool
//     };

//     const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

//     return new Promise((resolve, reject) => {
//         cognitoUser.refreshSession(new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshToken }), (err, session) => {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             } else {
//                 const newAccessToken = session.getAccessToken().getJwtToken();
//                 localStorage.setItem('jwtToken', newAccessToken);
//                 resolve(newAccessToken);
//             }
//         });
//     });
// }
// function getRefreshToken() {
//     const loginName = localStorage.getItem('CognitoIdentityServiceProvider.'+appConfig.ClientId+'.LastAuthUser'); 
//     const idToken = localStorage.getItem('CognitoIdentityServiceProvider.'+appConfig.ClientId+'.'+loginName+".refreshToken");
//     return idToken;
//   }
//   function getUsername() {
//     const loginName = localStorage.getItem('CognitoIdentityServiceProvider.'+appConfig.ClientId+'.LastAuthUser'); 
//     return loginName;
//   }