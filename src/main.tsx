import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importar BrowserRouter y Routes
import './index.css';
import App from './App.tsx'; // Importar el componente principal
import LoginScreen from './login.tsx'; // Importar el componente LoginScreen
import RegisterScreen from './registro.tsx'; // Importar el componente RegisterScreen
import PaymentForm from './PaymentForm.tsx'; // Importar el componente PaymentForm
import FinesForm from './FinesForm.tsx'; // Importar el componente FinesForm
import GatePermissionForm from './GatePermissionForm.tsx'; // Importar el formulario de permiso de portones
import './registro.css';
import ProfilesList from "./ProfilesList.tsx"; // Importa el nuevo componente
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* Envolver la aplicación en BrowserRouter */}
      <Routes>
        <Route path="/" element={<App />} /> {/* Ruta para la página principal */}
        <Route path="/login" element={<LoginScreen />} /> {/* Ruta para LoginScreen */}
        <Route path="/register" element={<RegisterScreen />} /> {/* Ruta para RegisterScreen */}
        <Route path="/PaymentForm" element={<PaymentForm />} /> {/* Ruta para el formulario de pago */}
        <Route path="/FinesForm" element={<FinesForm />} /> {/* Ruta para el formulario de multas */}
        <Route path="/profiles" element={<ProfilesList />} />
        <Route path="/GatePermissionForm" element={<GatePermissionForm />} /> {/* Ruta para el formulario de permiso de portones */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
