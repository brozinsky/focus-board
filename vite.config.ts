import MillionLint from '@million/lint';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from 'path';

// https://vitejs.dev/config/
const plugins = [react()];
// plugins.unshift(MillionLint.vite())
export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: [{
      find: "@",
      replacement: path.resolve(__dirname, "src")
    }]
  },
  build: {
    rollupOptions: {
      input: ['src/main.tsx', './index.html']
    }
  }
});