import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src/shared/assets/icons')],
		}),
	],

	resolve: {
		alias: [
			{
				find: '@/',
				replacement: path.resolve('src') + '/',
			},
		],
	},
})
