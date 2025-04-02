import classNames from 'classnames'
import { useEditingMode } from '@/hooks/useEditingMode'

import { Input } from '@/components/Input'
import { SelectC } from '@/components/Select'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'

import styles from './mainDataCounterparty.module.scss'

export const MainDataCounterparty = () => {
	const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()

	return (
		<section className={styles.mainDataCounterparty}>
			<h3 className={styles.title}>Основные данные контрагента</h3>
			<div className={styles.inner}>
				<Input
					id='name'
					label='Название контрагента'
					hasResetIcon
					disabled={!isEditingModeActive}
				/>

				<Input id='inn' label='ИНН' hasResetIcon disabled={!isEditingModeActive} />

				<SelectC
					values={[]}
					options={[]}
					label='Тип контрагента'
					onChange={() => {}}
					disabled={!isEditingModeActive}
				/>

				<TextArea
					id='fullName'
					label='Полное наименование контрагента'
					disabled={!isEditingModeActive}
				/>
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
