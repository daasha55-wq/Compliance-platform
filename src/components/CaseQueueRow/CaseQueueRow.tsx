import { RiskIndicator, type RiskTier } from '../RiskIndicator'
import { Badge, type BadgeVariant } from '../Badge'
import styles from './CaseQueueRow.module.css'

export type CaseQueueRowState = 'default' | 'hover'

export interface CaseQueueRowProps {
  tier: RiskTier
  tierLabel: string
  applicant: string
  statusLabel: string
  statusVariant: BadgeVariant
  sla: string
  date: string
  discrepancy: string
  state?: CaseQueueRowState
}

export function CaseQueueRow({
  tier,
  tierLabel,
  applicant,
  statusLabel,
  statusVariant,
  sla,
  date,
  discrepancy,
  state = 'default',
}: CaseQueueRowProps) {
  return (
    <div className={[styles.row, state === 'hover' ? styles.hover : ''].join(' ')}>
      <div className={styles.col0}>
        <RiskIndicator tier={tier}>{tierLabel}</RiskIndicator>
      </div>
      <div className={[styles.cell, styles.col1].join(' ')}>{applicant}</div>
      <div className={styles.col2}>
        <Badge variant={statusVariant} size="sm">
          {statusLabel}
        </Badge>
      </div>
      <div className={[styles.cell, styles.col3].join(' ')}>{sla}</div>
      <div className={[styles.cell, styles.col4].join(' ')}>{date}</div>
      <div className={[styles.cell, styles.col5].join(' ')}>{discrepancy}</div>
    </div>
  )
}
