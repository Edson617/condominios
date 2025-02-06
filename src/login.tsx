import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import avatarImage from "./imagenes/working.png";

interface LoginForm {
  phone: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Usamos 'useNavigate' para redirigir después del login

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      console.log("Login exitoso:", data);
      localStorage.setItem("token", data.token); // Guardamos el token
      navigate("/dashboard"); // Redirigimos al usuario a la página del dashboard
    } catch (error: unknown) {
      console.error("Error al iniciar sesión:", error);
      if (error instanceof Error) {
        setError(error.message); // Ahora podemos acceder al mensaje del error
      } else {
        setError("Ha ocurrido un error desconocido");
      }
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
