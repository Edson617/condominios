import React, { useState } from 'react';

function RegisterScreen() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      // Enviar datos del formulario
      console.log('Usuario registrado:', formData);
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Condominios.com</h1>
      </header>
      <div className="register-avatar">
        <img src="src\imagenes\customer.png" alt="User avatar" />
      </div>
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="register-input"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register-input"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="register-input"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="register-input"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default RegisterScreen;
