import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './auth/authConfig';
import axios from 'axios';
import { loginRequest } from './auth/authConfig';

const pca = new PublicClientApplication(msalConfig);

axios.interceptors.request.use(
  async (response) => {
    let msalResponse;
    const accessTokec = sessionStorage.getItem("AccessToken");
    const account = pca.getAllAccounts()[0];
    if (!accessTokec) {
      await pca.initialize();
      msalResponse = await pca.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
    }
    if (msalResponse && msalResponse.accessToken) {
      sessionStorage.setItem("AccessToken", msalResponse.accessToken);
    }
    response.headers.Authorization = `Bearer ${accessTokec}`;
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
