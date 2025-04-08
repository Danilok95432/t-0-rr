import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/features/modal/hooks/useModal'
import { IFormProps } from '@/shared/types/forms'
import { TFormNewOrganization } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'

import styles from './new-organization.module.scss'

export const NewOrganization: FC<IFormProps> = () => {
	const { handleCloseModal } = useModal()
	const { control, handleSubmit, reset } = useForm<TFormNewOrganization>({
		defaultValues: {
			name: '',
			inn: '',
			fullName: '',
			ogrn: '',
			legalAddress: '',
			employeesComment: '',
		},
	})
	const onSubmit: SubmitHandler<TFormNewOrganization> = (data) => {
		console.log(data)
		reset()
		handleCloseModal()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addNewOrganization}>
			<div className={styles['main-info']}>
				<div className={styles.left}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<Input
								id='name'
								label='Название организации'
								value={field.value}
								onChange={field.onChange}
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
								onChange={field.onChange}
							/>
						)}
					/>

					<Controller
						name='legalAddress'
						control={control}
						render={({ field }) => (
							<TextArea
								id='legalAddress'
								label='Юридический адрес организации'
								value={field.value}
								onChange={field.onChange}
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
								onChange={field.onChange}
								maxLength={20}
							/>
						)}
					/>

					<Controller
						name='ogrn'
						control={control}
						render={({ field }) => (
							<Input
								id='ogrn'
								label='ОРГН / ОГРНИП'
								value={field.value}
								onChange={field.onChange}
								maxLength={20}
							/>
						)}
					/>

					<Controller
						name='employeesComment'
						control={control}
						render={({ field }) => (
							<TextArea
								id='employeesComment'
								label='Комментарий сотрудника'
								value={field.value}
								onChange={field.onChange}
								className={styles.employee_textAria}
							/>
						)}
					/>
				</div>
			</div>

			<Button type='submit' label='Сохранить' mode='primary' />
		</form>
	)
}
