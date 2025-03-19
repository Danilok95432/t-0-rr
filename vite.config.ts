import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		createSvgIconsPlugin({
			// Путь к папке с иконками
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
			// symbolId (идентификатор для использования в компонентах)
			symbolId: 'icon-[name]',
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
