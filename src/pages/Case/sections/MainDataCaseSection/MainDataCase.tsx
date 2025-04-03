import classNames from 'classnames'
import { useEditingMode } from '@/hooks/useEditingMode'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './mainDataCase.module.scss'

export const MainDataCase = () => {
	const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()

	return (
		<section className={styles.mainDataCase}>
			<h3 className={styles.title}>Данные кейса</h3>

			<div className={styles.inner}>
				<Input id='name' label='Название кейса' hasResetIcon disabled={!isEditingModeActive} />
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
