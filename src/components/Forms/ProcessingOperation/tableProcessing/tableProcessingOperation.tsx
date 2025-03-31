import { useState } from 'react'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

import styles from './tableProcessingOperation.module.scss'

interface TableRowProcessing {
	id: string
}

export const TableProcessingOperation = () => {
	const [rows, setRows] = useState<TableRowProcessing[]>([])
	const [newRow, setNewRow] = useState<Omit<TableRowProcessing, 'id'>>({
		counterpartyAccount: '',
		caseTransaction: { case: '', transaction: '' },
		infoArticle: { article: '', subArticles: '' },
		sum: {
			count: '',
			description: '',
		},
	})

	const handleAddRow = () => {
		setRows((prev) => [
			...prev,
			{
				id: String(Date.now()),
				...newRow,
			},
		])
	}

	const handleDeleteRow = (id: string) => {
		console.log('id:', id)
		setRows((prev) => {
			const newRows = prev.filter((row) => row.id !== id)
			return newRows
		})
	}

	return (
		<>
			<table className={styles.table_block}>
				<thead>
					<tr>
						<th>Контрагент, счёт</th>
						<th>Кейс, сделка</th>
						<th>Статья, подстатья</th>
						<th>Сумма</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{rows.map((row, index) => (
						<tr key={`row-${row.id}`} id={row.id}>
							<td>Тест{index}</td>
							<td>
								<div className={styles.title_text02}>Тест{index}</div>
								<div className=''>Тест{index}</div>
							</td>
							<td>
								<div className={styles.title_text01}>Тест{index}</div>
								<div className=''>Тест{index}</div>
							</td>
							<td>
								<div className={styles.title_text01}>Тест{index}</div>
								<div className=''>Тест{index}</div>
							</td>
							<td>
								<button className={styles.tableRow_del} onClick={() => handleDeleteRow(row.id)}>
									<Icon iconId='input-reset' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Button
				label='Добавить деление'
				mode='clear'
				icon={<Icon iconId='plusAddRow' className={styles.add_icon} />}
				onClick={handleAddRow}
				className={styles.addRow_btn}
			/>
		</>
	)
}
