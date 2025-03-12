import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de que react-router-dom esté instalado
import Navbar from "./components/Navbar";

const UserDashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1>Dashboard de Usuario</h1>
        <p>Bienvenido, usuario.</p>
        
        {/* Enlace para cambiar la contraseña */}
        <div>
          <Link to="/change-password">
            <button className="change-password-btn">Cambiar Contraseña</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
