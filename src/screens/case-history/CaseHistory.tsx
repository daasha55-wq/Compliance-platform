import { useNavigate, useParams } from 'react-router-dom'
import { Button, EmptyState, Tabs } from '../../components'
import { AppShell } from '../_shared/AppShell'
import { useCases } from '../../data/CasesContext'
import styles from './CaseHistory.module.css'

const DEFAULT_CASE_ID = '4821'

export default function CaseHistory() {
  const { caseId = DEFAULT_CASE_ID } = useParams()
  const { getCase } = useCases()
  const navigate = useNavigate()

  const kase = getCase(caseId)

  if (!kase) {
    return (
      <AppShell breadcrumb={['Очередь кейсов', 'Кейс не найден']} activeNav="case-queue">
        <EmptyState
          variant="not-found"
          title="Кейс не найден"
          description={`Кейс #${caseId} не найден. Проверьте номер или вернитесь в очередь`}
          action={
            <Button type="secondary" size="sm" onClick={() => navigate('/screens/case-queue')}>
              Вернуться в очередь
            </Button>
          }
        />
      </AppShell>
    )
  }

  return (
    <AppShell
      breadcrumb={['Очередь кейсов', `Кейс #${kase.id} — ${kase.applicant}`]}
      activeNav="case-queue"
    >
      <Tabs
        firstLabel="Сводка"
        secondLabel="История"
        active="second"
        size="md"
        onChange={(tab) => {
          if (tab === 'first') navigate(`/screens/case-detail/${kase.id}`)
        }}
      />

      <div className={styles.historyList}>
        {kase.history.map((entry) => (
          <p key={entry} className={`${styles.entry} ds-body-sm`}>
            {entry}
          </p>
        ))}
      </div>
    </AppShell>
  )
}
