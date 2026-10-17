import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

export type ButtonType = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType
  size?: ButtonSize
}

export function Button({ type = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  const classes = [styles.button, styles[type], styles[size], className].filter(Boolean).join(' ')
  return <button className={classes} {...rest} />
}
