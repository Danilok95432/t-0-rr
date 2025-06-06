import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useModal } from '@/features/modal/hooks/useModal'
import { IFormProps } from '@/shared/types/forms'
import { TFormNewAccount } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'

import styles from './new-account.module.scss'

export const NewAccount: FC<IFormProps> = () => {
	const { handleCloseModal } = useModal()

	const { control, handleSubmit, reset } = useForm<TFormNewAccount>({
		defaultValues: {
			account_name: '',
			contragent_bank: '',
			contragent_bik: '',
			contragent_rschet: '',
			contragent_korschet: '',
			account_type_name: '',
			comment: '',
		},
	})

	const onSubmit: SubmitHandler<TFormNewAccount> = (data) => {
		console.log(data)
		reset()
		handleCloseModal()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addNewAccount}>
			<div className={styles['main-info']}>
				<div className={styles.left}>
					<Controller
						name='account_name'
						control={control}
						render={({ field }) => (
							<Input
								id='account_name'
								label='Название счёта'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>
					{/*
					<Controller
						name='organization'
						control={control}
						render={({ field }) => (
							<Input
								id='organization'
								label='Организация'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>
					*/}

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
						name='account_type_name'
						control={control}
						render={({ field }) => (
							<SelectC
								values={field.value ? [{ value: field.value, label: field.value }] : []}
								options={[]}
								label='Тип счёта'
								onChange={field.onChange}
							/>
						)}
					/>

					<Controller
						name='contragent_bank'
						control={control}
						render={({ field }) => (
							<Input
								id='contragent_bank'
								label='Банк'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>

					<Controller
						name='contragent_rschet'
						control={control}
						render={({ field }) => (
							<Input
								id='contragent_rschet'
								label='Расчетный счет'
								value={field.value}
								onChange={(text) => field.onChange(text)}
							/>
						)}
					/>

					<Controller
						name='contragent_bik'
						control={control}
						render={({ field }) => (
							<Input
								id='contragent_bik'
								label='БИК'
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
