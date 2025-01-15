import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Importar BrowserRouter y Routes
import './index.css';
import App from './App.tsx';
import LoginScreen from './login.tsx';  // Importar el componente LoginScreen

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  {/* Envolver la aplicación en BrowserRouter */}
      <Routes>
        <Route path="/" element={<App />} />  {/* Ruta para la página principal */}
        <Route path="/login" element={<LoginScreen />} />  {/* Ruta para LoginScreen */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
