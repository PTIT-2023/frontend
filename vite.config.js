import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [vue()],
  resolve: {
    // alias: [
    //   {
    //     find: /^~.+/,
    //     replacement: (val) => {
    //       return val.replace(/^~/, "");
    //     },
    //   },
      
    // ],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
