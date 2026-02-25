/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, FC, useEffect, useCallback } from 'react'
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
import {
  useGetDealPlanQuery,
  useDeleteDealPlanMutation,
  useSaveDealPlanMutation,
  useLazyAddNewDealPlanQuery,
} from '@/features/deals/api/dealsApi'

interface EditDealFormProps {
  id: string
  deal: DealInfo
}

// Тип для FormData, который ожидает saveDealPlan
interface SaveDealPlanData {
  id: number // id сделки (из пропса)
  id_deal_plan: string // id из addNewDealPlan
  date: string
  name: string
  sum: string
}

export const DealTableSum: FC<EditDealFormProps> = ({ id, deal }) => {
  const { errors, handleSubmit, onSubmit } = useEditDealForm(id, deal)

  // RTK Query хуки
  const { data: planData } = useGetDealPlanQuery(id ?? '')
  const [getNewDealPlanId] = useLazyAddNewDealPlanQuery()
  const [deleteDealPlan] = useDeleteDealPlanMutation()
  const [saveDealPlan] = useSaveDealPlanMutation()

  const [rowData, setRowData] = useState<PaymentData[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<PaymentData>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Загружаем данные при монтировании и после изменений
  useEffect(() => {
    if (planData?.paymentData) {
      // Убеждаемся, что все строки имеют isEditing = false при загрузке
      const dataWithEditingFalse = planData.paymentData.map(row => ({
        ...row,
        isEditing: false
      }))
      setRowData(dataWithEditingFalse)
    }
  }, [planData])

  // Обработчик редактирования
  const handleEdit = useCallback((row: PaymentData) => {
    setEditingId(row.id)
    setEditFormData(row)
    
    // Обновляем isEditing для строки
    setRowData(prev => 
      prev.map(r => ({
        ...r,
        isEditing: r.id === row.id ? true : false
      }))
    )
  }, [])

  // Обработчик отмены редактирования
  const handleCancelEdit = useCallback(() => {
    setEditingId(null)
    setEditFormData({})
    
    // Сбрасываем isEditing для всех строк
    setRowData(prev => 
      prev.map(r => ({
        ...r,
        isEditing: false
      }))
    )
  }, [])

  // Обработчик сохранения (для существующих и новых строк)
  const handleSave = useCallback(async (rowId: string) => {
    const rowToSave = rowData.find((row) => row.id === rowId)
    if (!rowToSave) return

    setIsLoading(true)
    try {
      // Определяем, это новая строка или существующая
      const isNewRow = !rowToSave.id_deal_plan
      const formData = new FormData()
      formData.append('id', id)
      formData.append('id_deal_plan', isNewRow ? String(rowToSave?.id) || '' : String(rowToSave.id_deal_plan) || String(rowToSave.id))
      formData.append('date', editFormData.date || rowToSave.date)
      formData.append('name', editFormData.name || rowToSave.name)
      formData.append('sum', editFormData.sum || rowToSave.sum)
      
      const saveData: SaveDealPlanData = {
        id: Number(id), // id сделки из пропса
        id_deal_plan: isNewRow ? String(rowToSave?.id) || '' : String(rowToSave.id_deal_plan) || String(rowToSave.id),
        date: editFormData.date || rowToSave.date,
        name: editFormData.name || rowToSave.name,
        sum: editFormData.sum || rowToSave.sum,
      }

      await saveDealPlan(formData).unwrap()

      // Обновляем локальное состояние и выходим из режима редактирования
      setRowData((prev) =>
        prev.map((row) =>
          row.id === rowId
            ? {
                ...row,
                date: editFormData.date || row.date,
                name: editFormData.name || row.name,
                sum: editFormData.sum || row.sum,
                id_deal_plan: saveData.id_deal_plan,
                isEditing: false, // Важно! Выключаем режим редактирования
              }
            : {
                ...row,
                isEditing: false // Убеждаемся, что у всех строк isEditing = false
              },
        ),
      )
      
      // Выходим из режима редактирования
      setEditingId(null)
      setEditFormData({})
    } catch (error) {
      console.error('Ошибка при сохранении:', error)
    } finally {
      setIsLoading(false)
    }
  }, [rowData, editFormData, id, saveDealPlan])

  // Обработчик удаления
  const handleDelete = useCallback(async (rowId: string) => {
    const rowToDelete = rowData.find((row) => row.id === rowId)
    if (!rowToDelete) return
    setIsLoading(true)
    try {
      // Если есть id_deal_plan, удаляем через API
      if (rowToDelete.id) {
        await deleteDealPlan(rowToDelete.id).unwrap()
      }

      // Удаляем из локального состояния
      setRowData((prev) => prev.filter((row) => row.id !== rowId))
      
      // Если удаляем редактируемую строку, выходим из режима редактирования
      if (editingId === rowId) {
        setEditingId(null)
        setEditFormData({})
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error)
    } finally {
      setIsLoading(false)
    }
  }, [rowData, deleteDealPlan, editingId])

  // Обработчик добавления новой строки
  const handleAddRow = useCallback(async () => {
    setIsLoading(true)
    try {
      // Получаем новый ID для плана
      const { data } = await getNewDealPlanId()
      if (!data?.id) throw new Error('Не удалось получить ID')

      const newRow: PaymentData = {
        id: data?.id,
        id_deal_plan: data?.id,
        date: new Date().toLocaleDateString('ru-RU'),
        name: '',
        sum: '0',
        isEditing: true,
      }

      // Сбрасываем isEditing у всех строк и добавляем новую с isEditing = true
      setRowData((prev) => [
        ...prev.map(r => ({ ...r, isEditing: false })),
        newRow
      ])
      setEditingId(data?.id)
      setEditFormData(newRow)
    } catch (error) {
      console.error('Ошибка при создании новой строки:', error)
    } finally {
      setIsLoading(false)
    }
  }, [getNewDealPlanId])

  // Обработчик изменения ячейки
  const handleCellChange = useCallback((field: keyof PaymentData, value: string) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Компоненты для рендеринга ячеек
  const DateCellRenderer = useMemo(() => {
    const Renderer = (params: any) => {
      const [localValue, setLocalValue] = useState(params.value || '');
      const isEditing = editingId === params.data.id;
      
      useEffect(() => {
        if (isEditing) {
          setLocalValue(editFormData.date || params.value || '');
        }
      }, [isEditing, editFormData.date, params.value]);

      if (isEditing) {
        return (
          <div className={styles.editCell}>
            <Input
              id={`date-${params.data.id}`}
              value={localValue}
              onChange={(e) => {
                const newValue = e?.target.value ?? '';
                setLocalValue(newValue);
                handleCellChange('date', newValue);
              }}
              hasResetIcon={false}
              autoFocus
            />
          </div>
        )
      }
      return params.value
    };
    return Renderer;
  }, [editingId, editFormData.date, handleCellChange]);

  const NameCellRenderer = useMemo(() => {
    const Renderer = (params: any) => {
      const [localValue, setLocalValue] = useState(params.value || '');
      const isEditing = editingId === params.data.id;
      
      useEffect(() => {
        if (isEditing) {
          setLocalValue(editFormData.name || params.value || '');
        }
      }, [isEditing, editFormData.name, params.value]);

      if (isEditing) {
        return (
          <div className={styles.editCell}>
            <Input
              id={`name-${params.data.id}`}
              value={localValue}
              onChange={(e) => {
                const newValue = e?.target.value ?? '';
                setLocalValue(newValue);
                handleCellChange('name', newValue);
              }}
              hasResetIcon={false}
              autoFocus
            />
          </div>
        )
      }
      return params.value
    };
    return Renderer;
  }, [editingId, editFormData.name, handleCellChange]);

  const SumCellRenderer = useMemo(() => {
    const Renderer = (params: any) => {
      const [localValue, setLocalValue] = useState(params.value?.toString() || '');
      const isEditing = editingId === params.data.id;
      
      useEffect(() => {
        if (isEditing) {
          setLocalValue(editFormData.sum?.toString() || params.value?.toString() || '');
        }
      }, [isEditing, editFormData.sum, params.value]);

      if (isEditing) {
        return (
          <div className={styles.editCell}>
            <Input
              id={`sum-${params.data.id}`}
              value={localValue}
              onChange={(e) => {
                const newValue = e?.target.value ?? '';
                setLocalValue(newValue);
                handleCellChange('sum', newValue);
              }}
              hasResetIcon={false}
              autoFocus
            />
          </div>
        )
      }
      return <span className={styles.amountCell}>{params.value}</span>
    };
    return Renderer;
  }, [editingId, editFormData.sum, handleCellChange]);

  // Рендерер для ячейки действий
  const ActionCellRenderer = useMemo(() => {
    const Renderer = (params: any) => {
      const row = params.data
      const isEditing = editingId === row.id

      if (isEditing) {
        return (
          <div className={styles.actionButtons}>
            <Button
              mode='table'
              tableMode='approve'
              onClick={() => handleSave(row.id)}
              icon={<CheckIconSVG />}
              disabled={isLoading}
            />
            <Button
              mode='table'
              tableMode='delete'
              onClick={handleCancelEdit}
              icon={<TrashIconSVG />}
              disabled={isLoading}
            />
          </div>
        )
      }

      return (
        <div className={styles.actionButtons}>
          <Button
            mode='table'
            tableMode='edit'
            onClick={() => handleEdit(row)}
            icon={<PencilIconSVG />}
            disabled={isLoading}
          />
          <Button
            mode='table'
            tableMode='delete'
            onClick={() => handleDelete(row.id)}
            icon={<TrashIconSVG />}
            disabled={isLoading}
          />
        </div>
      )
    };
    return Renderer;
  }, [editingId, isLoading, handleEdit, handleDelete, handleSave, handleCancelEdit]);

  const columnDefinitions = useMemo<ColDef[]>(
    () => [
      { field: 'id', headerName: '№', minWidth: 60, maxWidth: 60 },
      {
        field: 'date',
        headerName: 'Дата',
        width: 120,
        cellRenderer: DateCellRenderer,
      },
      {
        field: 'name',
        headerName: 'Наименование',
        flex: 2,
        cellRenderer: NameCellRenderer,
      },
      {
        field: 'sum',
        headerName: 'Сумма',
        width: 150,
        cellRenderer: SumCellRenderer,
      },
      {
        headerName: 'Управление',
        maxWidth: 150,
        cellRenderer: ActionCellRenderer,
        sortable: false,
        filter: false,
        resizable: false,
      },
    ],
    [DateCellRenderer, NameCellRenderer, SumCellRenderer, ActionCellRenderer],
  )

  return (
    <form className={styles.dealDataTable} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Плановые платежи по Договору</h3>

      <div className={styles.inner}>
        <Input
          id='sum'
          label='Плановая сумма сделки'
          value={planData?.sum || ''}
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
          icon={<PlusIconSVG />}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
