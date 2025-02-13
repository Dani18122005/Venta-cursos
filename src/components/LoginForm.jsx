import React from 'react';
import { loginUser } from '../lib/firebase'; // Asegúrate de que esta función esté definida en `firebase.js`
import '../styles/global.css';

const LoginForm = () => {
  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await loginUser(email, password); // Llama a Firebase para autenticar al usuario
      window.location.href = '/dashboard'; // Redirige al usuario después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert('Error: ' + error.message); // Muestra un error al usuario
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingresa tu correo"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
