import { Link } from 'react-router'
import { Fragment, ReactElement, useState } from 'react'
import classNames from 'classnames'

import { FilterArticlesAndOrganizations } from '@/features/summary/filterArticlesAndOrganizations'
import { FiltersMenu } from '@/shared/ui/FiltersMenu'
import { Icon } from '@/shared/ui/Icon'
import { Badge } from '@/shared/ui/Badge'

import styles from './articlesAndOrganizations.module.scss'

export interface ISumValue {
	status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
	value: string
}

export interface ITableRow {
	id: string
	name: string
	isGroup?: boolean
	hasUnderline?: boolean
	children?: ITableRow[]
	january: ISumValue
	february: ISumValue
	march: ISumValue
	total: ISumValue
}

const ArticlesAndOrganizationsContent = () => {
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

	const toggleRow = (id: string) => {
		setExpandedRows((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	const data: ITableRow[] = [
		{
			id: 'income',
			name: 'Поступления',
			isGroup: true,
			january: {
				status: 'positive',
				value: '500 000 000.00',
			},
			february: {
				status: 'positive',
				value: '500 000 000.00',
			},
			march: {
				status: 'positive',
				value: '500 000 000.00',
			},
			total: {
				status: 'positive',
				value: '500 000 000.00',
			},
			children: [
				{
					id: 'group1',
					name: 'Группа статей один - 1',
					isGroup: true,
					january: {
						status: 'negative',
						value: '100 000 000',
					},
					february: {
						status: 'negative',
						value: '100 000 000',
					},
					march: {
						status: 'negative',
						value: '100 000 000',
					},
					total: {
						status: 'negative',
						value: '100 000 000',
					},
					children: [
						{
							id: 'article1_1',
							name: 'Статья один-один',
							january: {
								status: 'neutral',
								value: '50 000 000',
							},
							february: {
								status: 'neutral',
								value: '50 000 000',
							},
							march: {
								status: 'neutral',
								value: '50 000 000',
							},
							total: {
								status: 'neutral',
								value: '50 000 000',
							},
						},
						{
							id: 'article1_2',
							name: 'Статья один-два',
							january: {
								status: 'neutral',
								value: '50 000 000',
							},
							february: {
								status: 'neutral',
								value: '50 000 000',
							},
							march: {
								status: 'neutral',
								value: '50 000 000',
							},
							total: {
								status: 'neutral',
								value: '50 000 000',
							},
						},
					],
				},
				{
					id: 'group2',
					name: 'Группа статей один - 2',
					isGroup: true,
					january: {
						status: 'negative',
						value: '100 000 000',
					},
					february: {
						status: 'negative',
						value: '100 000 000',
					},
					march: {
						status: 'negative',
						value: '100 000 000',
					},
					total: {
						status: 'negative',
						value: '100 000 000',
					},
					children: [
						{
							id: 'article2_1',
							name: 'Статья два-один',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
						{
							id: 'article2_2',
							name: 'Статья два-два',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
					],
				},
			],
		},
		{
			id: 'notSpecified',
			name: 'Статья не указана',
			hasUnderline: true,
			january: {
				status: 'neutral',
				value: '0.00',
			},
			february: {
				status: 'neutral',
				value: '0.00',
			},
			march: {
				status: 'neutral',
				value: '0.00',
			},
			total: {
				status: 'neutral',
				value: '0.00',
			},
		},
		{
			id: 'payments',
			name: 'Выплаты',
			isGroup: true,
			january: {
				status: 'positive',
				value: '500 000 000.00',
			},
			february: {
				status: 'positive',
				value: '500 000 000.00',
			},
			march: {
				status: 'positive',
				value: '500 000 000.00',
			},
			total: {
				status: 'positive',
				value: '500 000 000.00',
			},
			children: [
				{
					id: 'group1',
					name: 'Группа статей один - 1',
					isGroup: true,
					january: {
						status: 'negative',
						value: '100 000 000',
					},
					february: {
						status: 'negative',
						value: '100 000 000',
					},
					march: {
						status: 'negative',
						value: '100 000 000',
					},
					total: {
						status: 'negative',
						value: '100 000 000',
					},
					children: [
						{
							id: 'article3_1',
							name: 'Статья один-один',
							january: {
								status: 'neutral',
								value: '50 000 000',
							},
							february: {
								status: 'neutral',
								value: '50 000 000',
							},
							march: {
								status: 'neutral',
								value: '50 000 000',
							},
							total: {
								status: 'neutral',
								value: '50 000 000',
							},
						},
						{
							id: 'article3_2',
							name: 'Статья один-два',
							january: {
								status: 'neutral',
								value: '50 000 000',
							},
							february: {
								status: 'neutral',
								value: '50 000 000',
							},
							march: {
								status: 'neutral',
								value: '50 000 000',
							},
							total: {
								status: 'neutral',
								value: '50 000 000',
							},
						},
					],
				},
				{
					id: 'group2',
					name: 'Группа статей один - 2',
					isGroup: true,
					january: {
						status: 'negative',
						value: '100 000 000',
					},
					february: {
						status: 'negative',
						value: '100 000 000',
					},
					march: {
						status: 'negative',
						value: '100 000 000',
					},
					total: {
						status: 'negative',
						value: '100 000 000',
					},
					children: [
						{
							id: 'article4_1',
							name: 'Статья два-один',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
						{
							id: 'article4_2',
							name: 'Статья два-два',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
					],
				},
			],
		},
		{
			id: 'notSpecified1',
			name: 'Статья не указана',
			hasUnderline: true,
			january: {
				status: 'neutral',
				value: '0.00',
			},
			february: {
				status: 'neutral',
				value: '0.00',
			},
			march: {
				status: 'neutral',
				value: '0.00',
			},
			total: {
				status: 'neutral',
				value: '0.00',
			},
		},
		{
			id: 'totalCashFlow',
			name: 'Общий денежный поток',
			hasUnderline: true,
			isGroup: false,
			january: {
				status: 'positive',
				value: '500 000 000.00',
			},
			february: {
				status: 'positive',
				value: '500 000 000.00',
			},
			march: {
				status: 'positive',
				value: '500 000 000.00',
			},
			total: {
				status: 'positive',
				value: '500 000 000.00',
			},
		},
		{
			id: 'balancesAndPeriod',
			name: 'Остатки на конец периода',
			isGroup: false,
			january: {
				status: 'positive',
				value: '500 000 000.00',
			},
			february: {
				status: 'positive',
				value: '500 000 000.00',
			},
			march: {
				status: 'positive',
				value: '500 000 000.00',
			},
			total: {
				status: 'positive',
				value: '500 000 000.00',
			},
			children: [
				{
					id: 'org1',
					name: 'ООО МЦАИ',
					isGroup: true,
					january: {
						status: 'negative',
						value: '100 000 000',
					},
					february: {
						status: 'negative',
						value: '100 000 000',
					},
					march: {
						status: 'negative',
						value: '100 000 000',
					},
					total: {
						status: 'negative',
						value: '100 000 000',
					},
					children: [
						{
							id: 'article5_1',
							name: 'Счет один-один',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
						{
							id: 'article5_2',
							name: 'Счет один-два',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
					],
				},
				{
					id: 'org2',
					name: 'ООО МЦАИ',
					isGroup: true,
					january: {
						status: 'negative',
						value: '100 000 000',
					},
					february: {
						status: 'negative',
						value: '100 000 000',
					},
					march: {
						status: 'negative',
						value: '100 000 000',
					},
					total: {
						status: 'negative',
						value: '100 000 000',
					},
					children: [
						{
							id: 'article6_1',
							name: 'Счет один-один',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
						{
							id: 'article6_2',
							name: 'Счет один-два',
							january: {
								status: 'positive',
								value: '50 000 000',
							},
							february: {
								status: 'positive',
								value: '50 000 000',
							},
							march: {
								status: 'positive',
								value: '50 000 000',
							},
							total: {
								status: 'positive',
								value: '50 000 000',
							},
							children: [],
						},
					],
				},
			],
		},
	]

	const renderRow = (row: ITableRow, level = 0): ReactElement => {
		const hasChildren = !!row.children?.length
		const isExpanded = expandedRows[row.id]

		return (
			<Fragment key={row.id}>
				<tr
					onClick={() => hasChildren && toggleRow(row.id)}
					className={classNames(row.hasUnderline && styles.underlinedRow, {
						[styles.total]: row.id === 'totalCashFlow',
					})}
				>
					<td
						style={{ paddingLeft: `${level * 20}px` }}
						className={
							hasChildren ||
							row.id === 'notSpecified' ||
							row.id === 'notSpecified1' ||
							row.id === 'totalCashFlow' ||
							row.id === 'balancesAndPeriod'
								? styles.rowTitle
								: ''
						}
					>
						{row.name}

						{isExpanded && <Icon iconId='arrow-down' className={styles.icon} />}
						{hasChildren && !isExpanded && <Icon iconId='arrow-right' className={styles.icon} />}
					</td>

					<td className={styles.value}>
						{<Badge label={row.january.value} mode={row.january.status ?? 'neutral'} />}
					</td>
					<td className={styles.value}>
						{<Badge label={row.february.value} mode={row.february.status ?? 'neutral'} />}
					</td>
					<td className={styles.value}>
						{<Badge label={row.march.value} mode={row.march.status ?? 'neutral'} />}
					</td>
					<td className={styles.value}>
						{<Badge label={row.total.value} mode={row.total.status ?? 'neutral'} />}
					</td>
				</tr>

				{isExpanded && hasChildren && row.children?.map((child) => renderRow(child, level + 1))}
			</Fragment>
		)
	}

	return (
		<section className={styles.articlesAndOrganizations}>
			<FiltersMenu>
				<FilterArticlesAndOrganizations />
			</FiltersMenu>

			<div className={styles.header}>
				<div className={styles.titleWrapper}>
					<span className={styles.subtitle}>Движение денежных средств</span>
					<h2 className={styles.title}>Статьи и организации</h2>
				</div>

				<Link to={'/summary/casesAndDeals'} className={styles.link}>
					Перейти к сводке по кейсам и сделкам
				</Link>
			</div>

			<div className={styles.tableWrapper}>
				<table>
					<thead>
						<tr>
							<th>Статьи и их группы</th>
							<th>январь 2025</th>
							<th>февраль 2025</th>
							<th>март 2025</th>
							<th>Итого</th>
						</tr>
					</thead>

					<tbody>{data.map((row) => renderRow(row))}</tbody>
				</table>
			</div>
		</section>
	)
}

export default ArticlesAndOrganizationsContent
