import react from '@vitejs/plugin-react'
import {defineConfig} from "vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  server: {
    port: 8080, // Change to your desired port
    plugins: [react()],
  }
})
