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

	build: {
		// Включение Code Splitting
		rollupOptions: {
			output: {
				manualChunks: {
					// Отдельные чанки для вендорных библиотек
					vendor: ['react', 'react-dom', 'react-router-dom'],
					// Отдельные чанки для страниц
					operations: ['./src/pages/Operations'],
					organizations: ['./src/pages/Organizations', './src/pages/Organization'],
					counterparties: ['./src/pages/Counterparties', './src/pages/Counterparty'],
					accounts: ['./src/pages/Accounts', './src/pages/Account'],
					articles: ['./src/pages/Articles', './src/pages/Article'],
					cases: ['./src/pages/Cases', './src/pages/Case'],
					transactions: ['./src/pages/Transactions', './src/pages/Transaction'],
					imports: ['./src/pages/Imports', './src/pages/Import'],
					summary: [
						'./src/pages/SummaryCashFlow',
						'./src/pages/ArticlesAndOrganizations',
						'./src/pages/CasesAndDeals',
					],
				},
			},
		},
		// source maps для production для облегчения отладки
		sourcemap: true,
	},
})
