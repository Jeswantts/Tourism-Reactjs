import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PackageProvider } from './Context/PackageContext';
import { AuthProvider } from './Context/AuthContext';
import { CustomerIdProvider } from './Context/CustomerIdContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomerIdProvider>
    <AuthProvider>
    <PackageProvider>
      <App />
    </PackageProvider>
    </AuthProvider>
    </CustomerIdProvider>
    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
