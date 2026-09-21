import styles from './Badge.module.css'

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info'
export type BadgeSize = 'md' | 'sm'

export interface BadgeProps {
  variant: BadgeVariant
  size?: BadgeSize
  children: string
}

export function Badge({ variant, size = 'md', children }: BadgeProps) {
  return <span className={[styles.badge, styles[variant], styles[size]].join(' ')}>{children}</span>
}
