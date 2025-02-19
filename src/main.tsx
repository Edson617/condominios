import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import LoginScreen from "./login.tsx";
import RegisterScreen from "./registro.tsx";
import PaymentForm from "./PaymentForm.tsx";
import FinesForm from "./FinesForm.tsx";
import GatePermissionForm from "./GatePermissionForm.tsx";
import ProfilesList from "./ProfilesList.tsx";
import Notifications from "./Notifications.tsx";
import AdminDashboard from "./dashboard.tsx"; // Dashboard de admin
import UserDashboard from "./UserDashboard.tsx";   // Dashboard de usuario

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/PaymentForm" element={<PaymentForm />} />
        <Route path="/FinesForm" element={<FinesForm />} />
        <Route path="/profiles" element={<ProfilesList />} />
        <Route path="/GatePermissionForm" element={<GatePermissionForm />} />
        <Route path="/notificaciones" element={<Notifications />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Ruta para admin */}
        <Route path="/user-dashboard" element={<UserDashboard />} />   {/* Ruta para usuario */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
