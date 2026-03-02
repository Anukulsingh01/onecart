import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from "./context/AuthContext.jsx"
import UserContext from './context/UserContext.jsx'
import ShopContext from './context/ShopContext.jsx'
import axios from 'axios' // 1. Axios import karein

// 2. Interceptor Setup: Ye har request se pehle token check karega
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.token = token; // Backend isi 'token' key ko dhoond raha hai
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider> 
      <UserContext>
        <ShopContext>
          <App />
        </ShopContext>
      </UserContext>
    </AuthContextProvider> 
  </BrowserRouter>
)