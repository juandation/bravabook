import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => ({
	root: './src',
	base: command === 'serve' ? '/' : '/',
	publicDir: '../public',
	plugins: [vue(), vueDevTools(), tailwindcss()],
	server: {
		port: 5173,
		strictPort: true,
		host: '0.0.0.0',
		open: false,
		fs: {
			strict: true,
			allow: ['..']
		},
		hmr: {
			host: 'localhost',
			port: 5173
		},
		watch: {
			usePolling: true
		},
		proxy: {
			'^/api/.*': {
				target: 'http://api:5001',
				changeOrigin: true,
				secure: false,
			}
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	optimizeDeps: {
		include: ['vue', 'vue-router', 'pinia']
	},
	build: {
		outDir: '../dist',
		assetsDir: 'assets',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: './src/index.html'
			},
			output: {
				entryFileNames: 'assets/[name]-[hash].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]'
			}
		}
	}
}));
