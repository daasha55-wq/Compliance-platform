import type { ReactNode } from 'react'
import styles from './Card.module.css'

export type CardState = 'default' | 'hover' | 'selected'

export interface CardProps {
  title: string
  children?: ReactNode
  /** В Figma-каталоге у ComponentSet нет варианта Default — только Hover/Selected (известный пробел, см. ds/components.md) */
  state?: CardState
}

export function Card({ title, children, state = 'default' }: CardProps) {
  const classes = [styles.card, state === 'hover' ? styles.hover : '', state === 'selected' ? styles.selected : '']
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes}>
      <div className={styles.title}>{title}</div>
      {children && <div className={styles.body}>{children}</div>}
    </div>
  )
}
