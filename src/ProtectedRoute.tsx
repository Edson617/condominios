import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  // Verificar si el token está presente y el rol del usuario
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Si no hay token o el rol no es el esperado, redirigir a login
  if (!token || role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children; // Si está autenticado y tiene el rol adecuado, renderiza la ruta
};

export default ProtectedRoute;
