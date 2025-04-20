import { FC } from 'react'
import { motion } from 'motion/react'
import classNames from 'classnames'

import { IModalProps } from '../types'
import { useModal } from '@/features/modal/hooks/useModal'

import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/Button'

import styles from './modal.module.scss'

export const Modal: FC<IModalProps> = ({ title, children, className }) => {
  const { isOpenModal, handleCloseModal } = useModal()

  // обЪект свойств поведения модального окна
  const fadeIn = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classNames(styles.overlay, { [styles.visible]: isOpenModal })}
    >
      <motion.div
        role='dialog'
        variants={fadeIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={classNames(styles.content, className)}
      >
        <h2 className={styles.title}>{title}</h2>

        {children}

        <Button
          type='submit'
          mode='clear'
          icon={<Icon iconId='close' width='24px' height='24px' />}
          className={styles.modal_close}
          onClick={handleCloseModal}
        />
      </motion.div>
    </motion.div>
  )
}
