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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFine({
      ...fine,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registro de multa:', fine);
    navigate('/confirmacion'); // Redirigir al usuario después del envío
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
