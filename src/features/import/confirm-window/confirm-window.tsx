import { FC } from 'react'
import { IFormProps } from '@/shared/types/forms'

import { Button } from '@/shared/ui/Button'
import { Badge } from '@/shared/ui/Badge'

import styles from './index.module.scss'
import { useModal } from '@/features/modal/hooks/useModal'
import { useNavigate } from 'react-router'

type ConfirmWindowProps = {
  submitHandle: () => void
  link?: string
}

export const ConfirmWindow: FC<IFormProps & ConfirmWindowProps> = ({ labelBadge, submitHandle, link }) => {
  const { handleCloseModal } = useModal()
  const navigate = useNavigate()

  const handleClick = () => {
    submitHandle()
    handleCloseModal()
    navigate(link ?? '/')
  }

  return (
    <div className={styles.confirmWindow}>
      {labelBadge && <Badge className={styles.text} label={labelBadge} />}
      <div className={styles.controlsRow}>
      <Button
        mode='primary'
        className={styles.deleteBtn}
        type='submit'
        label={'Удалить'}
        onClick={handleClick}
      />
      <Button
        mode='primary'
        type='submit'
        className={styles.cancelBtn}
        label={'Отмена'}
        onClick={handleCloseModal}
      />
      </div>
    </div>
  )
}