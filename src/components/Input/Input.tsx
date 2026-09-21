import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export type InputState = 'default' | 'error'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState
}

export function Input({ state = 'default', className, ...rest }: InputProps) {
  const classes = [styles.input, state === 'error' ? styles.error : '', className]
    .filter(Boolean)
    .join(' ')
  return <input className={classes} {...rest} />
}
