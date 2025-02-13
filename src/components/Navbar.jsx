import React, { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../lib/firebase';
import { LogIn, User } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/login";
  };

  return ( 
    <nav>
      <ul className="flex space-x-4 items-center">
        <li><a href="/" className="hover:text-gray-300">Inicio</a></li>
        {user ? (
          <>
            <li>
              <a href="/dashboard" className="hover:text-gray-300 flex items-center gap-2">
                <User className="w-5 h-5" /> {/* Icono de usuario */}
                {user.email.split('@')[0].match(/^[a-zA-Z]+/)[0]}

              </a>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-gray-300">
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login" className="hover:text-gray-300 flex items-center gap-2">
                <LogIn className="w-5 h-5" /> {/* Icono de login */}
                Iniciar Sesión
              </a>
            </li>
            <li><a href="/register" className="hover:text-gray-300">Registrarse</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
