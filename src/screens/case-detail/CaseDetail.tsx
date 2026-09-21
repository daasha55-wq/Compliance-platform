import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Rows3, TriangleAlert } from 'lucide-react'
import { RiskIndicator, Badge, Tabs, AccordionRow, Button } from '../../components'
import { AppShell } from '../_shared/AppShell'
import { useCases } from '../../data/CasesContext'
import { useToast } from '../../data/ToastContext'
import styles from './CaseDetail.module.css'

const DEFAULT_CASE_ID = '4821'
const ESCALATE_NOTE = 'Требуется второе мнение'
const REJECT_REASON = 'Решение принято по итогам проверки'

export default function CaseDetail() {
  const { caseId = DEFAULT_CASE_ID } = useParams()
  const { getCase, approve, escalate, reject } = useCases()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const kase = getCase(caseId)

  if (!kase) {
    return (
      <AppShell logo={<Rows3 size={24} strokeWidth={2} />} title="Кейс не найден" activeNav="case-queue">
        <p className="ds-body-sm">Кейс #{caseId} не найден.</p>
      </AppShell>
    )
  }

  const isRejected = kase.stage === 'rejected'
  const isApproved = kase.stage === 'approved'
  const isEscalated = kase.stage === 'escalated'
  const isOpen = kase.stage === 'open'
  const canConfirm = expanded.size > 0

  const sections: { key: string; label: string; content: string[] }[] = [
    { key: 'aml', label: 'AML / Sanctions / PEP screening', content: kase.explainability },
    { key: 'docs', label: 'Документы', content: kase.documents },
    ...(isRejected ? [{ key: 'history', label: 'История кейса (аудит-лог)', content: kase.history }] : []),
    { key: 'rules', label: 'Полный список правил', content: kase.rules },
  ]

  const toggleSection = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const handleApprove = () => {
    approve(kase.id)
    showToast('success', `Кейс #${kase.id} одобрен`)
    navigate('/screens/case-queue')
  }

  const handleEscalate = () => {
    escalate(kase.id, ESCALATE_NOTE)
    showToast('info', `Кейс #${kase.id} эскалирован на подтверждение`)
    navigate('/screens/case-queue')
  }

  const handleReject = () => {
    reject(kase.id, REJECT_REASON)
    showToast('error', `Кейс #${kase.id} отклонён`)
    navigate('/screens/case-queue')
  }

  return (
    <AppShell
      logo={<Rows3 size={24} strokeWidth={2} />}
      breadcrumb={['Очередь кейсов', `Кейс #${kase.id} — ${kase.applicant}`]}
      activeNav="case-queue"
    >
      <div className={styles.topGroup}>
        {!isRejected && (
          <Tabs
            firstLabel="Сводка"
            secondLabel="История"
            active="first"
            size="md"
            onChange={(tab) => {
              if (tab === 'second') navigate(`/screens/case-history/${kase.id}`)
            }}
          />
        )}

        <div className={styles.contentGroup}>
          <div className={styles.summaryBar}>
            <div className={styles.tierStatusRow}>
              <RiskIndicator tier={kase.tier}>{kase.tierLabel}</RiskIndicator>
              <Badge variant={kase.statusVariant} size="md">{kase.statusLabel}</Badge>
            </div>
            <div className={`${styles.identityRow} ds-body-sm`}>
              {kase.applicant} / {kase.dob} / {kase.jurisdiction} / {kase.verification}
            </div>

            {isRejected && kase.decision && (
              <div className={styles.banner}>
                <span className={`${styles.bannerTitleError} ds-body-sm-medium`}>Кейс отклонён</span>
                <span className={`${styles.mutedLine} ds-body-sm`}>{kase.decision.date} — {kase.decision.by}</span>
                <span className="ds-body-sm">Причина: {kase.decision.reason}</span>
              </div>
            )}

            {!isRejected && kase.escalation && (
              <div className={styles.banner}>
                <span className="ds-body-sm-medium">Эскалирован на подтверждение</span>
                <span className={`${styles.mutedLine} ds-body-sm`}>{kase.escalation.date} — {kase.escalation.escalatedBy}</span>
                <span className="ds-body-sm">«{kase.escalation.note}»</span>
              </div>
            )}

            {isOpen && kase.discrepancyNote && (
              <div className={styles.discrepancyBanner}>
                <TriangleAlert size={14} strokeWidth={2} className={styles.warningIcon} />
                <span className="ds-body-sm">{kase.discrepancyNote}</span>
              </div>
            )}
          </div>

          <div className={styles.explainability}>
            <span className="ds-body-sm-medium">Версия модели: {kase.modelVersion}</span>
            <ul className={styles.explainabilityList}>
              {kase.explainability.map((point) => (
                <li key={point} className="ds-body-sm">{point}</li>
              ))}
            </ul>
            <span className={`${styles.explainabilityNote} ds-body-xs`}>Полный список правил — в разделе ниже</span>
          </div>

          <div className={styles.disclosure}>
            {sections.map((section) => (
              <div key={section.key}>
                <AccordionRow label={section.label} onClick={() => toggleSection(section.key)} />
                {expanded.has(section.key) && (
                  <div className={styles.sectionContent}>
                    {section.content.map((line) => (
                      <p key={line} className={`${styles.sectionLine} ds-body-sm`}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.decisionPanel}>
        {isRejected ? (
          <>
            <span className={`${styles.mutedLine} ds-body-sm`}>
              Кейс отклонён {kase.decision?.date}. Дальнейшие действия недоступны.
            </span>
            <Button type="ghost" size="md" onClick={() => navigate(`/screens/case-history/${kase.id}`)}>
              Просмотреть полную историю решения
            </Button>
          </>
        ) : isApproved ? (
          <>
            <span className={`${styles.mutedLine} ds-body-sm`}>
              Кейс одобрен {kase.decision?.date} {kase.decision?.by}.
            </span>
            <Button type="ghost" size="md" onClick={() => navigate(`/screens/case-history/${kase.id}`)}>
              Просмотреть полную историю решения
            </Button>
          </>
        ) : isEscalated ? (
          <>
            <Button type="primary" size="md" disabled={!canConfirm} onClick={handleApprove}>
              Подтвердить решение
            </Button>
            <Button type="secondary" size="md" onClick={handleReject}>
              Отклонить
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" size="md" disabled={!canConfirm} onClick={handleApprove}>
              Подтвердить решение
            </Button>
            <Button type="secondary" size="md" onClick={handleEscalate}>
              Эскалировать на подтверждение
            </Button>
            <Button type="secondary" size="md" onClick={handleReject}>
              Отклонить
            </Button>
          </>
        )}
      </div>
    </AppShell>
  )
}
