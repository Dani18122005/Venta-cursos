import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { signOut } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAxTh1izn0_ngFdgJ7whB1KYuTb9z5cal4",
  authDomain: "cursos-b9b7c.firebaseapp.com",
  databaseURL: "https://cursos-b9b7c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cursos-b9b7c",
  storageBucket: "cursos-b9b7c.firebasestorage.app",
  messagingSenderId: "737674655085",
  appId: "1:737674655085:web:5edf0de9ee590da3fa5664",
  measurementId: "G-MS56QVLD04"
};

// Verificar si ya existe una instancia de Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
  // Inicializar Analytics solo en el cliente
  analytics = getAnalytics(app);
}

// Función para obtener todos los cursos
export const fetchPosts = async () => {
  try {
    const snapshot = await get(ref(db, 'courses')); // Cambia 'courses' si tu nodo tiene otro nombre
    return snapshot.exists() ? Object.values(snapshot.val()) : [];
  } catch (error) {
    console.error('Error al obtener los cursos:', error.message);
    throw new Error('No se pudieron obtener los cursos.');
  }
};

// Función para obtener un curso por su slug
export const fetchPostBySlug = async (slug) => {
  try {
    const snapshot = await get(ref(db, 'courses')); // Cambia 'courses' si tu nodo tiene otro nombre
    if (snapshot.exists()) {
      const courses = Object.values(snapshot.val());
      return courses.find((course) => course.slug === slug) || null;
    }
    return null;
  } catch (error) {
    console.error(`Error al obtener el curso con slug "${slug}":`, error.message);
    throw new Error(`No se pudo obtener el curso con slug "${slug}".`);
  }
};

// Función para iniciar sesión


export const loginUser = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};


// Función para obtener el usuario actual
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Detenemos la suscripción después de obtener el usuario
      if (user) {
        resolve(user); // Devuelve el usuario autenticado
      } else {
        reject(new Error('No hay un usuario autenticado.'));
      }
    });
  });
};

// Función para registrar un usuario
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Devuelve el usuario registrado
  } catch (error) {
    console.error('Error al registrar el usuario:', error.message);
    throw new Error(error.message); // Lanza el error para manejarlo en el frontend
  }
};

// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true; // Éxito al cerrar sesión
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    throw new Error("No se pudo cerrar la sesión.");
  }
};
export { db, auth, analytics };



