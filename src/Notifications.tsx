import { useState, useEffect } from 'react';
import './Notifications.css';

interface Notification {
  _id: string;
  message: string;
  department: string;
  isRead: boolean;
  createdAt: string;
}

const Notifications = ({ department }: { department: string }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/notificaciones/${department}`);
      if (response.ok) {
        const data: Notification[] = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications when the component is mounted
  useEffect(() => {
    fetchNotifications();
  }, [department, fetchNotifications]);  // Incluimos fetchNotifications aquí

  // Mark notification as read
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/notificaciones/${notificationId}/marcar_leida`, {
        method: 'PUT',
      });
      if (response.ok) {
        // Update local state to mark the notification as read
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationId ? { ...notification, isRead: true } : notification
          )
        );
      }
    } catch (error) {
      console.error('Error al marcar la notificación como leída:', error);
    }
  };

  if (loading) {
    return <div>Cargando notificaciones...</div>;
  }

  return (
    <div>
      <h2>Notificaciones</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <p>{notification.message}</p>
              <small>Departamento: {notification.department}</small>
              <br />
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
              <br />
              {notification.isRead ? (
                <span>Leída</span>
              ) : (
                <button onClick={() => handleMarkAsRead(notification._id)}>Marcar como leída</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes notificaciones</p>
      )}
    </div>
  );
};

export default Notifications;
