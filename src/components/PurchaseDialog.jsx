import React, { useState, useEffect } from 'react';
import { db, getCurrentUser } from '../lib/firebase';
import { ref, update, get } from 'firebase/database';
import '../styles/global.css';

const PurchaseDialog = ({ course,  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(course.isPurchased || false);
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

    const fetchCourseData = async () => {
      const courseRef = ref(db, `courses/${course.id}`);
      try {
        const snapshot = await get(courseRef);
        if (snapshot.exists()) {
          const purchased = snapshot.val().isPurchased;
          setIsPurchased(purchased);
          updateLocalCourses(course.id, purchased);
        }
      } catch (error) {
        console.error(" Error obteniendo curso desde Firebase:", error);
      }
    };

    fetchUser();
    fetchCourseData();
  }, [course.id]);

  const handlePurchase = async () => {
    if (!user) {
      alert('Debes iniciar sesión para comprar este curso.');
      window.location.href = '/login';
      return;
    }

    try {
      const courseRef = ref(db, `courses/${course.id}`);
      await update(courseRef, { isPurchased: true });
      setIsPurchased(true);
      alert('✅ Compra realizada con éxito.');

      // 🔄 Forzar recarga completa de la página después de 1 segundo
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 1000);

    } catch (error) {
      console.error(' Error al procesar la compra:', error);
    }
};


  return (
    <>
      {!isPurchased && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Comprar Curso
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-gray-300 text-gray-800 rounded-full p-2 hover:bg-gray-400"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Confirmar Compra</h2>
            <p className="mb-4">¿Deseas comprar el curso <strong>{course.title}</strong> por ${course.price}?</p>
            <button
              onClick={handlePurchase}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
            >
              Confirmar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseDialog;
