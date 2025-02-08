import { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css'; // Asegúrate de que esté apuntando al archivo CSS correcto

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Cambia el estado del menú al hacer clic
  };

  return (
    <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-button" onClick={toggleMenu}>
        ≡ Menú
      </button>

      {isOpen && (
        <div className="menu-content">
          <Link to="/" className="menu-item">Inicio</Link>
          <Link to="/login" className="menu-item">Iniciar sesión</Link>
          <Link to="/register" className="menu-item">Registrar usuario</Link>
          <Link to="/PaymentForm" className="menu-item">Registrar pago</Link>
          <Link to="/FinesForm" className="menu-item">Registrar multas</Link>
          <Link to="/GatePermissionForm" className="menu-item">Permiso de portones</Link>
          <Link to="/profiles" className="menu-item">Perfiles</Link>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
