import { CardCounterparty } from '@/widgets/CardCounterparty'
import { Badge } from '@/shared/ui/Badge'

import styles from './accountsContragent.module.scss'
import { IContragentAccountsData } from '@/features/contragents/table/config/contragentsTypes'
import { FC } from 'react'

type AccountsContragentProps = {
  accounts: IContragentAccountsData[]
}

export const AccountsContragent:FC<AccountsContragentProps> = ({ accounts }) => {
  const invoiceCounter = accounts.length.toString()

  return (
    <section className={styles.accountsContragent}>
      <div className={styles.inner}>
        <h3 className={styles.title}>Счета контрагента</h3>
        <Badge mode='default' label={invoiceCounter} className={styles.badge} />
      </div>

      <ul className={styles.list}>
        {
          accounts.map((account) => {
            return(
              <CardCounterparty key={account.id} id={account.id} account={account} />
            )
          })
        }
      </ul>
    </section>
  )
}
