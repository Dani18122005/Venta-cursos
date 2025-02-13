import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/firebase";
import '../styles/global.css';
const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          window.location.href = "/login"; // Redirige al login si no está autenticado
        } else {
          setUser(currentUser); // Establece el usuario autenticado
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error.message);
        window.location.href = "/login"; // Redirige en caso de error
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Cargando...</p>; // Muestra un mensaje mientras se obtiene el usuario
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">
        ¡Bienvenido, {user.email || "Usuario"}!
      </h1>
      <p className="mt-4">Puedes volver al inicio haciendo clic en la barra de navegación.</p>
    </div>
  );
};

export default Dashboard;
