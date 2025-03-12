import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar los datos del usuario de localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("phone");

    // Redirigir a la página de login
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Logout;
