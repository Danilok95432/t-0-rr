/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, FC, useEffect } from 'react'
import classNames from 'classnames'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { PlusIconSVG } from '@/shared/ui/icons/plusIconSVG'
import { useEditDealForm } from '@/features/deals/hooks/useEditDealForm'
import { DealInfo, PaymentData } from '@/features/deals/table/config/dealsType'
import { GridTable } from '@/shared/ui/GridTable'
import { ColDef } from 'ag-grid-community'

import styles from './index.module.scss'
import { CheckIconSVG } from '@/shared/ui/icons/checkIIconSVG'
import { PencilIconSVG } from '@/shared/ui/icons/pencilIconSVG'
import { TrashIconSVG } from '@/shared/ui/icons/trashIconSVG'
import { useGetDealPlanQuery } from '@/features/deals/api/dealsApi'

interface EditDealFormProps {
  id: string
  deal: DealInfo
}

export const DealTableSum: FC<EditDealFormProps> = ({ id, deal }) => {
  const { errors, handleSubmit, onSubmit } = useEditDealForm(id, deal)
  const { data } = useGetDealPlanQuery(id ?? '')

  const [rowData, setRowData] = useState<PaymentData[]>([])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<PaymentData>>({})

  useEffect(() => {
    if (data?.paymentData) {
      setRowData(data.paymentData)
    }
  }, [data])

  const handleEdit = (row: PaymentData) => {
    setEditingId(row.id)
    setEditFormData(row)
  }

  const handleSave = (id: string) => {
    setRowData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...editFormData, isEditing: false } : row)),
    )
    setEditingId(null)
    setEditFormData({})
  }

  const handleDelete = (id: string) => {
    setRowData((prev) => prev.filter((row) => row.id !== id))
  }

  const handleAddRow = () => {
    const newId = String(Date.now())
    const newRow: PaymentData = {
      id: newId,
      date: new Date().toLocaleDateString('ru-RU'),
      name: '',
      sum: '0',
      isEditing: true,
    }
    setRowData((prev) => [...prev, newRow])
    setEditingId(newId)
    setEditFormData(newRow)
  }

  const handleCellChange = (field: keyof PaymentData, value: string) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }))
  }

  const ActionCellRenderer = (params: any) => {
    const row = params.data
    const isEditing = editingId === row.id

    if (isEditing) {
      return (
        <div className={styles.actionButtons}>
          <Button
            mode='table'
            disabled
            tableMode='approve'
            onClick={() => handleSave(row.id)}
            icon={<CheckIconSVG />}
          />
        </div>
      )
    }

    return (
      <div className={styles.actionButtons}>
        <Button
          mode='table'
          disabled
          tableMode='edit'
          onClick={() => handleEdit(row)}
          icon={<PencilIconSVG />}
        />
        <Button
          mode='table'
          tableMode='delete'
          disabled
          onClick={() => handleDelete(row.id)}
          icon={<TrashIconSVG />}
        />
      </div>
    )
  }

  const columnDefinitions = useMemo<ColDef[]>(
    () => [
      { field: 'id', headerName: '№', minWidth: 60, maxWidth: 60 },
      {
        field: 'date',
        headerName: 'Дата',
        width: 120,
        cellRenderer: (params: any) => {
          if (editingId === params.data.id) {
            return (
              <div className={styles.editCell}>
                <Input
                  id=''
                  value={editFormData.date || ''}
                  onChange={(e) => handleCellChange('date', e?.target.value ?? '')}
                  hasResetIcon={false}
                />
              </div>
            )
          }
          return params.value
        },
      },
      {
        field: 'name',
        headerName: 'Наименование',
        flex: 2,
        cellRenderer: (params: any) => {
          if (editingId === params.data.id) {
            return (
              <div className={styles.editCell}>
                <Input
                  id=''
                  value={editFormData.name || ''}
                  onChange={(e) => handleCellChange('name', e?.target.value ?? '')}
                  hasResetIcon={false}
                />
              </div>
            )
          }
          return params.value
        },
      },
      {
        field: 'sum',
        headerName: 'Сумма',
        width: 150,
        valueFormatter: (params) => {
          return params.value
        },
        cellRenderer: (params: any) => {
          if (editingId === params.data.id) {
            return (
              <div className={styles.editCell}>
                <Input
                  id=''
                  value={editFormData.sum?.toString() || ''}
                  onChange={(e) => handleCellChange('sum', e?.target.value ?? '')}
                  hasResetIcon={false}
                />
              </div>
            )
          }
          return <span className={styles.amountCell}>{params.valueFormatted}</span>
        },
      },
      {
        headerName: 'Управление',
        maxWidth: 130,
        cellRenderer: ActionCellRenderer,
        sortable: false,
        filter: false,
        resizable: false,
      },
    ],
    [editingId, editFormData],
  )

  return (
    <form className={styles.dealDataTable} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Плановые платежи по Договору</h3>

      <div className={styles.inner}>
        <Input
          id='sum'
          label='Плановая сумма сделки'
          value={data?.sum}
          hasResetIcon={false}
          disabled={true}
          error={errors.deal_name?.message}
        />

        <div className={styles.tableWrapper}>
          <GridTable
            rowData={rowData}
            columnDefinitions={columnDefinitions}
            checkboxHidden={false}
          />
        </div>
      </div>

      <div className={classNames(styles.button_wrapper)}>
        <Button
          mode='primary'
          label='Добавить плановый платеж'
          onClick={handleAddRow}
          disabled
          icon={<PlusIconSVG />}
        />
      </div>
    </form>
  )
}
