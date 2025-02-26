export const traducciones = {
  es: {
    heroTitle: "Descubre los Mejores Cursos",
    heroDescription: "Aprende de los mejores instructores con contenido de calidad y mejora tus habilidades profesionales.",
    featuredCourses: "Cursos Destacados",
    coursesForSale: "Cursos a la Venta"
  },
  en: {
    heroTitle: "Discover the Best Courses",
    heroDescription: "Learn from the best instructors with high-quality content and improve your professional skills.",
    featuredCourses: "Featured Courses",
    coursesForSale: "Courses for Sale"
  }
};

// Para que se pueda acceder desde el cliente
if (typeof window !== "undefined") {
  window.traducciones = traducciones;
}

export default traducciones;