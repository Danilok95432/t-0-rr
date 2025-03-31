import { FC, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import classNames from 'classnames'
import { TFormProcessingOperation } from '@/types/formProcessingOperation'
import { IFormProps } from '@/types/form'

import { useModal } from '@/hooks/useModal'
import { Select } from '@/components/Select'
import { Input } from '@/components/Input'
import { InputDate } from '@/components/InputDate'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import { TableProcessingOperation } from './tableProcessing/tableProcessingOperation'

import { addOperation } from '@/mock/addOperation'

import styles from './processing-operation.module.scss'

export const ProcessingOperation: FC<IFormProps> = () => {
	const { handleCloseModal } = useModal()
	const { control, handleSubmit } = useForm<TFormProcessingOperation>()

	const onSubmit: SubmitHandler<TFormProcessingOperation> = (data) => {
		console.log(data)
		handleCloseModal()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addNewOperation}>
			<div className={styles['main-info']}>
				<div className={classNames(styles.left, styles.hasArrow)}>
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
						name='organizationAccount'
						control={control}
						render={({ field }) => (
							<Select
								options={addOperation}
								value={field.value}
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
							<Select
								options={addOperation}
								value={field.value}
								label='Контрагент'
								onChange={field.onChange}
								className={styles.addOperation__select}
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
						name='comments'
						control={control}
						render={({ field }) => (
							<TextArea
								id='comments'
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

			<Button type='submit' label='Сохранить' mode='primary' />

			<h3 className={styles.subTitle}>Деление операции</h3>

			<div className={styles.sum_block}>
				<Controller
					name='initialAmount'
					control={control}
					render={({ field }) => (
						<Input
							id='initialAmount'
							label='Первоначальная сумма'
							value={field.value}
							onChange={(text) => field.onChange(text)}
							className={styles.idInput}
							maxLength={25}
						/>
					)}
				/>
				<Controller
					name='retainedAmount'
					control={control}
					render={({ field }) => (
						<Input
							id='retainedAmount'
							label='Нераспределенная сумма'
							value={field.value}
							onChange={(text) => field.onChange(text)}
							className={styles.idInput}
							maxLength={25}
						/>
					)}
				/>
			</div>

			<TableProcessingOperation />

			<div className={styles.select_block}>
				<Controller
					name='counterpartyDivision'
					control={control}
					render={({ field }) => (
						<Select
							options={[]}
							value={field.value}
							label='Контрагент'
							onChange={field.onChange}
							className={styles.addOperation__select}
						/>
					)}
				/>

				<Controller
					name='caseDivision'
					control={control}
					render={({ field }) => (
						<Select
							options={[]}
							value={field.value}
							label='Кейс / сделка'
							onChange={field.onChange}
							className={styles['main-info-select']}
						/>
					)}
				/>

				<Controller
					name='sumOperationDivision'
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
					name='counterpartyAccountDivision'
					control={control}
					render={({ field }) => (
						<Select
							options={[]}
							value={field.value}
							label='Счет контрагента'
							onChange={field.onChange}
							className={styles.addOperation__select}
						/>
					)}
				/>

				<Controller
					name='articleDivision'
					control={control}
					render={({ field }) => (
						<Select
							options={[]}
							value={field.value}
							label='Статья / подстатья'
							onChange={field.onChange}
							className={styles['main-info-select']}
						/>
					)}
				/>
			</div>

			<Button label='Закрыть форму деления' mode='secondary' className={styles.division_btn} />
		</form>
	)
}
