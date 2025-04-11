import { FC } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import classNames from 'classnames'
import { TFormNewOperation } from '@/shared/types/forms'
import { IFormProps } from '@/shared/types/forms'

import { useModal } from '@/features/modal/hooks/useModal'

import { SelectC } from '@/shared/ui/Select'
import { Input } from '@/shared/ui/Input'
import { InputDate } from '@/shared/ui/InputDate'
import { TextArea } from '@/shared/ui/TextArea'
import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'

import { addOperation } from '@/mock/addOperation'

import styles from './new-operation.module.scss'

export const NewOperation: FC<IFormProps> = ({ labelBadge }) => {
	const { handleCloseModal } = useModal()
	const { control, handleSubmit, reset } = useForm<TFormNewOperation>({
		defaultValues: {
			organization: '',
			organizationAccount: '',
			counterparty: '',
			counterpartyAccount: '',
			date: null,
			bankID: '',
			sumOperation: '',
			nameOperation: '',
			employeesComment: '',
			case: '',
			direction: '',
			article: '',
			payer: '',
		},
	})

	const onSubmit: SubmitHandler<TFormNewOperation> = (data) => {
		console.log(data)
		handleCloseModal()
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addNewOperation}>
			{labelBadge && <Badge label={labelBadge} />}

			<div className={styles['main-info']}>
				<div className={classNames(styles.left, styles.hasArrow)}>
					<Controller
						name='organization'
						control={control}
						render={({ field }) => (
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
								label='Организация'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>

					<Controller
						name='organizationAccount'
						control={control}
						render={({ field }) => (
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
								label='Счет организации'
								onChange={field.onChange}
								className={styles['main-info-select']}
							/>
						)}
					/>
				</div>

				<div className={styles.right}>
					<Controller
						name='counterparty'
						control={control}
						render={({ field }) => (
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
								label='Контрагент'
								onChange={field.onChange}
								className={styles.addOperation__select}
								searchable={true}
							/>
						)}
					/>

					<Controller
						name='counterpartyAccount'
						control={control}
						render={({ field }) => (
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
								label='Счет контрагента'
								onChange={field.onChange}
								className={styles.addOperation__select}
							/>
						)}
					/>
				</div>
			</div>

			<div className={styles['extra-info']}>
				<div className={styles.left}>
					<div className={styles.wrapper}>
						<Controller
							name='date'
							control={control}
							render={({ field }) => (
								<InputDate
									date={field.value}
									label='Дата операции'
									onChange={(date) => field.onChange(date)}
									popperPlacement='bottom-start'
								/>
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
									maxLength={25}
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
								extraLabel='RUB — Рубли РФ'
								value={field.value}
								onChange={(text) => field.onChange(text)}
								className={styles.sumInput}
								hasResetIcon={false}
								maxLength={35}
							/>
						)}
					/>

					<Controller
						name='nameOperation'
						control={control}
						render={({ field }) => (
							<TextArea
								id='nameOperation'
								label='Наименование операции'
								value={field.value}
								onChange={(text) => field.onChange(text)}
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
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>
				</div>

				<div className={styles.right}>
					<Controller
						name='case'
						control={control}
						render={({ field }) => (
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
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
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
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
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
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
							<SelectC
								options={addOperation}
								values={field.value ? [{ value: field.value }] : []}
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
