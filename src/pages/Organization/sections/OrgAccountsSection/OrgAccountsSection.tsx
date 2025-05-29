import { CardAccount } from '@/widgets/CardAccount'
import { Badge } from '@/shared/ui/Badge'

import styles from './orgAccounts.module.scss'

interface IOrgAccountsSectionProps {
  accounts: {
    id: string
    accountName: string
    bankName: string
    bik: string
    account: string
    type: string
    comment: string
  }[]
}

export const OrgAccountsSection = ({ accounts }: IOrgAccountsSectionProps) => {
  return (
    <section className={styles.orgAccounts}>
      <div className={styles.inner}>
        <h3 className={styles.title}>Счета организации</h3>
        <Badge mode='default' label={`${accounts?.length}`} className={styles.badge} />
      </div>

      <ul className={styles.list}>
        {accounts?.map((account) => (
          <CardAccount key={account.id} {...account} />
        ))}
      </ul>
    </section>
  )
}
