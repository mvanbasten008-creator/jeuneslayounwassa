import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig(({mode}) => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          league: path.resolve(__dirname, 'league.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html')
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
