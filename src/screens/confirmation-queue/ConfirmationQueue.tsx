import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircleDashedCheck } from 'lucide-react'
import { Dropdown, ConfirmationHeader, ConfirmationRow } from '../../components'
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
      logo={<MessageCircleDashedCheck size={24} strokeWidth={2} className={styles.logoIcon} />}
      title="Ожидает подтверждения"
      activeNav="confirmations"
      headerRight={<span className={`${styles.role} ds-body-xs`}>Senior Compliance Officer</span>}
    >
      <div className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <span className="ds-body-sm-medium">Тир: Все / Medium / High</span>
          <Dropdown label={`Сортировка: ${sortBy}`} options={sortOptions} onSelect={(v) => setSortBy(v as SortOption)} />
        </div>
        <span className="ds-body-sm-medium">{rows.length} {rows.length === 1 ? 'кейс ожидает' : 'кейсов ожидают'} подтверждения</span>
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
        <div className={styles.emptyPlate}>
          <h2 className={`${styles.emptyTitle} ds-heading-lg`}>Нет кейсов, ожидающих подтверждения</h2>
          <p className={`${styles.emptySubtitle} ds-body-sm`}>Кейсы появятся здесь, когда Compliance Officer эскалирует решение</p>
        </div>
      )}
    </AppShell>
  )
}
