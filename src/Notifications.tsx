import { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css"; // Importamos los estilos

interface Notification {
  _id: string;
  message: string;
  department: string;
  isRead: boolean;
  createdAt: string;
  isDeleting?: boolean; // <-- Agregamos esta línea para evitar el error
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://apicondominios.onrender.com/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Ordenamos las notificaciones por fecha (más recientes primero)
      const sortedNotifications = response.data.sort(
        (a: Notification, b: Notification) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      // Animación antes de eliminar
      setNotifications((prev) =>
        prev.map((noti) =>
          noti._id === id ? { ...noti, isDeleting: true } : noti
        )
      );

      setTimeout(async () => {
        await axios.delete(
          `https://apicondominios.onrender.com/api/notificaciones/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setNotifications((prev) => prev.filter((noti) => noti._id !== id));
      }, 300); // Espera a la animación antes de eliminar
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  return (
    <div className="notifications">
      <h2>Notificaciones</h2>
      {notifications.length === 0 ? (
        <p>No hay notificaciones</p>
      ) : (
        <div className="notifications-container">
          <ul>
            {notifications.map((noti) => (
              <li
                key={noti._id}
                className={`${noti.isRead ? "read" : "unread"} ${
                  noti.isDeleting ? "fade-out" : ""
                }`}
              >
                <h4>{noti.message}</h4>
                <time>{new Date(noti.createdAt).toLocaleString()}</time>
                <div className="notification-actions">
                  <button
                    className="delete"
                    onClick={() => handleDelete(noti._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
