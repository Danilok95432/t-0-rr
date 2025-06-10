import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { IFormProps } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'

import styles from './new-contragent.module.scss'
import { useAddContragentForm } from '../hooks/useAddContragentForm'

export const NewContragent: FC<IFormProps> = () => {
  const { control, handleSubmit, onSubmit, errors, isValid, isSubmitting } = useAddContragentForm()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewContragent}>
      <div className={styles['main-info']}>
        <div className={styles.left}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input
                id='name'
                label='Краткое название контрагента'
                value={field.value}
                onChange={(text) => field.onChange(text)}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <TextArea
                id='fullName'
                label='Полное наименование организации'
                value={field.value}
                onChange={(text) => field.onChange(text)}
                error={errors.fullName?.message}
              />
            )}
          />
        </div>

        <div className={styles.right}>
          <Controller
            name='inn'
            control={control}
            render={({ field }) => (
              <Input
                id='inn'
                label='ИНН'
                value={field.value}
                onChange={(text) => field.onChange(text)}
                error={errors.inn?.message}
              />
            )}
          />

          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ? field.value : []}
                options={[{label: "Тип контрагента не выбран", value: "0"}, {label: 'Физлицо', value: '1'}, {label: 'Юрлицо', value: '2'}]}
                label='Тип контрагента'
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <Button type='submit' label='Сохранить' mode='primary' disabled={!isValid || isSubmitting} />
    </form>
  )
}
