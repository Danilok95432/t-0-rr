import styles from './actions-menu.module.scss'

export const ActionsMenu = () => {
	return (
		<div className={styles['actions-menu']}>
			<ul className={styles['actions-menu__list']}>
				<li className={styles['actions-menu__item']}>
					<button
						type='button'
						id='add'
						className={styles['actions-menu__button-add']}
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							console.log(e.currentTarget.getAttribute('id'))
						}}
					/>
				</li>
				<li className={styles['actions-menu__item']}>
					<button type='button' className={styles['actions-menu__button-search']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<button type='button' className={styles['actions-menu__button-import']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<button type='button' className={styles['actions-menu__button-download']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<button type='button' className={styles['actions-menu__button-graph']} />
				</li>
			</ul>

			<ul className={styles['actions-menu__list']}>
				<li className={styles['actions-menu__item']}>
					<button type='button' className={styles['actions-menu__button-mail']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<button type='button' className={styles['actions-menu__button-faq']} />
				</li>
				<li className={styles['actions-menu__item']}>
					<button type='button' className={styles['actions-menu__button-settings']} />
				</li>
			</ul>
		</div>
	)
}
