import { TriangleAlert } from 'lucide-react'
import { RiskIndicator, type RiskTier } from '../RiskIndicator'
import { Badge, type BadgeVariant } from '../Badge'
import styles from './CaseQueueRow.module.css'

export type CaseQueueRowState = 'default' | 'hover'

export interface CaseQueueRowProps {
  /** Номер кейса без решётки */
  caseId?: string
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

const EMPTY = '—'

export function CaseQueueRow({
  caseId,
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
  const hasDiscrepancy = discrepancy !== EMPTY
  const slaOverdue = sla === 'Просрочено'

  return (
    <div className={[styles.row, state === 'hover' ? styles.hover : ''].join(' ')}>
      <div className={[styles.cell, styles.muted, styles.mono].join(' ')}>{caseId ? `#${caseId}` : ''}</div>
      <div>
        <RiskIndicator tier={tier}>{tierLabel}</RiskIndicator>
      </div>
      <div className={[styles.cell, styles.strong].join(' ')}>{applicant}</div>
      <div>
        <Badge variant={statusVariant} size="sm">
          {statusLabel}
        </Badge>
      </div>
      <div className={[styles.cell, styles.mono, sla === EMPTY ? styles.muted : '', slaOverdue ? styles.error : ''].join(' ')}>{sla}</div>
      <div className={[styles.cell, styles.muted, styles.mono].join(' ')}>{date}</div>
      <div className={[styles.cell, hasDiscrepancy ? styles.discrepancy : styles.muted].join(' ')}>
        {hasDiscrepancy ? (
          <>
            <TriangleAlert size={14} strokeWidth={2} aria-hidden="true" />
            {discrepancy.replace('⚠', '').trim()}
          </>
        ) : (
          EMPTY
        )}
      </div>
    </div>
  )
}
