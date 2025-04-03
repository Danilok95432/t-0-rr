import { Navigate, Route, Routes } from 'react-router'

import { RoutesConst } from '@/shared/router/routes-const'

import { Operations } from '@/pages/Operations/Operations'
import { Organizations } from '@/pages/Organizations/Organizations'
import { Organization } from '@/pages/Organization/Organization'
import { Counterparties } from '@/pages/Counterparties/Counterparties'
import { Counterparty } from '@/pages/Counterparty/Counterparty'
import { Accounts } from '@/pages/Accounts/Accounts'
import { Account } from '@/pages/Account/Account'
import { Articles } from '@/pages/Articles/Articles'
import { Cases } from '@/pages/Cases/Cases'
import { Case } from '@/pages/Case/Case'
import { Transactions } from '@/pages/Transactions/Transactions'
import { Imports } from '@/pages/Imports/Imports'

import { Content } from '@/widgets/Content'

export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Content />}>
				<Route path='/' element={<Navigate to={RoutesConst.OPERATIONS} replace />} />
				<Route path={RoutesConst.OPERATIONS} element={<Operations />} />
				{/*  */}
				<Route path={RoutesConst.ORGANIZATIONS} element={<Organizations />} />
				<Route path={`${RoutesConst.ORGANIZATION}/:id`} element={<Organization />} />
				{/*  */}
				<Route path={RoutesConst.COUNTERPARTIES} element={<Counterparties />} />
				<Route path={`${RoutesConst.COUNTERPARTY}/:id`} element={<Counterparty />} />
				{/*  */}
				<Route path={RoutesConst.ACCOUNTS} element={<Accounts />} />
				<Route path={`${RoutesConst.ACCOUNT}/:id`} element={<Account />} />
				{/*  */}
				<Route path={RoutesConst.ARTICLES} element={<Articles />} />
				{/*  */}
				<Route path={RoutesConst.CASES} element={<Cases />} />
				<Route path={`${RoutesConst.CASE}/:id`} element={<Case />} />
				{/*  */}
				<Route path={RoutesConst.TRANSACTIONS} element={<Transactions />} />
				{/*  */}
				<Route path={RoutesConst.IMPORTS} element={<Imports />} />

				<Route path={RoutesConst.SUMMARY} element={<div>SUMMARY</div>} />
			</Route>
		</Routes>
	)
}
