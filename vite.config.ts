import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/resume/', // हे असलं पाहिजे कारण रिपॉझिटरीचं नाव resume आहे
})