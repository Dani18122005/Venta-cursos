import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/firebase';
import '../styles/global.css';

const VideoDialog = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleViewContent = () => {
    if (!user) {
      alert('Debes iniciar sesión para ver el contenido del curso.');
      window.location.href = '/login';
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleViewContent}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ver Contenido
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-gray-300 text-gray-800 rounded-full p-2 hover:bg-gray-400"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Contenido del Curso</h2>
            <p className="mb-4">{course.description}</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={course.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded"
                title={`Video del curso ${course.title}`}
              ></iframe>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDialog;
