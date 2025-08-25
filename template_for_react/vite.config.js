import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: ["node_modules", "dist"],
      fix: true,
      lintOnStart: true,
    }),
  ],

  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: "build",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === "production"
          ? "[hash:base64:8]"
          : "[name]__[local]--[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `,
      },
    },
  },
});
