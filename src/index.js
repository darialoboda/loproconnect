import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
// Імпортуємо Material UI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);