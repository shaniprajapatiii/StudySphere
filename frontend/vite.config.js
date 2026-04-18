import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const devApiTarget = env.VITE_API_BASE_URL || "http://localhost:4000";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: devApiTarget,
          changeOrigin: true,
          secure: false,
        },
        "/auth": {
          target: devApiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
