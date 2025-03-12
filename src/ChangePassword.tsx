import React, { useState } from "react";
import axios from "axios";
import "./changePassword.css";

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const API_URL = "https://apicondominios.onrender.com/api/change-password"; // Nueva URL

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      console.log("Enviando solicitud para cambiar contraseña...");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuario no autenticado.");
        return;
      }

      const response = await axios.post(
        API_URL,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Respuesta del servidor:", response.data);
      setMessage(response.data.message || "Contraseña cambiada exitosamente.");

      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error en la respuesta del servidor:", error.response.data);
        setError(error.response.data.message || "Error al cambiar la contraseña.");
      } else {
        console.error("Error desconocido", error);
        setError("Error inesperado al cambiar la contraseña.");
      }
    }
  };

  return (
    <div className="change-password-container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <label>
          Contraseña Actual:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="change-password-input"
          />
        </label>
        <br />
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="change-password-input"
          />
        </label>
        <br />
        <label>
          Confirmar Contraseña:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="change-password-input"
          />
        </label>
        <br />
        <button type="submit" className="change-password-button">
          Cambiar Contraseña
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ChangePassword;
