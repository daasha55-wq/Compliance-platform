import { useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.css'

export interface DropdownProps {
  label: string
  options?: string[]
  /** Управляет начальным визуальным состоянием (State=default|open из каталога) */
  defaultOpen?: boolean
  /** Вызывается при выборе пункта меню; меню закрывается после выбора */
  onSelect?: (option: string) => void
}

export function Dropdown({ label, options = [], defaultOpen = false, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={rootRef} className={[styles.wrapper, open ? styles.open : ''].join(' ')}>
      <button type="button" className={styles.trigger} onClick={() => setOpen((v) => !v)}>
        <span className={styles.triggerLabel}>{label}</span>
        <span className={styles.chevron}>▾</span>
      </button>
      {open && (
        <div className={styles.menu}>
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option}
                className={styles.option}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelect?.(option)
                  setOpen(false)
                }}
              >
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
