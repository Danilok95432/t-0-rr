import classNames from 'classnames'

import { useEditingMode } from '@/features/editingMode/hooks/useEditingMode'

import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { SelectC } from '@/shared/ui/Select'
import { InputDate } from '@/shared/ui/InputDate'
import { Button } from '@/shared/ui/Button'

import styles from './deal-data.module.scss'

export const DealData = () => {
  const { isEditingModeActive, handleDeactivateEditingMode } = useEditingMode()

  return (
    <section className={styles.dealData}>
      <h3 className={styles.title}>Данные сделки</h3>

      <div className={styles.inner}>
        <Input
          id='shortName'
          label='Краткое название сделки'
          hasResetIcon
          disabled={!isEditingModeActive}
        />

        <SelectC
          label='Кейс'
          options={[]}
          values={[]}
          onChange={() => {}}
          disabled={!isEditingModeActive}
        />

        <Input
          id='nameAgreement'
          label='Название Договора'
          hasResetIcon
          disabled={!isEditingModeActive}
        />

        <TextArea
          id='fullName'
          label='Полное название сделки'
          className={styles.dealData_textArea}
          disabled={!isEditingModeActive}
        />

        <SelectC
          label='Организация с нашей стороны'
          options={[]}
          values={[]}
          onChange={() => {}}
          disabled={!isEditingModeActive}
        />

        <InputDate
          date={new Date()}
          label='Дата заключения Договора'
          popperPlacement='bottom-start'
          disabled={!isEditingModeActive}
        />

        <SelectC
          values={[]}
          options={[]}
          label='Контрагент'
          onChange={() => {}}
          disabled={!isEditingModeActive}
        />

        <Input
          id='planTransaction'
          label='Плановый расход сделки в рублях'
          hasResetIcon
          disabled={!isEditingModeActive}
        />
      </div>

      <div
        className={classNames(styles.button_wrapper, { [styles.isVisible]: isEditingModeActive })}
      >
        <Button mode='primary' label='Сохранить изменения' onClick={handleDeactivateEditingMode} />
        <Button mode='secondary' label='Отменить' onClick={handleDeactivateEditingMode} />
      </div>
    </section>
  )
}
