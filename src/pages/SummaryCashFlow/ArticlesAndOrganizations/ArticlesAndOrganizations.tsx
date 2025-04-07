import { Link } from 'react-router'
import { Fragment, ReactElement, useState } from 'react'

interface TableRow {
	id: string
	name: string
	isGroup?: boolean
	children?: TableRow[]
	january: {
		status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
		value: string
	}
	february: {
		status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
		value: string
	}
	march: {
		status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
		value: string
	}
	total: {
		status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
		value: string
	}
}

import { Icon } from '@/shared/ui/Icon'
import { Badge } from '@/shared/ui/Badge'
import styles from './articlesAndOrganizations.module.scss'

export const ArticlesAndOrganizations = () => {
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

	const toggleRow = (id: string) => {
		setExpandedRows((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	const data: TableRow[] = [
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
				{
					id: 'notSpecified',
					name: 'Статья не указана',
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
			],
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
				{
					id: 'notSpecified',
					name: 'Статья не указана',
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
			],
		},
		{
			id: 'totalCashFlow',
			name: 'Общий денежный поток',
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
							id: 'article2_1',
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
							id: 'article2_2',
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
							id: 'org2',
							name: 'ООО НПО ТАУ',
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

	const renderRow = (row: TableRow, level = 0): ReactElement => {
		const hasChildren = !!row.children?.length
		const isExpanded = expandedRows[row.id]

		return (
			<Fragment key={row.id}>
				<tr
					onClick={() => hasChildren && toggleRow(row.id)}
					style={{
						cursor: hasChildren ? 'pointer' : 'default',
					}}
				>
					<td
						style={{ paddingLeft: `${level * 20}px` }}
						className={
							hasChildren ||
							row.id === 'notSpecified' ||
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
						{<Badge label={row.january.value} mode={row.january.status} />}
					</td>
					<td className={styles.value}>
						{<Badge label={row.february.value} mode={row.february.status} />}
					</td>
					<td className={styles.value}>
						{<Badge label={row.march.value} mode={row.march.status} />}
					</td>
					<td className={styles.value}>
						{<Badge label={row.total.value} mode={row.total.status} />}
					</td>
				</tr>

				{isExpanded && hasChildren && row.children?.map((child) => renderRow(child, level + 1))}
			</Fragment>
		)
	}

	return (
		<section className={styles.articlesAndOrganizations}>
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
