// src/authConfig.js

export const msalConfig = {
  auth: {
    clientId: "b4af47a5-d482-4056-9c16-8acae2b771c7", // Replace with your actual client ID
    authority: "https://login.microsoftonline.com/f741ff2e-6ff5-4ee1-9aad-882d75ee178fD", // Replace with your tenant ID
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // You can use 'localStorage' if needed
    storeAuthStateInCookie: false,
  },
};

// Optional: Scopes for login (if needed)
export const loginRequest = {
  scopes: ["User.Read"],
};