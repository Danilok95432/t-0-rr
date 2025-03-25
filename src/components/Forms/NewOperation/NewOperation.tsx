import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { Select } from '@/components/Select'
import { InputDate } from '@/components/InputDate'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

import styles from './new-operation.module.scss'
import { TextAria } from '@/components/TextAria'

type FormNewOperation = {
	organization: string
	name: string
	counterparty: string
	counterpartyAccount: string
	date: Date | null
	bankID: string
	sumOperation: string
	nameOperation: string
	comments: string
	case: string
	direction: string
	article: string
	payer: string
}

const addOperation = [
	{
		value: 'ТАУ',
		name: 'НПО ТАУ ООО',
	},
	{
		value: 'МЦАИ',
		name: 'МЦАИ ООО',
	},
]

export const NewOperation = () => {
	const { control, handleSubmit, reset } = useForm<FormNewOperation>({
		defaultValues: {
			organization: '',
			name: '',
			counterparty: '',
			counterpartyAccount: '',
			date: null,
			bankID: '',
			sumOperation: '',
			nameOperation: '',
			comments: '',
			case: '',
			direction: '',
			article: '',
			payer: '',
		},
	})

	const onSubmit: SubmitHandler<FormNewOperation> = (data) => {
		console.log(data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addNewOperation}>
			<div className={styles['main-info']}>
				<div className={styles['main-info-left']}>
					<Controller
						name='organization'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Организация'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>

					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Label'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>
				</div>
				<div className={styles['main-info-right']}>
					<Controller
						name='counterparty'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Контрагент'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>

					<Controller
						name='counterpartyAccount'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Счет контрагента'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>
				</div>
			</div>

			<div className={styles['extra-info']}>
				<div className={styles['extra-info-left']}>
					<div className={styles['extra-info-left-wrapper']}>
						<Controller
							name='date'
							control={control}
							render={({ field }) => (
								<InputDate date={field.value} onChange={(date) => field.onChange(date)} />
							)}
						/>
						<Controller
							name='bankID'
							control={control}
							render={({ field }) => (
								<Input
									id='bankID'
									label='Банковский ID (идентификатор)'
									value={field.value}
									onChange={(text) => field.onChange(text)}
									className={styles.idInput}
								/>
							)}
						/>
					</div>

					<Controller
						name='sumOperation'
						control={control}
						render={({ field }) => (
							<Input
								id='sumOperation'
								label='Сумма операции'
								value={field.value}
								onChange={(text) => field.onChange(text)}
								className={styles.sumInput}
							/>
						)}
					/>

					<Controller
						name='nameOperation'
						control={control}
						render={({ field }) => (
							<TextAria
								id='nameOperation'
								label='Наименование операции'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>
					<Controller
						name='comments'
						control={control}
						render={({ field }) => (
							<TextAria
								id='comments'
								label='Комментарий сотрудника'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>
				</div>

				<div className={styles['extra-info-right']}>
					<Controller
						name='case'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Кейс / сделка'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>
					<Controller
						name='direction'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Направление операции'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>
					<Controller
						name='article'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Статья / подстатья'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>
					<Controller
						name='payer'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
								label='Расходы на операцию несет'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>
				</div>
			</div>

			<Button type='submit' label='Создать операцию' mode='primary' />
		</form>
	)
}
