import styles from './Toast.module.css'

export type ToastVariant = 'success' | 'warning' | 'error' | 'info'

export interface ToastProps {
  variant: ToastVariant
  children: string
}

export function Toast({ variant, children }: ToastProps) {
  return <div className={[styles.toast, styles[variant]].join(' ')}>{children}</div>
}
