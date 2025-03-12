import React, { useState } from 'react';
import './registro.css';
import avatarImage from "./imagenes/customer.png"; // Importar la imagen

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  role: string; // Nuevo campo para el rol
}

function RegisterScreen() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    role: 'user' // Valor por defecto
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Permitir solo números en el campo de departamento
    if (name === "department" && !/^\d*$/.test(value)) return;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      // Verifica los valores antes de enviar la solicitud
      console.log("Enviando datos de registro:", {
        phone: formData.username, // Cambié 'username' por 'phone'
        email: formData.email,
        password: formData.password,
        department: formData.department,
        name: formData.username,  // Usé 'username' como 'name' también
        role: formData.role
      });

      const response = await fetch('https://apicondominios.onrender.com/api/register', {
        // Cambia esta URL por la de tu API en Render
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.username, // Cambio de 'username' a 'phone'
          email: formData.email,
          password: formData.password,
          department: formData.department,
          name: formData.username,
          role: formData.role // Enviar el rol al backend
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Usuario registrado con éxito');
      } else {
        alert(data.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrar al usuario');
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Condominios.com</h1>
      </header>
      <div className="register-avatar">
        <img src={avatarImage} alt="User avatar" /> {/* Imagen importada */}
      </div>
      <h2 className="register-title">Registro</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nombre completo"
          className="register-input"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register-input"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-input"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          className="register-input"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Número de departamento"
          className="register-input"
          value={formData.department}
          onChange={handleInputChange}
          required
          maxLength={5} // Máximo 5 dígitos
        />

        <label htmlFor="role">Selecciona un rol:</label>
        <select
          id="role"
          name="role"
          className="register-input"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit" className="register-button">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterScreen;
