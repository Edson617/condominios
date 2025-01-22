import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinesForm.css';

function FinesForm() {
  const navigate = useNavigate(); // Hook para navegación
  const [fine, setFine] = useState({
    reason: '',
    amount: '',
    date: '',
  });

  const API_URL = 'http://localhost:4000/api/insertar_multas'; // URL de la API

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFine({
      ...fine,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fine),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Multa registrada con éxito:', result);
        navigate('/confirmacion');
      } else {
        console.error('Error al registrar la multa:', response.statusText);
        alert('No se pudo registrar la multa. Verifica los datos e inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error en la conexión. Inténtalo más tarde.');
    }
  };

  return (
    <div className="fines-container">
      <div className="fines-header">
        <h1>Registrar Multa</h1>
      </div>

      <form onSubmit={handleSubmit} className="fines-form">
        <div className="form-group">
          <label htmlFor="reason">Razón de la Multa:</label>
          <textarea
            id="reason"
            name="reason"
            value={fine.reason}
            onChange={handleChange}
            required
            placeholder="Describe la razón de la multa"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Monto:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={fine.amount}
            onChange={handleChange}
            required
            placeholder="Monto de la multa"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={fine.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="fines-button">Registrar Multa</button>
      </form>
    </div>
  );
}

export default FinesForm;
