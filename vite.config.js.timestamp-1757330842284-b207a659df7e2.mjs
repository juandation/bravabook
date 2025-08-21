// vite.config.js
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import vue from "file:///app/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///app/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import tailwindcss from "file:///app/node_modules/@tailwindcss/vite/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///app/vite.config.js";
var vite_config_default = defineConfig(({ command }) => ({
  root: "./src",
  base: command === "serve" ? "/" : "/",
  publicDir: "../public",
  plugins: [vue(), vueDevTools(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
    open: false,
    fs: {
      strict: true,
      allow: [".."]
    },
    hmr: {
      host: "localhost",
      port: 5173
    },
    watch: {
      usePolling: true
    },
    proxy: {
      "^/api/.*": {
        target: "http://api:5001",
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "pinia"]
  },
  build: {
    outDir: "../dist",
    assetsDir: "assets",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/index.html"
      },
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4gKHtcblx0cm9vdDogJy4vc3JjJyxcblx0YmFzZTogY29tbWFuZCA9PT0gJ3NlcnZlJyA/ICcvJyA6ICcvJyxcblx0cHVibGljRGlyOiAnLi4vcHVibGljJyxcblx0cGx1Z2luczogW3Z1ZSgpLCB2dWVEZXZUb29scygpLCB0YWlsd2luZGNzcygpXSxcblx0c2VydmVyOiB7XG5cdFx0cG9ydDogNTE3Myxcblx0XHRzdHJpY3RQb3J0OiB0cnVlLFxuXHRcdGhvc3Q6ICcwLjAuMC4wJyxcblx0XHRvcGVuOiBmYWxzZSxcblx0XHRmczoge1xuXHRcdFx0c3RyaWN0OiB0cnVlLFxuXHRcdFx0YWxsb3c6IFsnLi4nXVxuXHRcdH0sXG5cdFx0aG1yOiB7XG5cdFx0XHRob3N0OiAnbG9jYWxob3N0Jyxcblx0XHRcdHBvcnQ6IDUxNzNcblx0XHR9LFxuXHRcdHdhdGNoOiB7XG5cdFx0XHR1c2VQb2xsaW5nOiB0cnVlXG5cdFx0fSxcblx0XHRwcm94eToge1xuXHRcdFx0J14vYXBpLy4qJzoge1xuXHRcdFx0XHR0YXJnZXQ6ICdodHRwOi8vYXBpOjUwMDEnLFxuXHRcdFx0XHRjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHRcdHNlY3VyZTogZmFsc2UsXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdCdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG5cdFx0fVxuXHR9LFxuXHRvcHRpbWl6ZURlcHM6IHtcblx0XHRpbmNsdWRlOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJ11cblx0fSxcblx0YnVpbGQ6IHtcblx0XHRvdXREaXI6ICcuLi9kaXN0Jyxcblx0XHRhc3NldHNEaXI6ICdhc3NldHMnLFxuXHRcdGVtcHR5T3V0RGlyOiB0cnVlLFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGlucHV0OiB7XG5cdFx0XHRcdG1haW46ICcuL3NyYy9pbmRleC5odG1sJ1xuXHRcdFx0fSxcblx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHRlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcblx0XHRcdFx0Y2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG5cdFx0XHRcdGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThMLFNBQVMsb0JBQW9CO0FBQzNOLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGVBQWUsV0FBVztBQUo2RSxJQUFNLDJDQUEyQztBQU1qSyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsT0FBTztBQUFBLEVBQzdDLE1BQU07QUFBQSxFQUNOLE1BQU0sWUFBWSxVQUFVLE1BQU07QUFBQSxFQUNsQyxXQUFXO0FBQUEsRUFDWCxTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVksR0FBRyxZQUFZLENBQUM7QUFBQSxFQUM3QyxRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixPQUFPLENBQUMsSUFBSTtBQUFBLElBQ2I7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNQO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTixZQUFZO0FBQUEsSUFDYjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ04sWUFBWTtBQUFBLFFBQ1gsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUNyRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNiLFNBQVMsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBLEVBQ3ZDO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsTUFDZCxPQUFPO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ1AsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDakI7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
