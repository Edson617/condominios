import React from 'react';
import './App.css';

function HomePage() {
  return (
    <div className="home-container">
      {/* Sección de Bienvenida */}
      <div className="welcome-section">
        <h1>Bienvenido</h1>
        <p>Accede a todo lo que necesitas para gestionar tus condominios.</p>
      </div>

      {/* Sección de la imagen */}
      <div className="image-section">
        <img
          src="src\imagenes\condominio.png"
          alt="Building illustration"
        />
      </div>
    </div>
  );
}

export default HomePage;
