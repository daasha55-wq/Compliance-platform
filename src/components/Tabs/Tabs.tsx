import styles from './Tabs.module.css'

export type TabsActive = 'none' | 'first' | 'second'
export type TabsSize = 'sm' | 'md'

export interface TabsProps {
  firstLabel?: string
  secondLabel?: string
  active?: TabsActive
  size?: TabsSize
  onChange?: (active: 'first' | 'second') => void
}

export function Tabs({
  firstLabel = 'Сводка',
  secondLabel = 'Аудит-лог',
  active = 'first',
  size = 'md',
  onChange,
}: TabsProps) {
  return (
    <div className={[styles.tabs, styles[size]].join(' ')}>
      <button
        type="button"
        className={[styles.tab, active === 'first' ? styles.active : ''].join(' ')}
        onClick={() => onChange?.('first')}
      >
        {firstLabel}
      </button>
      <button
        type="button"
        className={[styles.tab, active === 'second' ? styles.active : ''].join(' ')}
        onClick={() => onChange?.('second')}
      >
        {secondLabel}
      </button>
    </div>
  )
}
