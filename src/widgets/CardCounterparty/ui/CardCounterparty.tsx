import { useState } from 'react'

import styles from './card-counterparty.module.scss'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'

export const CardCounterparty = () => {
	const [editing, setEditing] = useState(false)

	return (
		<li className={styles.cardCounterparty}>
			<div className={styles.cardCounterparty_header}>
				<h4 className={styles.cardCounterparty_title}>Счёт-1</h4>
				{!editing && (
					<Button
						mode='clear'
						icon={<Icon iconId='edit-card' />}
						className={styles.cardCounterparty_edit}
						onClick={() => setEditing(true)}
					/>
				)}

				{editing && (
					<Button
						mode='secondary'
						label='Сохранить изменения'
						className={styles.cardCounterparty_button}
						onClick={() => setEditing(false)}
					/>
				)}
			</div>

			<div className={styles.cardCounterparty_body}>
				<Input id='nameAccount' label='Название счёта' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='Банк' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='БИК' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='Расчетный счёт' disabled={!editing} hasResetIcon />
				<Input id='nameAccount' label='Тип счёта' disabled={!editing} hasResetIcon />
				<TextArea
					label='Комментарий'
					disabled={!editing}
					className={styles.cardCounterparty_textArea}
				/>
			</div>
		</li>
	)
}
