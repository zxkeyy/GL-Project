import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Expose the server to all network interfaces
    port: 5173,
    strictPort: true, // Ensure the port is not changed
  },
});
