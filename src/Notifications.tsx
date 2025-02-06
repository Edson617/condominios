import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  _id: string;
  message: string;
  department: string;
  isRead: boolean;
  createdAt: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notificaciones</h2>
      {notifications.length === 0 ? (
        <p>No hay notificaciones</p>
      ) : (
        <ul>
          {notifications.map((noti) => (
            <li key={noti._id}>{noti.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
