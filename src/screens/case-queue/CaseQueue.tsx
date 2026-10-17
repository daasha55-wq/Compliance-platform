import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, CaseQueueHeader, CaseQueueRow, EmptyState } from '../../components'
import type { RiskTier } from '../../components'
import { AppShell } from '../_shared/AppShell'
import { useCases } from '../../data/CasesContext'
import styles from './CaseQueue.module.css'

type TierFilter = 'all' | RiskTier
type StatusFilter = 'Все' | 'Ожидает решения' | 'На проверке' | 'Просрочено' | 'Одобрено' | 'Ожидает подтверждения'
type SortOption = 'По SLA' | 'По дате' | 'По тиру'

const tierOptions: { value: TierFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const statusOptions: StatusFilter[] = ['Все', 'Ожидает решения', 'На проверке', 'Просрочено', 'Одобрено', 'Ожидает подтверждения']
const sortOptions: SortOption[] = ['По SLA', 'По дате', 'По тиру']
const tierOrder: Record<RiskTier, number> = { high: 0, medium: 1, low: 2 }

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

export default function CaseQueue() {
  const { cases } = useCases()
  const navigate = useNavigate()
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Все')
  const [sortBy, setSortBy] = useState<SortOption>('По SLA')

  const queueCases = useMemo(() => cases.filter((c) => c.stage !== 'rejected'), [cases])

  const stats = useMemo(
    () => [
      { label: 'Ждут решения', value: queueCases.filter((c) => c.stage === 'open').length, hint: 'Medium и High в работе' },
      { label: 'Просрочен SLA', value: queueCases.filter((c) => c.sla === 'Просрочено').length, hint: 'Нужно решить сегодня', alert: true },
      { label: 'Источники расходятся', value: queueCases.filter((c) => c.discrepancy !== '—').length, hint: 'Sumsub ≠ ComplyAdvantage' },
      { label: 'Одобрено автоматически', value: queueCases.filter((c) => c.statusLabel === 'Одобрено (авто)').length, hint: 'Low-риск, записано в аудит-лог' },
    ],
    [queueCases],
  )

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

  const resetFilters = () => {
    setTierFilter('all')
    setStatusFilter('Все')
  }

  return (
    <AppShell title="Очередь кейсов" subtitle="KYC/AML-кейсы по риск-тиру и SLA. Low-риск закрывается автоматически." activeNav="case-queue">
      <div className={styles.stats}>
        {stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={`${styles.statLabel} ds-body-xs`}>{s.label}</span>
            <span className={[styles.statValue, 'ds-heading-2xl', s.alert && s.value > 0 ? styles.statAlert : ''].join(' ')}>{s.value}</span>
            <span className={`${styles.statHint} ds-body-xs`}>{s.hint}</span>
          </div>
        ))}
      </div>

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.filterLeft}>
            <div className={styles.segment} role="group" aria-label="Риск-тир">
              {tierOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={tierFilter === opt.value}
                  className={[styles.segmentButton, tierFilter === opt.value ? styles.segmentButtonActive : ''].join(' ')}
                  onClick={() => setTierFilter(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <Dropdown label={`Статус: ${statusFilter}`} options={statusOptions} value={statusFilter} onSelect={(v) => setStatusFilter(v as StatusFilter)} />
            <Dropdown label={`Сортировка: ${sortBy}`} options={sortOptions} value={sortBy} onSelect={(v) => setSortBy(v as SortOption)} />
          </div>
          <span className={`${styles.count} ds-body-sm`}>
            {filtered.length} {plural(filtered.length, 'кейс', 'кейса', 'кейсов')}
          </span>
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
                  caseId={row.id}
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
          <EmptyState
            variant="filter-empty"
            title="По этому фильтру кейсов нет"
            description="Попробуйте сбросить фильтр тира или статуса"
            action={
              <Button type="secondary" size="sm" onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            }
          />
        )}
      </section>
    </AppShell>
  )
}
