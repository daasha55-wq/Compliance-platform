import { RiskIndicator, type RiskTier } from '../RiskIndicator'
import styles from './ConfirmationRow.module.css'

export type ConfirmationRowState = 'default' | 'hover'

export interface ConfirmationRowProps {
  tier: RiskTier
  tierLabel: string
  applicant: string
  escalatedBy: string
  note: string
  date: string
  waitingTime: string
  state?: ConfirmationRowState
}

export function ConfirmationRow({
  tier,
  tierLabel,
  applicant,
  escalatedBy,
  note,
  date,
  waitingTime,
  state = 'default',
}: ConfirmationRowProps) {
  return (
    <div className={[styles.row, state === 'hover' ? styles.hover : ''].join(' ')}>
      <div className={styles.col0}>
        <RiskIndicator tier={tier}>{tierLabel}</RiskIndicator>
      </div>
      <div className={[styles.cell, styles.col1].join(' ')}>{applicant}</div>
      <div className={[styles.cell, styles.col2].join(' ')}>{escalatedBy}</div>
      <div className={[styles.cell, styles.col3].join(' ')}>{note}</div>
      <div className={[styles.cell, styles.col4].join(' ')}>{date}</div>
      <div className={[styles.cell, styles.col5].join(' ')}>{waitingTime}</div>
    </div>
  )
}
