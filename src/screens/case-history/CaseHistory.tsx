import { useNavigate, useParams } from 'react-router-dom'
import { Rows3 } from 'lucide-react'
import { Tabs } from '../../components'
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
      <AppShell logo={<Rows3 size={24} strokeWidth={2} />} title="Кейс не найден" activeNav="case-queue">
        <p className="ds-body-sm">Кейс #{caseId} не найден.</p>
      </AppShell>
    )
  }

  return (
    <AppShell
      logo={<Rows3 size={24} strokeWidth={2} />}
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
