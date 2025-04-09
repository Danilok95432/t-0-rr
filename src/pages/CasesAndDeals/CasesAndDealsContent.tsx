import { Fragment, ReactElement, useState } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import { FilterCaseAndDeals } from '@/features/summary/filterCaseAndDeals'

import { FiltersMenu } from '@/shared/ui/FiltersMenu'
import { Badge } from '@/shared/ui/Badge'
import { Icon } from '@/shared/ui/Icon'

import styles from './casesAndDeals.module.scss'

export interface ISumValue {
	status: 'positive' | 'negative' | 'warning' | 'default' | 'neutral'
	value: string
}

export interface ITableRow {
	id: string
	name: string
	isGroup?: boolean
	children?: ITableRow[]
	january: ISumValue
	february: ISumValue
	march: ISumValue
	total: ISumValue
	hasUnderline?: boolean
}

const CasesAndDealsContent = () => {
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

	const toggleRow = (id: string) => {
		setExpandedRows((prev) => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	const data: ITableRow[] = [
		{
			id: 'name',
			name: 'Длинное название кейса - 1',
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
				},
			],
		},
		{
			id: 'name2',
			name: 'Длинное название кейса - 2',
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
					name: 'Сделка один-один',
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
					name: 'Сделка два-один',
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
							id: 'article3_2',
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
		{
			id: 'notSpecified',
			name: 'Сделка не указана',
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
	]

	const renderRow = (row: ITableRow, level = 0): ReactElement => {
		const hasChildren = !!row.children?.length
		const isExpanded = expandedRows[row.id]

		return (
			<Fragment key={row.id}>
				<tr
					onClick={() => hasChildren && toggleRow(row.id)}
					style={{
						cursor: hasChildren ? 'pointer' : 'default',
					}}
					className={classNames(row.hasUnderline && styles.underlinedRow, {
						[styles.total]: row.id === 'totalCashFlow',
					})}
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
		<section className={styles.casesAndDeals}>
			<FiltersMenu>
				<FilterCaseAndDeals />
			</FiltersMenu>

			<div className={styles.header}>
				<div className={styles.titleWrapper}>
					<span className={styles.subtitle}>Движение денежных средств</span>
					<h2 className={styles.title}>Кейсы и сделки</h2>
				</div>

				<Link to={'/summary'} className={styles.link}>
					Перейти к сводке по статьям и организациям
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

export default CasesAndDealsContent
