import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faMoneyBillAlt,
  faLock,
  faFileInvoiceDollar,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Navbar.css';

interface Notification {
  _id: string;
  message: string;
  department: string;
  isRead: boolean;
  createdAt: string;
}

const Navbar: React.FC = () => {
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0); // Estado para las notificaciones no leídas
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Notification[]>('https://apicondominios.onrender.com/api/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filtrar las notificaciones no leídas
        const unreadCount = response.data.filter((noti) => !noti.isRead).length;
        setUnreadNotifications(unreadCount);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      }
    };

    fetchNotifications();
  }, []); // Solo se ejecuta al montar el componente

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faHome} className="navbar-icon" />
          <span>Inicio</span>
        </li>
        <li className="navbar-item" onClick={() => navigate('/profiles')}>
          <FontAwesomeIcon icon={faUsers} className="navbar-icon" />
          <span>Usuarios</span>
        </li>
        <li className="navbar-item" onClick={() => navigate('/FinesForm')}>
          <FontAwesomeIcon icon={faMoneyBillAlt} className="navbar-icon" />
          <span>Multas</span>
        </li>
        <li className="navbar-item" onClick={() => navigate('/GatePermissionForm')}>
          <FontAwesomeIcon icon={faLock} className="navbar-icon" />
          <span>Permiso de Portones</span>
        </li>
        <li className="navbar-item" onClick={() => navigate('/PaymentForm')}>
          <FontAwesomeIcon icon={faFileInvoiceDollar} className="navbar-icon" />
          <span>Pago</span>
        </li>
        <li className="navbar-item" onClick={() => navigate('/notificaciones')}>
          <div className="notification-icon">
            <FontAwesomeIcon icon={faBell} className="navbar-icon" />
            {unreadNotifications > 0 && (
              <span className="notification-badge">{unreadNotifications}</span> // Mostrar el número de notificaciones no leídas
            )}
          </div>
          <span>Notificaciones</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
