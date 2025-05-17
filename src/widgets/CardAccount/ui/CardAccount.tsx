import { useState } from 'react'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'

import styles from './card-account.module.scss'

interface ICardAccountProps {
  id: string
  account: string
  accountName: string
  bankName: string
  bik: string
  type: string
  comment: string
}

export const CardAccount = ({
  id,
  account,
  accountName,
  bankName,
  bik,
  type,
  comment,
}: ICardAccountProps) => {
  const [editing, setEditing] = useState(false)

  return (
    <li className={styles.cardAccount}>
      <div className={styles.cardAccount_header}>
        <h4 className={styles.cardAccount_title}>{account}</h4>

        {!editing && (
          <Button
            mode='clear'
            icon={<Icon iconId='edit-card' />}
            className={styles.cardAccount_edit}
            onClick={() => setEditing(true)}
          />
        )}

        {editing && (
          <Button
            mode='secondary'
            label='Сохранить изменения'
            className={styles.cardAccount_button}
            onClick={() => setEditing(false)}
          />
        )}
      </div>

      <form className={styles.cardAccount_body}>
        <Input id='nameAccount' label='Название счёта' disabled={!editing} hasResetIcon />
        <Input id='nameAccount' label='Банк' disabled={!editing} hasResetIcon />
        <Input id='nameAccount' label='БИК' disabled={!editing} hasResetIcon />
        <Input id='nameAccount' label='Расчетный счёт' disabled={!editing} hasResetIcon />
        <Input id='nameAccount' label='Тип счёта' disabled={!editing} hasResetIcon />
        <TextArea label='Комментарий' disabled={!editing} className={styles.cardAccount_textArea} />
      </form>
    </li>
  )
}
