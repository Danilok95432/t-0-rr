import classNames from 'classnames'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'

import { Input } from '@/shared/ui/Input'
import { SelectC } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/Button'
import { TextArea } from '@/shared/ui/TextArea'

import styles from './main-data.module.scss'

export const MainDataAccount = () => {
	const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()

	return (
		<section className={styles.mainDataAccount}>
			<h3 className={styles.title}>Основные данные счета</h3>

			<div className={styles.inner}>
				<Input id='name' label='Название счёта' hasResetIcon disabled={!isEditingModeActive} />

				<SelectC
					values={[]}
					options={[]}
					label='Тип счета'
					onChange={() => {}}
					disabled={!isEditingModeActive}
				/>

				<Input
					id='paymentAccount'
					label='Расчетный счет'
					hasResetIcon
					disabled={!isEditingModeActive}
				/>

				<TextArea
					id='comment'
					label='Комментарий'
					disabled={!isEditingModeActive}
					className={styles.accountTextAria}
				/>

				<Input id='organization' label='Организация' hasResetIcon disabled={!isEditingModeActive} />

				<Input id='bank' label='Банк' hasResetIcon disabled={!isEditingModeActive} />

				<Input id='bik' label='БИК' hasResetIcon disabled={!isEditingModeActive} />
			</div>

			<div
				className={classNames(styles.button_wrapper, { [styles.isVisible]: isEditingModeActive })}
			>
				<Button mode='primary' label='Сохранить изменения' onClick={handleDeactivateEditingMode} />
				<Button mode='secondary' label='Отменить' onClick={handleDeactivateEditingMode} />
			</div>
		</section>
	)
}
