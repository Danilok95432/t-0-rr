import { Navigate, Route, Routes } from 'react-router'

import { RoutesConst } from '@/shared/router/routes-const'
import { ProtectedRoute } from '@/shared/router/ProtectedRoute'
import { Content } from '@/widgets/Content'

import { Auth } from '@/pages/Auth/Auth'
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
import { Deals } from '@/pages/Deals/Deals'
import { Deal } from '@/pages/Deal/Deal'
import { Imports } from '@/pages/Imports/Imports'
import { Import } from '@/pages/Import/Import'
import { SummaryCashFlow } from '@/pages/SummaryCashFlow/SummaryCashFlow'
import { ArticlesAndOrganizations } from '@/pages/ArticlesAndOrganizations/ArticlesAndOrganizations'
import { CasesAndDeals } from '@/pages/CasesAndDeals/CasesAndDeals'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/auth' element={<Auth />} />

      <Route element={<ProtectedRoute />}>
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
          <Route path={RoutesConst.DEALS} element={<Deals />} />
          <Route path={`${RoutesConst.DEAL}/:id`} element={<Deal />} />
          {/*  */}
          <Route path={RoutesConst.IMPORTS} element={<Imports />} />
          <Route path={`${RoutesConst.IMPORT}/:id`} element={<Import />} />

          <Route path={RoutesConst.SUMMARY} element={<SummaryCashFlow />}>
            <Route index element={<ArticlesAndOrganizations />} />
          </Route>
          <Route path={`${RoutesConst.SUMMARY}/casesAndDeals`} element={<CasesAndDeals />} />
        </Route>
      </Route>
    </Routes>
  )
}

