import { Navigate, Route, Routes } from 'react-router'

import { RoutesConst } from '@/shared/router/routes-const'
import { Content } from '@/widgets/Content'

import { Operations } from '@/pages/Operations/Operations'
import { Organizations } from '@/pages/Organizations/Organizations'
import { Organization } from '@/pages/Organization/Organization'
import { Counterparties } from '@/pages/Counterparties/Counterparties'
import { Counterparty } from '@/pages/Counterparty/Counterparty'
import { Accounts } from '@/pages/Accounts/Accounts'
import { Account } from '@/pages/Account/Account'
import { Articles } from '@/pages/Articles/Articles'
import { Article } from '@/pages/Article/Article'
import { Cases } from '@/pages/Cases/Cases'
import { Case } from '@/pages/Case/Case'
import { Transactions } from '@/pages/Transactions/Transactions'
import { Transaction } from '@/pages/Transaction/Transaction'
import { Imports } from '@/pages/Imports/Imports'
import { Import } from '@/pages/Import/Import'
import { SummaryCashFlow } from '@/pages/SummaryCashFlow/SummaryCashFlow'
import { ArticlesAndOrganizations } from '@/pages/ArticlesAndOrganizations/ArticlesAndOrganizations'
import { CasesAndDeals } from '@/pages/CasesAndDeals/CasesAndDeals'

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
        <Route path={`${RoutesConst.ARTICLE}/:id`} element={<Article />} />
        {/*  */}
        <Route path={RoutesConst.CASES} element={<Cases />} />
        <Route path={`${RoutesConst.CASE}/:id`} element={<Case />} />
        {/*  */}
        <Route path={RoutesConst.TRANSACTIONS} element={<Transactions />} />
        <Route path={`${RoutesConst.TRANSACTION}/:id`} element={<Transaction />} />
        {/*  */}
        <Route path={RoutesConst.IMPORTS} element={<Imports />} />
        <Route path={`${RoutesConst.IMPORT}/:id`} element={<Import />} />

        <Route path={RoutesConst.SUMMARY} element={<SummaryCashFlow />}>
          <Route index element={<ArticlesAndOrganizations />} />
        </Route>
        <Route path={`${RoutesConst.SUMMARY}/casesAndDeals`} element={<CasesAndDeals />} />
      </Route>
    </Routes>
  )
}

