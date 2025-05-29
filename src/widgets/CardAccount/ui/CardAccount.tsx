import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  account,
  accountName,
  bankName,
  bik,
  type,
  comment,
}: ICardAccountProps) => {
  const [editing, setEditing] = useState(false)
  const {
    control,
    // handleSubmit,
    // reset,
    // formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      accountName,
      bankName,
      bik,
      account,
      type,
      comment,
    },
  })

  return (
    <li className={styles.cardAccount}>
      <div className={styles.cardAccount_header}>
        <h4 className={styles.cardAccount_title}>{accountName}</h4>

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
        <Controller
          name='accountName'
          control={control}
          render={({ field }) => (
            <Input
              id='accountName'
              label='Название счёта'
              disabled={!editing}
              value={field.value}
              onChange={field.onChange}
              hasResetIcon={false}
            />
          )}
        />
        <Controller
          name='bankName'
          control={control}
          render={({ field }) => (
            <Input
              id='bankName'
              label='Банк'
              disabled={!editing}
              value={field.value}
              onChange={field.onChange}
              hasResetIcon={false}
            />
          )}
        />
        <Controller
          name='bik'
          control={control}
          render={({ field }) => (
            <Input
              id='bik'
              label='БИК'
              disabled={!editing}
              value={field.value}
              onChange={field.onChange}
              hasResetIcon={false}
            />
          )}
        />
        <Controller
          name='account'
          control={control}
          render={({ field }) => (
            <Input
              id='account'
              label='Расчетный счёт'
              disabled={!editing}
              hasResetIcon={false}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <Input
              id='type'
              label='Тип счёта'
              disabled={!editing}
              hasResetIcon={false}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name='comment'
          control={control}
          render={({ field }) => (
            <TextArea
              id='comment'
              label='Комментарий'
              disabled={!editing}
              className={styles.cardAccount_textArea}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </form>
    </li>
  )
}
