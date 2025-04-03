import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/hooks/useModal'
import { IFormProps } from '@/shared/types/form'
import { TFormNewTransaction } from '@/shared/types/formNewTransaction'

import styles from './new-transaction.module.scss'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { InputDate } from '@/shared/ui/InputDate'

export const NewTransaction: FC<IFormProps> = () => {
	const { handleCloseModal } = useModal()

	const { control, handleSubmit, reset } = useForm<TFormNewTransaction>({
		defaultValues: {
			shortName: '',
			fullName: '',
			case: '',
			ourOrganization: '',
			counterparty: '',
			nameAgreement: '',
			dateAgreement: null,
			planTransaction: '',
		},
	})

	const onSubmit: SubmitHandler<TFormNewTransaction> = (data) => {
		console.log(data)
		reset()
		// handleCloseModal()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.newTransaction}>
			<div className={styles['main-info']}>
				<div className={styles.left}>
					<Controller
						name='shortName'
						control={control}
						render={({ field }) => (
							<Input
								id='shortName'
								label='Краткое название сделки'
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
								label='Полное название сделки'
								value={field.value}
								onChange={(text) => field.onChange(text)}
								className={styles.newTransactionTextArea}
							/>
						)}
					/>

					<Controller
						name='case'
						control={control}
						render={({ field }) => (
							<SelectC
								values={field.value ? [{ value: field.value }] : []}
								options={[]}
								label='Кейс'
								onChange={field.onChange}
							/>
						)}
					/>
				</div>

				<div className={styles.right}>
					<Controller
						name='ourOrganization'
						control={control}
						render={({ field }) => (
							<SelectC
								values={field.value ? [{ value: field.value }] : []}
								options={[]}
								label='Организация с нашей стороны'
								onChange={field.onChange}
							/>
						)}
					/>

					<Controller
						name='counterparty'
						control={control}
						render={({ field }) => (
							<SelectC
								values={field.value ? [{ value: field.value }] : []}
								options={[]}
								label='Контрагент'
								onChange={field.onChange}
							/>
						)}
					/>

					<Controller
						name='nameAgreement'
						control={control}
						render={({ field }) => (
							<Input
								id='nameAgreement'
								label='Название Договора'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>

					<Controller
						name='dateAgreement'
						control={control}
						render={({ field }) => (
							<InputDate
								date={field.value}
								label='Дата заключения Договора'
								onChange={(date) => field.onChange(date)}
								popperPlacement='left-start'
							/>
						)}
					/>

					<Controller
						name='planTransaction'
						control={control}
						render={({ field }) => (
							<Input
								id='planTransaction'
								label='Плановый расход сделки в рублях'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>
				</div>
			</div>

			<Button type='submit' label='Сохранить' mode='primary' />
		</form>
	)
}
