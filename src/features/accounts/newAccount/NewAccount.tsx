import { FC } from 'react'
import { Controller } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'

import styles from './new-account.module.scss'
import { useNewAccountForm } from '../hooks/useNewAccountForm'
import classNames from 'classnames'
import { TSelectOption } from '@/shared/ui/Select/types'
import { IFormProps } from '@/shared/types/forms'
import { useGetNewListsQuery } from '../api/accountsApi'


export const NewAccount: FC<IFormProps> = () => {
  const { control, handleSubmit, onSubmit, errors, isValid, isSubmitting } = useNewAccountForm()
  const { data } = useGetNewListsQuery()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewAccount}>
      <div className={styles['main-info']}>
        <div className={styles.left}>
          <Controller
            name='account_name'
            control={control}
            render={({ field }) => (
              <Input
                id='account_name'
                label='Название счёта'
                value={field.value}
                hasResetIcon={false}
                onChange={field.onChange}
                error={errors.account_name?.message}
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
                  options={data?.orgs ?? []}
                  label='Организация'
                  onChange={(selected: TSelectOption[]) => {
                    field.onChange(selected[0] || null)
                  }}
                />
              )
            }}
          />

          <Controller
            name='comment'
            control={control}
            render={({ field }) => (
              <TextArea
                id='comment'
                label='Комментарий'
                value={field.value}
                onChange={(text) => field.onChange(text)}
              />
            )}
          />
        </div>

        <div className={styles.right}>
          <Controller
            name='account_types'
            control={control}
            render={({ field }) => {
              return (
                <SelectC
                  values={field.value ? field.value : []}
                  options={data?.account_types ?? []}
                  label='Тип счета'
                  onChange={(selected: TSelectOption[]) => {
                    field.onChange(selected[0] || null)
                  }}
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
                onChange={field.onChange}
                error={errors.bank_name?.message}
              />
            )}
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
                onChange={field.onChange}
                error={errors.rschet?.message}
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
                onChange={field.onChange}
                error={errors.bik?.message}
              />
            )}
          />
        </div>
      </div>

      <div
        className={classNames(styles.button_wrapper)}
      >
        <Button
          type='submit'
          mode='primary'
          label='Сохранить изменения'
          disabled={!isValid || isSubmitting}
        />
      </div>
    </form>
  )
}
