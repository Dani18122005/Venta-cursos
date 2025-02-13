import React, { useState, useEffect } from 'react';
import { getCurrentUser, db } from '../lib/firebase';
import { ref, get } from 'firebase/database';
import '../styles/global.css';

const VideoDialog = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isPurchased, setIsPurchased] = useState(course.isPurchased);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };

    const fetchCourseData = async () => {
      const courseRef = ref(db, `courses/${course.id}`);
      try {
        const snapshot = await get(courseRef);
        if (snapshot.exists()) {
          setIsPurchased(snapshot.val().isPurchased);
        }
      } catch (error) {
        console.error("🔥 Error obteniendo curso desde Firebase:", error);
      }
    };

    fetchUser();
    fetchCourseData();
  }, [course.id]);

  const handleViewContent = () => {
    if (!isPurchased) {
      alert("❌ Debes comprar este curso primero.");
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleViewContent}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Ver Contenido
      </button>

      {isOpen && isPurchased && (
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
