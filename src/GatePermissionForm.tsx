import React, { useState } from 'react';
import './GatePermissionForm.css';

function GatePermissionForm() {
  const [permission, setPermission] = useState({
    name: '',
    vehicle: '',
    accessTime: '',
    reason: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPermission({
      ...permission,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Permiso registrado:', permission);
    alert('Permiso registrado exitosamente');
  };

  return (
    <div className="gate-permission-container">
      <div className="gate-permission-header">
        <h1>Solicitar Permiso de Acceso</h1>
      </div>

      <form onSubmit={handleSubmit} className="gate-permission-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={permission.name}
            onChange={handleChange}
            required
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicle">Vehículo:</label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            value={permission.vehicle}
            onChange={handleChange}
            required
            placeholder="Ingresa los detalles del vehículo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="accessTime">Hora de acceso:</label>
          <input
            type="time"
            id="accessTime"
            name="accessTime"
            value={permission.accessTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Motivo:</label>
          <textarea
            id="reason"
            name="reason"
            value={permission.reason}
            onChange={handleChange}
            required
            placeholder="Describe el motivo de acceso"
          ></textarea>
        </div>

        <button type="submit" className="gate-permission-button">Enviar Solicitud</button>
      </form>
    </div>
  );
}

export default GatePermissionForm;
