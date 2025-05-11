import { FC } from 'react'
import classNames from 'classnames'

import { IIconProps } from '../types'

import styles from './icon.module.scss'

export const Icon: FC<IIconProps> = ({ iconId, className, width, height }) => (
  <svg
    className={classNames(styles.icon, className)}
    aria-hidden='true'
    width={width}
    height={height}
  >
    <use href={`#icon-${iconId}`} />
  </svg>
)
