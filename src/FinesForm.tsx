import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinesForm.css';

function FinesForm() {
  const navigate = useNavigate(); // Hook para navegación
  const [fine, setFine] = useState({
    reason: '',
    amount: '',
    date: '',
    user: '',
    department: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const API_URL = 'https://apicondominios.onrender.com/api/insertar_multas';


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFine({
      ...fine,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token de autenticación. Por favor, inicia sesión.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(fine),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);
        alert(`Error: ${errorData.message || "No se pudo registrar la multa."}`);
        return;
      }

      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setIsLoading(false);
      alert('Ocurrió un error en la conexión. Inténtalo más tarde.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/confirmacion');
  };

  return (
    <div className="fines-container">
      <div className="fines-header">
        <h1>Registrar Multa</h1>
      </div>
      <form onSubmit={handleSubmit} className="fines-form">
        <div className="form-group">
          <label htmlFor="reason">Razón de la Multa:</label>
          <textarea id="reason" name="reason" value={fine.reason} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Monto:</label>
          <input type="number" id="amount" name="amount" value={fine.amount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input type="date" id="date" name="date" value={fine.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="user">Usuario:</label>
          <input type="text" id="user" name="user" value={fine.user} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="department">Departamento:</label>
          <input type="text" id="department" name="department" value={fine.department} onChange={handleChange} required />
        </div>
        <button type="submit" className="fines-button">
          {isLoading ? 'Cargando...' : 'Registrar Multa'}
        </button>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Multa registrada exitosamente!</h2>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinesForm;
