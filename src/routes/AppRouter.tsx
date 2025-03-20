import { Navigate, Route, Routes } from 'react-router'

import { Content } from '@/components/Content'
import { Operations } from '@/pages/Operations'
import { Organizations } from '@/pages/Organizations'
import { AppRoutes } from './appRoutes'
import { Counterparties } from '@/pages/Counterparties'
import { Accounts } from '@/pages/Accounts'
import { Articles } from '@/pages/Articles'
import { Cases } from '@/pages/Сases'
import { Transactions } from '@/pages/Transactions'
import { Imports } from '@/pages/Imports'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Content />}>
				<Route path='/' element={<Navigate to={AppRoutes.OPERATIONS} replace />} />
				<Route path={AppRoutes.OPERATIONS} element={<Operations />} />
				<Route path={AppRoutes.ORGANIZATIONS} element={<Organizations />} />
				<Route path={AppRoutes.COUNTERPARTIES} element={<Counterparties />} />
				<Route path={AppRoutes.ACCOUNTS} element={<Accounts />} />
				<Route path={AppRoutes.ARTICLES} element={<Articles />} />
				<Route path={AppRoutes.CASES} element={<Cases />} />
				<Route path={AppRoutes.TRANSACTIONS} element={<Transactions />} />
				<Route path={AppRoutes.IMPORTS} element={<Imports />} />
			</Route>
		</Routes>
	)
}
