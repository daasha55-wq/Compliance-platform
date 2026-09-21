import styles from './AccordionRow.module.css'

export interface AccordionRowProps {
  label: string
  onClick?: () => void
}

export function AccordionRow({ label, onClick }: AccordionRowProps) {
  return (
    <button type="button" className={styles.row} onClick={onClick}>
      <span className={styles.chevron}>▸</span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
