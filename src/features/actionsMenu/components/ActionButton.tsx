import { FC } from 'react'
import classNames from 'classnames'
import { useLocation } from 'react-router'

import { IActionButtonProps } from '../types'
import { Button } from '@/shared/ui/Button'

import styles from './action-button.module.scss'

const defaultActionTitles: Record<string, string> = {
	add: 'Добавить',
	editing: 'Редактировать',
	search: 'Открыть фильтр',
	import: 'Импорт',
	unload: 'Экспорт списка',
	graph: 'Статистика',
	mail: 'Написать в поддержку',
	faq: 'Обучение',
	settings: 'Настройки списка',
	delete: 'Удалить',
}

const actionTitlesByPath: Record<string, Record<string, string>> = {
	'/operations': {
		add: 'Добавить операцию',
		editing: 'Редактировать операцию',
		search: 'Открыть фильтр',
		import: 'Импорт операций',
		unload: 'Экспорт операций',
		graph: 'Статистика',
		mail: 'Написать в поддержку',
		faq: 'Обучение',
		settings: 'Настройки списка',
		delete: 'Удалить операцию',
	},
	'/organizations': {
		add: 'Добавить организацию',
		search: 'Открыть фильтр',
		import: 'Импорт организаций',
		graph: 'Статистика',
		mail: 'Написать в поддержку',
		faq: 'Обучение',
		settings: 'Настройки списка',
		delete: 'Удалить организацию',
	},
	'/organization': {
		add: 'Добавить организацию',
		editing: 'Редактировать организацию',
		delete: 'Удалить организацию',
	},
	'/contragents': {
		add: 'Добавить контрагента',
		editing: 'Редактировать организацию',
		delete: 'Удалить организацию',
	},
	'/contragent': {
		add: 'Добавить контрагента',
		editing: 'Редактировать контрагента',
	},
	'/accounts': {
		add: 'Добавить счет',
	},
	'/account': {
		add: 'Добавить счет',
		editing: 'Редактировать счет',
		delete: 'Удалить счет',
	},
	'/articles': {
		add: 'Добавить статью',
	},
	'/article': {
		add: 'Добавить статью',
		editing: 'Редактировать статью',
		delete: 'Удалить статью',
	},
	'/cases': {
		add: 'Добавить кейс',
	},
	'/case': {
		add: 'Добавить кейс',
		editing: 'Редактировать кейс',
		delete: 'Удалить кейс',
	},
	'/deals': {
		add: 'Добавить сделку',
		import: 'Импорт сделок',
		unload: 'Экспорт сделок',
	},
	'/deal': {
		add: 'Добавить сделку',
		editing: 'Редактировать сделку',
		delete: 'Удалить сделку',
	},
}
const getActionTitlesForPath = (pathname: string): Record<string, string> => {
	if (pathname.startsWith('/operations')) {
		return actionTitlesByPath['/operations']
	}

	if (pathname.startsWith('/organizations')) {
		return actionTitlesByPath['/organizations']
	}

	if (pathname.startsWith('/organization')) {
		return actionTitlesByPath['/organization']
	}

	if (pathname.startsWith('/contragents')) {
		return actionTitlesByPath['/contragents']
	}

	if (pathname.startsWith('/contragent')) {
		return actionTitlesByPath['/contragent']
	}

	if (pathname.startsWith('/accounts')) {
		return actionTitlesByPath['/accounts']
	}

	if (pathname.startsWith('/account')) {
		return actionTitlesByPath['/account']
	}

	if (pathname.startsWith('/articles')) {
		return actionTitlesByPath['/articles']
	}

	if (pathname.startsWith('/article')) {
		return actionTitlesByPath['/article']
	}

	if (pathname.startsWith('/cases')) {
		return actionTitlesByPath['/cases']
	}

	if (pathname.startsWith('/case')) {
		return actionTitlesByPath['/case']
	}

	if (pathname.startsWith('/deals')) {
		return actionTitlesByPath['/deals']
	}

	if (pathname.startsWith('/deal')) {
		return actionTitlesByPath['/deal']
	}

	return defaultActionTitles
}

export const ActionButton: FC<IActionButtonProps> = ({ action }) => {
	const { id, onClick, isActive } = action
	const location = useLocation()

	const currentActionTitles = getActionTitlesForPath(location.pathname)
	const tooltipTitle = currentActionTitles[id] ?? defaultActionTitles[id] ?? id

	return (
		<div className={styles.actionButtonWrapper}>
			<Button
				id={id}
				mode='clear'
				className={classNames(styles.actionButton, styles[id], {
					[styles.active]: isActive,
				})}
				onClick={onClick}
			/>
			<span className={styles.tooltip}>{tooltipTitle}</span>
		</div>
	)
}
