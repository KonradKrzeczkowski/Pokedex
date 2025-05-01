<<<<<<< Updated upstream
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";  
import "./index.css";
import App from "./App.jsx";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext/ThemeContext.jsx';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
 <ThemeProvider>
    <App />
    </ThemeProvider>
  </StrictMode></BrowserRouter>
);
>>>>>>> Stashed changes
