// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
   server: {
      proxy: {
         '/api': {
            target: 'http://localhost:3000', // Ensure this is the correct target
            secure: false,
         }
      },
   },
   plugins: [react()],
});
