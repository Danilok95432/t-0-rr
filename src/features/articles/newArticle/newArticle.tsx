import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/features/modal/hooks/useModal'
import { IFormProps, TFormNewArticle } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'

import styles from './newArticle.module.scss'

export const NewArticle: FC<IFormProps> = () => {
	const { handleCloseModal } = useModal()

	const { control, handleSubmit, reset } = useForm<TFormNewArticle>({
		defaultValues: {
			name: '',
			direction: '',
			parent: '',
			type: '',
			comment: '',
		},
	})

	const onSubmit: SubmitHandler<TFormNewArticle> = (data) => {
		console.log(data)
		reset()
		handleCloseModal()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.newArticle}>
			<div className={styles['main-info']}>
				<div className={styles.left}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<Input
								id='name'
								label='Название статьи'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>

					<Controller
						name='parent'
						control={control}
						render={({ field }) => (
							<SelectC
								values={field.value ? [{ value: field.value, label: field.value }] : []}
								options={[]}
								label='Родительская статья'
								onChange={field.onChange}
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
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>
				</div>

				<div className={styles.right}>
					<Controller
						name='direction'
						control={control}
						render={({ field }) => (
							<SelectC
								values={field.value ? [{ value: field.value, label: field.value }] : []}
								options={[]}
								label='Направление статьи'
								onChange={field.onChange}
							/>
						)}
					/>

					<Controller
						name='type'
						control={control}
						render={({ field }) => (
							<SelectC
								values={field.value ? [{ value: field.value, label: field.value }] : []}
								options={[]}
								label='Тип расходов'
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
