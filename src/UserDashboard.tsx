import React from "react";
import Navbar from "./components/Navbar";

const UserDashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h1>Dashboard de Usuario</h1>
        <p>Bienvenido, usuario.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
