import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import avatarImage from "./imagenes/working.png";

interface LoginForm {
  phone: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para la navegación

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Resetear error antes de hacer la petición

    try {
      const response = await fetch("https://apicondominios.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      console.log("Login exitoso:", data);

      localStorage.setItem("token", data.token); // Guardamos el token
      localStorage.setItem("role", data.role);   // Guardamos el rol del usuario

      // Redirigir según el rol
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error instanceof Error ? error.message : "Ha ocurrido un error desconocido");
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Condominios.com</h1>
      </header>
      <div className="login-avatar">
        <img src={avatarImage} alt="User avatar" />
      </div>
      <h2 className="login-title">Log In</h2>

      {error && <div className="error-message">{error}</div>} {/* Mostrar mensaje de error */}

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="phone"
          placeholder="Cell number"
          className="login-input"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="login-button" type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginScreen;
