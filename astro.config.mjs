import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import 'dotenv/config';



export default defineConfig({
  integrations: [
    react(), // Agregar la integración de React
    tailwind()
  ],
  vite: {
    css: {
      preprocessorOptions: {
        postcss: './postcss.config.js', // Configuración global de TailwindCSS
      },
    },
  },
});


