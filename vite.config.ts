import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src/shared/assets/icons')],
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},

	server: {
		port: 5173,
		strictPort: true /* Фиксированный порт 5173 */,
		hmr: true,
		watch: {
			usePolling: true /* polling для более надежного отслеживания изменений */,
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	},
})
