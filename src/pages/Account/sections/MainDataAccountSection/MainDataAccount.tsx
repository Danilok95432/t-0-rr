import classNames from 'classnames'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { TextArea } from '@/shared/ui/TextArea'

import styles from './main-data.module.scss'
import { useEditAccountForm } from '@/features/accounts/hooks/useEditAccountForm'
import { Controller } from 'react-hook-form'
import { FC } from 'react'
import { SelectC } from '@/shared/ui/Select'
import { IAccountInfo } from '@/features/accounts/table/config/accountsTypes'
import { TSelectOption } from '@/shared/ui/Select/types'

interface MainDataAccountProps {
  id: string
  account: IAccountInfo
}

export const MainDataAccount: FC<MainDataAccountProps> = ({ id, account }) => {
  const {
    isEditingModeActive,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleCancel,
    isSubmitting,
    isValid,
    handleDeactivateEditingMode,
  } = useEditAccountForm(id, account)

  return (
    <section className={styles.mainDataAccount}>
      <h3 className={styles.title}>Основные данные счета</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inner}>
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
            name='account_types'
            control={control}
            render={({ field }) => {
              return (
                <SelectC
                  values={field.value ? field.value : []}
                  options={account.account_types}
                  label='Тип счета'
                  onChange={(selected: TSelectOption[]) => {
                    field.onChange(selected[0] || null)
                  }}
                  disabled={!isEditingModeActive}
                />
              )
            }}
          />
          <Controller
            name='rschet'
            control={control}
            render={({ field }) => (
              <Input
                id='rschet'
                label='Расчетный счет'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.rschet?.message}
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
                disabled={!isEditingModeActive}
                className={styles.accountTextArea}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name='orgs'
            control={control}
            render={({ field }) => {
              return (
                <SelectC
                  values={field.value ? field.value : []}
                  options={account.orgs}
                  label='Организация'
                  onChange={(selected: TSelectOption[]) => {
                    field.onChange(selected[0] || null)
                  }}
                  disabled={!isEditingModeActive}
                />
              )
            }}
          />
          <Controller
            name='bank_name'
            control={control}
            render={({ field }) => (
              <Input
                id='bank_name'
                label='Банк'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.bank_name?.message}
              />
            )}
          />
          <Controller
            name='bik'
            control={control}
            render={({ field }) => (
              <Input
                id='bik'
                label='Бик'
                value={field.value}
                hasResetIcon={false}
                disabled={!isEditingModeActive}
                onChange={field.onChange}
                error={errors.bik?.message}
              />
            )}
          />
        </div>
        <div
          className={classNames(styles.button_wrapper, { [styles.isVisible]: isEditingModeActive })}
        >
          <Button
            type='submit'
            mode='primary'
            label='Сохранить изменения'
            onClick={handleDeactivateEditingMode}
            disabled={!isValid || isSubmitting}
          />
          <Button mode='secondary' label='Отменить' onClick={handleCancel} />
        </div>
      </form>
    </section>
  )
}
