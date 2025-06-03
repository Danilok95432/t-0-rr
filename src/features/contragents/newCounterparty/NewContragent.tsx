import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/features/modal/hooks/useModal'
import { IFormProps } from '@/shared/types/forms'
import { TFormContragent } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'

import styles from './new-contragent.module.scss'

export const NewContragent: FC<IFormProps> = () => {
  const { handleCloseModal } = useModal()

  const { control, handleSubmit, reset } = useForm<TFormContragent>({
    defaultValues: {
      name: '',
      inn: '',
      fullName: '',
      type: [],
    },
  })

  const onSubmit: SubmitHandler<TFormContragent> = (data) => {
    console.log(data)
    reset()
    handleCloseModal()
  }

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
              />
            )}
          />

          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <SelectC
                values={field.value ? [field.value] : []}
                options={[]}
                label='Тип контрагента'
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <Button type='submit' label='Сохранить' mode='primary' />
    </form>
  )
}
