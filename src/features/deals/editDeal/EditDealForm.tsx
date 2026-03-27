import { useState, type FC } from 'react'
import { Controller } from 'react-hook-form'
import classNames from 'classnames'

import { useEditDealForm } from '../hooks/useEditDealForm'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'

import styles from './index.module.scss'
import { DealInfo } from '../table/config/dealsType'
import { InputDate } from '@/shared/ui/InputDate'
import { useDeleteDealMutation, useGetDealInfoQuery } from '../api/dealsApi'
import { SelectC } from '@/shared/ui/Select'
import { AnimatePresence } from 'motion/react'
import { Modal } from '@/shared/ui/Modal'
import { ConfirmWindow } from '@/features/import/confirm-window/confirm-window'

interface EditDealFormProps {
  id: string
  deal: DealInfo
}

export const EditDealForm: FC<EditDealFormProps> = ({ id, deal }) => {
  const [isDelete, setIsDelete] = useState<boolean>(false)
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

  const { data: dealsLists } = useGetDealInfoQuery(id ?? '')
  const [deleteDeal] = useDeleteDealMutation()

  // Убираем useEffect с reset, который всё портит!
  // Вместо этого используем данные напрямую из deal

  const handleDelete = async () => {
    await deleteDeal(id)
  }

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
          name='cases_list'
          control={control}
          render={({ field }) => (
            <SelectC
              values={field.value ?? []}
              options={dealsLists?.cases_list ?? []}
              label='Кейс'
              disabled={!isEditingModeActive}
              onChange={field.onChange}
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
          name='orgs_list'
          control={control}
          render={({ field }) => (
            <SelectC
              values={field.value ?? []}
              options={dealsLists?.orgs_list ?? []}
              label='Организация с нашей стороны'
              disabled={!isEditingModeActive}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name='deal_date'
          control={control}
          render={({ field }) => (
            <InputDate
              date={field.value}
              label='Дата сделки'
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        <Controller
          name='contragents_list'
          control={control}
          render={({ field }) => (
            <SelectC
              values={field.value ?? []}
              options={dealsLists?.contragents_list ?? []}
              label='Контрагент'
              disabled={!isEditingModeActive}
              onChange={field.onChange}
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
        <Button mode='warning_delete' label='Удалить сделку' onClick={() => setIsDelete(true)} />
        <Button mode='secondary' label='Отменить' onClick={handleCancel} />
      </div>
      <AnimatePresence initial={false} onExitComplete={() => null} mode='wait'>
        {isDelete && (
          <Modal title='Удалить сделку'>
            <ConfirmWindow
              labelBadge='Это действие удалит сделку без возможности восстановления. Вы уверены, что хотите продолжить?'
              submitHandle={handleDelete}
              link={'/deals'}
            />
          </Modal>
        )}
      </AnimatePresence>
    </form>
  )
}
