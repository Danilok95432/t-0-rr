import { Modal } from '@/components/Modal'
import styles from './actions-menu.module.scss'
import { useState } from 'react'

export const ActionsMenu = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<div className={styles['actions-menu']}>
			<ul className={styles['actions-menu__list']}>
				<li className={styles['actions-menu__item']}>
					<button
						type='button'
						id='add'
						className={styles['actions-menu__button-add']}
						onClick={openModal}
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

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h2>Динамическое содержимое</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam itaque quod dolorum
					perferendis aut ipsa, recusandae labore fugit! Molestiae commodi, explicabo minima totam
					saepe praesentium iusto excepturi sint doloribus in. Explicabo deserunt dolor cum ab, esse
					perspiciatis rem adipisci nostrum illum alias dignissimos cumque in assumenda maiores ad
					repellendus, pariatur soluta est architecto, itaque facilis.
				</p>
			</Modal>
		</div>
	)
}
