import { FC, useState } from 'react'

import styles from './card-counterparty.module.scss'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { useEditAccountForm } from '@/features/contragents/hooks/useEditAccountForm'
import { IContragentAccountsData } from '@/features/contragents/table/config/contragentsTypes'
import { Controller } from 'react-hook-form'

interface CardCounterpartyProps {
  id: string
  account: IContragentAccountsData
}

export const CardCounterparty: FC<CardCounterpartyProps> = ({ id, account }) => {
  const {
    isEditingModeActive,
    control,
    errors,
    handleSubmit,
    onSubmit,
  } = useEditAccountForm(id, account)
  const [editing, setEditing] = useState(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <li className={styles.cardCounterparty}>
        <div className={styles.cardCounterparty_header}>
          <h4 className={styles.cardCounterparty_title}>Счёт-1</h4>
          {!editing && (
            <Button
              mode='clear'
              icon={<Icon iconId='edit-card' />}
              className={styles.cardCounterparty_edit}
              onClick={() => setEditing(true)}
            />
          )}

          {editing && (
            <Button
              mode='secondary'
              label='Сохранить изменения'
              className={styles.cardCounterparty_button}
              onClick={() => setEditing(false)}
            />
          )}
        </div>

        <div className={styles.cardCounterparty_body}>
          <Controller
            name='account_name'
            control={control}
            render={({ field }) => (
              <Input
                id='account_name'
                label='Название счёта'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.account_name?.message}
              />
            )}
          />
          <Controller
            name='contragent_bank'
            control={control}
            render={({ field }) => (
              <Input
                id='contragent_bank'
                label='Банк'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.account_name?.message}
              />
            )}
          />
          <Controller
            name='contragent_bik'
            control={control}
            render={({ field }) => (
              <Input
                id='contragent_bik'
                label='БИК'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.account_name?.message}
              />
            )}
          />
          <Controller
            name='contragent_rschet'
            control={control}
            render={({ field }) => (
              <Input
                id='contragent_rschet'
                label='Расчетный счёт'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.account_name?.message}
              />
            )}
          />
          <Controller
            name='contragent_korschet'
            control={control}
            render={({ field }) => (
              <Input
                id='contragent_korschet'
                label='Корреспондентский счет'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.account_name?.message}
              />
            )}
          />
          <Controller
            name='account_type_name'
            control={control}
            render={({ field }) => (
              <Input
                id='account_type_name'
                label='Тип счёта'
                value={field.value ?? 'Не определен'}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.account_name?.message}
              />
            )}
          />
          <TextArea
            label='Комментарий'
            disabled={!editing}
            className={styles.cardCounterparty_textArea}
          />
        </div>
      </li>
    </form>
  )
}
