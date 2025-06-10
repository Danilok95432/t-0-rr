import { type FC } from 'react'
import { Controller } from 'react-hook-form'
import classNames from 'classnames'

import { useEditDealForm } from '../hooks/useEditDealForm'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'

import styles from './index.module.scss'
import { DealInfo } from '../table/config/dealsType'
import { InputDate } from '@/shared/ui/InputDate'
import { transformStringToDate } from '@/shared/helpers/helpers'

interface EditDealFormProps {
  id: string
  deal: DealInfo
}

export const EditDealForm: FC<EditDealFormProps> = ({ id, deal }) => {
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
  } = useEditDealForm(id, deal)

  return (
    <form className={styles.dealData} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Основные данные организации</h3>

      <div className={styles.inner}>
        <Controller
          name='deal_name'
          control={control}
          render={({ field }) => (
            <Input
              id='deal_name'
              label='Краткое название сделки'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.deal_name?.message}
            />
          )}
        />
        <Controller
          name='case.case_name'
          control={control}
          render={({ field }) => (
            <Input
              id='case'
              label='Кейс'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.case?.message}
            />
          )}
        />
        <Controller
          name='dogovor_name'
          control={control}
          render={({ field }) => (
            <Input
              id='dogovor_name'
              label='Договор'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.dogovor_name?.message}
            />
          )}
        />
        <Controller
          name='deal_name_full'
          control={control}
          render={({ field }) => (
            <TextArea
              id='deal_name_full'
              label='Полное название сделки'
              value={field.value}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.deal_name_full?.message}
              className={styles.dealData_textArea}
            />
          )}
        />
        <Controller
          name='org.org_name'
          control={control}
          render={({ field }) => (
            <Input
              id='org'
              label='Организация с нашей стороны'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.org?.message}
            />
          )}
        />
        <Controller
          name='deal_date'
          control={control}
          render={({ field }) => (
            <InputDate
              label='Дата заключения договора'
              date={transformStringToDate(field.value)}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              popperPlacement='bottom-start'
            />
          )}
        />
        <Controller
          name='contragent.contragent_name'
          control={control}
          render={({ field }) => (
            <Input
              id='contragent'
              label='Контрагент'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.contragent?.message}
            />
          )}
        />
        <Controller
          name='deal_plan_rashod'
          control={control}
          render={({ field }) => (
            <Input
              id='deal_plan_rashod'
              label='Плановый расход сделки в рублях'
              value={field.value}
              hasResetIcon={false}
              disabled={!isEditingModeActive}
              onChange={field.onChange}
              error={errors.deal_plan_rashod?.message}
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
  )
}
