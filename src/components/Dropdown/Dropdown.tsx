import { useState } from 'react'
import styles from './Dropdown.module.css'

export interface DropdownProps {
  label: string
  options?: string[]
  /** Управляет начальным визуальным состоянием (State=default|open из каталога) */
  defaultOpen?: boolean
}

export function Dropdown({ label, options = [], defaultOpen = false }: DropdownProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={[styles.wrapper, open ? styles.open : ''].join(' ')}>
      <button type="button" className={styles.trigger} onClick={() => setOpen((v) => !v)}>
        <span className={styles.triggerLabel}>{label}</span>
        <span className={styles.chevron}>▾</span>
      </button>
      {open && (
        <div className={styles.menu}>
          {options.length > 0 ? (
            options.map((option) => (
              <div key={option} className={styles.option}>
                {option}
              </div>
            ))
          ) : (
            <div className={styles.emptyOption}>Нет доступных значений</div>
          )}
        </div>
      )}
    </div>
  )
}
