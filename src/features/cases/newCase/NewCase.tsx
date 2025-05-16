import { type FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAddNewCaseMutation } from '../api/casesApi'
import { useModal } from '@/features/modal/hooks/useModal'
import { type IFormProps, type TFormNewCase } from '@/shared/types/forms'

import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

import styles from './new-case.module.scss'

export const NewCase: FC<IFormProps> = () => {
  const { handleCloseModal } = useModal()
  const [addNewCase] = useAddNewCaseMutation()

  const { control, handleSubmit, reset } = useForm<TFormNewCase>({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit: SubmitHandler<TFormNewCase> = async (data) => {
    const formData = new FormData()
    formData.append('title', data.name)

    try {
      const response = await addNewCase(formData).unwrap()
      console.log(response)
      reset()
      handleCloseModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewCase}>
      <div className={styles['main-info']}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input id='name' label='Название кейса' value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <Button type='submit' label='Сохранить' mode='primary' />
    </form>
  )
}
