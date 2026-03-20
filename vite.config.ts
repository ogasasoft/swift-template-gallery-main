import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig((_mode) => ({
  // ★ ここで「プロジェクト直下」をルートに固定
  root: ".",
  // ★ ここで必ず ./public を使うように固定
  publicDir: path.resolve(__dirname, "public"),

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
