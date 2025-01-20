import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate
import './PaymentForm.css'; // Asegúrate de importar el archivo CSS exclusivo

function PaymentForm() {
  const navigate = useNavigate(); // Usar useNavigate en lugar de useHistory

  const [payment, setPayment] = useState({
    amount: '',
    date: '',
    method: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registro de pago:', payment);
    // Redirige al usuario a una página de confirmación o al login, dependiendo de tu flujo
    navigate('/confirmacion'); // Usar navigate en lugar de history.push
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Registrar Pago</h1>
        <p>Introduce los detalles del pago para registrar la transacción.</p>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="amount">Monto:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={payment.amount}
            onChange={handleChange}
            required
            placeholder="Monto del pago"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={payment.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="method">Método de Pago:</label>
          <input
            type="text"
            id="method"
            name="method"
            value={payment.method}
            onChange={handleChange}
            required
            placeholder="Método de pago (Ej: tarjeta, efectivo)"
          />
        </div>

        <button type="submit" className="payment-button">Registrar Pago</button>
      </form>
    </div>
  );
}

export default PaymentForm;
