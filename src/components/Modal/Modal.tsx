import type { ReactNode } from 'react'
import { Button } from '../Button'
import styles from './Modal.module.css'

export interface ModalProps {
  title: string
  children?: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

export function Modal({
  title,
  children,
  onConfirm,
  onCancel,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
}: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        {children && <div className={styles.body}>{children}</div>}
        <div className={styles.footer}>
          <Button type="secondary" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="primary" size="sm" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
