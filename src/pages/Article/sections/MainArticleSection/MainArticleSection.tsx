import classNames from 'classnames'
import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './mainArticle.module.scss'
import { SelectC } from '@/shared/ui/Select'
import { TextArea } from '@/shared/ui/TextArea'

export const MainArticleSection = () => {
	const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()

	return (
		<section className={styles.mainArticle}>
			<h3 className={styles.title}>Данные статьи</h3>

			<div className={styles.inner}>
				<Input id='name' label='Название статьи' hasResetIcon disabled={!isEditingModeActive} />

				<SelectC
					options={[]}
					values={[]}
					onChange={() => {}}
					label='Направление статьи'
					disabled={!isEditingModeActive}
				/>

				<TextArea
					label='Комментарий'
					disabled={!isEditingModeActive}
					className={styles.articleTextArea}
				/>

				<SelectC
					options={[]}
					values={[]}
					onChange={() => {}}
					label='Родительская статья'
					disabled={!isEditingModeActive}
				/>

				<SelectC
					options={[]}
					values={[]}
					onChange={() => {}}
					label='Тип расходов'
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
