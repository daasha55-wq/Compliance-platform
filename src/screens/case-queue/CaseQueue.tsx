import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rows3, Inbox } from 'lucide-react'
import { Dropdown, CaseQueueHeader, CaseQueueRow } from '../../components'
import type { RiskTier } from '../../components'
import { AppShell } from '../_shared/AppShell'
import { useCases } from '../../data/CasesContext'
import styles from './CaseQueue.module.css'

type TierFilter = 'all' | RiskTier
type StatusFilter = 'Все' | 'Ожидает решения' | 'На проверке' | 'Просрочено' | 'Одобрено' | 'Ожидает подтверждения'
type SortOption = 'По SLA' | 'По дате' | 'По тиру'

const tierOptions: { value: TierFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const statusOptions: StatusFilter[] = ['Все', 'Ожидает решения', 'На проверке', 'Просрочено', 'Одобрено', 'Ожидает подтверждения']
const sortOptions: SortOption[] = ['По SLA', 'По дате', 'По тиру']
const tierOrder: Record<RiskTier, number> = { high: 0, medium: 1, low: 2 }

export default function CaseQueue() {
  const { cases } = useCases()
  const navigate = useNavigate()
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Все')
  const [sortBy, setSortBy] = useState<SortOption>('По SLA')

  const queueCases = useMemo(() => cases.filter((c) => c.stage !== 'rejected'), [cases])

  const filtered = useMemo(() => {
    let rows = queueCases
    if (tierFilter !== 'all') rows = rows.filter((c) => c.tier === tierFilter)
    if (statusFilter !== 'Все') {
      rows = rows.filter((c) => {
        if (statusFilter === 'Одобрено') return c.statusLabel.startsWith('Одобрено')
        return c.statusLabel === statusFilter
      })
    }
    const sorted = [...rows]
    if (sortBy === 'По SLA') {
      sorted.sort((a, b) => (a.sla === '—' ? 1 : 0) - (b.sla === '—' ? 1 : 0))
    } else if (sortBy === 'По дате') {
      sorted.sort((a, b) => b.date.localeCompare(a.date))
    } else {
      sorted.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier])
    }
    return sorted
  }, [queueCases, tierFilter, statusFilter, sortBy])

  return (
    <AppShell logo={<Rows3 size={24} strokeWidth={2} />} title="Очередь кейсов" activeNav="case-queue">
      <div className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <div className={styles.tierSegment}>
            <span className="ds-body-sm-medium">Тир:</span>
            {tierOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={[styles.tierButton, tierFilter === opt.value ? styles.tierButtonActive : ''].join(' ')}
                onClick={() => setTierFilter(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Dropdown label={`Статус: ${statusFilter}`} options={statusOptions} onSelect={(v) => setStatusFilter(v as StatusFilter)} />
          <Dropdown label={`Сортировка: ${sortBy}`} options={sortOptions} onSelect={(v) => setSortBy(v as SortOption)} />
        </div>
        <span className="ds-body-sm-medium">{filtered.length} {filtered.length === 1 ? 'кейс' : 'кейса'} в очереди</span>
      </div>

      {filtered.length > 0 ? (
        <div className={styles.table}>
          <CaseQueueHeader />
          {filtered.map((row) => (
            <button
              key={row.id}
              type="button"
              className={styles.rowButton}
              onClick={() => navigate(`/screens/case-detail/${row.id}`)}
            >
              <CaseQueueRow
                tier={row.tier}
                tierLabel={row.tierLabel.replace(' risk', '')}
                applicant={row.applicant}
                statusLabel={row.statusLabel}
                statusVariant={row.statusVariant}
                sla={row.sla}
                date={row.date}
                discrepancy={row.discrepancy}
              />
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.emptyPlate}>
          <Inbox size={100} strokeWidth={2} className={styles.emptyIcon} />
          <h2 className={`${styles.emptyTitle} ds-heading-lg`}>По этому фильтру кейсов нет</h2>
          <p className={`${styles.emptySubtitle} ds-body-sm`}>Попробуй сбросить фильтр тира или статуса</p>
        </div>
      )}
    </AppShell>
  )
}
