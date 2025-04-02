import { useState } from 'react'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import styles from './card-account.module.scss'

export const CardAccount = () => {
	const [editing, setEditing] = useState(false)

	return (
		<li className={styles.cardAccount}>
			<div className={styles.cardAccount_header}>
				<h4 className={styles.cardAccount_title}>Арх-Про 8680</h4>
				{!editing && (
					<Button
						mode='clear'
						icon={<Icon iconId='edit-card' />}
						className={styles.cardAccount_edit}
						onClick={() => setEditing(true)}
					/>
				)}

				{editing && (
					<Button
						mode='secondary'
						label='Сохранить изменения'
						className={styles.cardAccount_button}
						onClick={() => setEditing(false)}
					/>
				)}
			</div>

			<div className={styles.cardAccount_body}>
				<Input id='nameAccount' label='Название счёта' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='Банк' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='БИК' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='Расчетный счёт' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='Тип счёта' disabled={!editing} hasResetIcon />
				<TextArea label='Комментарий' disabled={!editing} className={styles.cardAccount_textArea} />
			</div>
		</li>
	)
}
