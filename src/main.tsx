import ReactDOM from 'react-dom/client';
// import React from 'react';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "966261818194-qcka0k2r1pam5mmininp257kbeqgdbg7.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId} >
    <App />
  </GoogleOAuthProvider>
  // </React.StrictMode>,
)
