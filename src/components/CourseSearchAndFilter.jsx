import React, { useState, useEffect } from "react";
import { fetchPosts } from "../lib/firebase";

const CourseSearchAndFilter = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allCourses = await fetchPosts();
      setCourses(allCourses);
      setFilteredCourses(allCourses);
      const uniqueCategories = [...new Set(allCourses.map((course) => course.category))];
      setCategories(uniqueCategories);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  return (
    <div>
      {/* Contenedor de la barra de búsqueda y el filtro */}
      <div className="sticky top-0 bg-white z-10 shadow-md p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Barra de Búsqueda */}
        <input
          type="text"
          placeholder="Buscar cursos..."
          className="w-full sm:w-3/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filtro por Categoría */}
        <select
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Resultados de Cursos */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <li key={course.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
            <a href={`/blog/${course.slug}`}>
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover transform hover:scale-105 transition" />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 text-sm">{course.description}</p>
                <p className="text-blue-500 font-bold text-sm mt-2">{course.category}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Mensaje si no hay resultados */}
      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No se encontraron cursos.</p>
      )}
    </div>
  );
};

export default CourseSearchAndFilter;
