import { CardAccount } from '@/widgets/CardAccount'
import { Badge } from '@/shared/ui/Badge'

import styles from './orgAccounts.module.scss'
import { AnimatePresence } from 'motion/react'
import { ConfirmWindow } from '@/features/import/confirm-window/confirm-window'
import { Modal } from '@/shared/ui/Modal'
import { useModal } from '@/features/modal/hooks/useModal'

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
  const { buttonId } = useModal()
  const handleDelete = () => {
    console.log('delete')
  }
  return (
    <>
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
      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {buttonId === 'delete' && (
          <Modal title='Удалить организацию'>
            <ConfirmWindow
              labelBadge='Вы собираетесь удалить организацию. Подтвердите действие'
              submitHandle={handleDelete}
              link={'/organizations'}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
