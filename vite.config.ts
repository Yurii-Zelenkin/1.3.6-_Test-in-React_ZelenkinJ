/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslint from "vite-plugin-eslint";

import type { UserConfig } from "vite";

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
  test: {
    globals: true,
    environment: "jsdom",
  },

  base: process.env.NODE_ENV === "production" ? "/1.1.17/" : "/",
  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
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
} as UserConfig);
