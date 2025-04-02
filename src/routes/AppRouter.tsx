import { Navigate, Route, Routes } from 'react-router'

import { Content } from '@/components/Content'
import { Operations } from '@/pages/Operations/Operations'
import { Organizations } from '@/pages/Organizations/Organizations'
import { AppRoutes } from './appRoutes'
import { Counterparties } from '@/pages/Counterparties/Counterparties'
import { Accounts } from '@/pages/Accounts'
import { Articles } from '@/pages/Articles'
import { Cases } from '@/pages/Cases'
import { Transactions } from '@/pages/Transactions'
import { Imports } from '@/pages/Imports'
import { Organization } from '@/pages/Organization/Organization'
import { Counterparty } from '@/pages/Counterparty/Counterparty'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Content />}>
				<Route path='/' element={<Navigate to={AppRoutes.OPERATIONS} replace />} />
				<Route path={AppRoutes.OPERATIONS} element={<Operations />} />
				{/*  */}
				<Route path={AppRoutes.ORGANIZATIONS} element={<Organizations />} />
				<Route path={`${AppRoutes.ORGANIZATION}/:id`} element={<Organization />} />
				{/*  */}
				<Route path={AppRoutes.COUNTERPARTIES} element={<Counterparties />} />
				<Route path={`${AppRoutes.COUNTERPARTY}/:id`} element={<Counterparty />} />
				{/*  */}
				<Route path={AppRoutes.ACCOUNTS} element={<Accounts />} />
				{/*  */}
				<Route path={AppRoutes.ARTICLES} element={<Articles />} />
				{/*  */}
				<Route path={AppRoutes.CASES} element={<Cases />} />
				{/*  */}
				<Route path={AppRoutes.TRANSACTIONS} element={<Transactions />} />
				{/*  */}
				<Route path={AppRoutes.IMPORTS} element={<Imports />} />
			</Route>
		</Routes>
	)
}
