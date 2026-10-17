import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import styles from './Dropdown.module.css'

export interface DropdownProps {
  label: string
  options?: string[]
  /** Выбранный пункт — отмечается галочкой и акцентом */
  value?: string
  /** Управляет начальным визуальным состоянием (State=default|open из каталога) */
  defaultOpen?: boolean
  /** Вызывается при выборе пункта меню; меню закрывается после выбора */
  onSelect?: (option: string) => void
}

export function Dropdown({ label, options = [], value, defaultOpen = false, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const choose = (option: string) => {
    onSelect?.(option)
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div ref={rootRef} className={[styles.wrapper, open ? styles.open : ''].join(' ')}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerLabel}>{label}</span>
        <span className={[styles.chevron, open ? styles.chevronOpen : ''].join(' ')}>▾</span>
      </button>
      {open && (
        <div className={styles.menu} role="listbox">
          {options.length > 0 ? (
            options.map((option) => {
              const selected = option === value
              return (
                <div
                  key={option}
                  className={[styles.option, selected ? styles.optionSelected : ''].join(' ')}
                  role="option"
                  aria-selected={selected}
                  tabIndex={0}
                  onClick={() => choose(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      choose(option)
                    }
                  }}
                >
                  <span>{option}</span>
                  {selected && <Check size={14} strokeWidth={2.5} aria-hidden="true" className={styles.check} />}
                </div>
              )
            })
          ) : (
            <div className={styles.emptyOption}>Нет доступных значений</div>
          )}
        </div>
      )}
    </div>
  )
}
