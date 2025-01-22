import React from "react";
import './login.css';  // Asegúrate de que el archivo CSS esté correctamente vinculado.
import avatarImage from './imagenes/working.png'; // Importar la imagen correctamente

const LoginScreen: React.FC = () => {
  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Condominios.com</h1>
      </header>
      <div className="login-avatar">
        <img src={avatarImage} alt="User avatar" />
      </div>
      <h2 className="login-title">Log In</h2>
      <form className="login-form">
        <input
          type="text"
          placeholder="Cell number"
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />
        <button className="login-button">Log In</button>
      </form>
    </div>
  );
}

export default LoginScreen;
