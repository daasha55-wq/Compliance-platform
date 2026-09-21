import styles from './Avatar.module.css'

export interface AvatarProps {
  /** Инициалы или короткая подпись */
  initials: string
}

export function Avatar({ initials }: AvatarProps) {
  return <div className={styles.avatar}>{initials}</div>
}
