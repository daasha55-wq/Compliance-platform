import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, ConfirmationHeader, ConfirmationRow, EmptyState } from '../../components'
import { AppShell } from '../_shared/AppShell'
import { useCases } from '../../data/CasesContext'
import styles from './ConfirmationQueue.module.css'

type SortOption = 'По дате эскалации' | 'По времени ожидания' | 'По тиру'
const sortOptions: SortOption[] = ['По дате эскалации', 'По времени ожидания', 'По тиру']
const tierOrder = { high: 0, medium: 1, low: 2 } as const

export default function ConfirmationQueue() {
  const { cases } = useCases()
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState<SortOption>('По дате эскалации')

  const rows = useMemo(() => {
    const escalated = cases.filter((c) => c.stage === 'escalated' && c.escalation)
    const sorted = [...escalated]
    if (sortBy === 'По тиру') {
      sorted.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier])
    } else if (sortBy === 'По времени ожидания') {
      sorted.sort((a, b) => (a.escalation!.waitingTime).localeCompare(b.escalation!.waitingTime))
    } else {
      sorted.sort((a, b) => b.escalation!.date.localeCompare(a.escalation!.date))
    }
    return sorted
  }, [cases, sortBy])

  return (
    <AppShell
      title="Ожидает подтверждения"
      subtitle="Эскалации от Compliance Officer: подтвердите или отклоните решение"
      activeNav="confirmations"
      role="senior"
    >
      <section className={styles.card}>
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <Dropdown label={`Сортировка: ${sortBy}`} options={sortOptions} value={sortBy} onSelect={(v) => setSortBy(v as SortOption)} />
          </div>
          <span className={`${styles.count} ds-body-sm`}>Ожидают подтверждения: {rows.length}</span>
        </div>

        {rows.length > 0 ? (
          <div className={styles.table}>
            <ConfirmationHeader />
            {rows.map((row) => (
              <button
                key={row.id}
                type="button"
                className={styles.rowButton}
                onClick={() => navigate(`/screens/case-detail/${row.id}`)}
              >
                <ConfirmationRow
                  tier={row.tier}
                  tierLabel={row.tierLabel.replace(' risk', '')}
                  applicant={row.applicant}
                  escalatedBy={row.escalation!.escalatedBy}
                  note={row.escalation!.note}
                  date={row.escalation!.date}
                  waitingTime={row.escalation!.waitingTime}
                />
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            variant="confirm-empty"
            title="Нет кейсов, ожидающих подтверждения"
            description="Кейсы появятся здесь, когда Compliance Officer эскалирует решение"
          />
        )}
      </section>
    </AppShell>
  )
}
