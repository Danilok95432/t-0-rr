import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/hooks/useModal'
import { IFormProps } from '@/types/form'
import { TFormNewCounterparty } from '@/types/formNewCounterparty'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'
import { SelectC } from '@/components/Select'

import styles from './new-counterparty.module.scss'

export const NewCounterparty: FC<IFormProps> = () => {
	const { handleCloseModal } = useModal()
	const { control, handleSubmit, reset } = useForm<TFormNewCounterparty>({
		defaultValues: {
			name: '',
			inn: '',
			fullName: '',
			type: '',
		},
	})

	const onSubmit: SubmitHandler<TFormNewCounterparty> = (data) => {
		console.log(data)
		reset()
		handleCloseModal()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addNewCounterparty}>
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
								values={field.value ? [{ value: field.value }] : []}
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
