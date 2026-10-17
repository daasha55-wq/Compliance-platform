import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircleCheck, Info, TriangleAlert } from 'lucide-react'
import { RiskIndicator, Badge, Tabs, AccordionRow, Button, EmptyState } from '../../components'
import { AppShell } from '../_shared/AppShell'
import { useCases } from '../../data/CasesContext'
import { useToast } from '../../data/ToastContext'
import styles from './CaseDetail.module.css'

const DEFAULT_CASE_ID = '4821'
const ESCALATE_NOTE = 'Требуется второе мнение'
const REJECT_REASON = 'Решение принято по итогам проверки'

/** «24.08.2026, 09:20 — текст» → время и текст отдельно */
function splitEntry(entry: string) {
  const i = entry.indexOf(' — ')
  return i === -1 ? { time: '', text: entry } : { time: entry.slice(0, i), text: entry.slice(i + 3) }
}

export default function CaseDetail() {
  const { caseId = DEFAULT_CASE_ID } = useParams()
  const { getCase, approve, escalate, reject } = useCases()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const kase = getCase(caseId)

  if (!kase) {
    return (
      <AppShell breadcrumb={['Очередь кейсов', 'Кейс не найден']} activeNav="case-queue">
        <section className={styles.card}>
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
        </section>
      </AppShell>
    )
  }

  const isRejected = kase.stage === 'rejected'
  const isApproved = kase.stage === 'approved'
  const isEscalated = kase.stage === 'escalated'
  const isOpen = kase.stage === 'open'
  const canConfirm = expanded.size > 0

  const sections: { key: string; label: string; content: string[] }[] = [
    { key: 'aml', label: 'AML / санкции / PEP-скрининг', content: kase.explainability },
    { key: 'docs', label: 'Документы', content: kase.documents },
    ...(isRejected ? [{ key: 'history', label: 'История кейса (аудит-лог)', content: kase.history }] : []),
    { key: 'rules', label: 'Полный список правил', content: kase.rules },
  ]

  const facts = [
    { label: 'Дата рождения', value: kase.dob },
    { label: 'Юрисдикция', value: kase.jurisdiction },
    { label: 'Верификация', value: kase.verification },
    { label: 'Поступил', value: kase.date },
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

  const openHistory = () => navigate(`/screens/case-history/${kase.id}`)

  return (
    <AppShell breadcrumb={['Очередь кейсов', `Кейс #${kase.id} — ${kase.applicant}`]} activeNav="case-queue">
      {!isRejected && (
        <Tabs
          firstLabel="Сводка"
          secondLabel="История"
          active="first"
          size="md"
          onChange={(tab) => {
            if (tab === 'second') openHistory()
          }}
        />
      )}

      <div className={styles.layout}>
        <div className={styles.column}>
          <section className={styles.card}>
            <div className={styles.tierStatusRow}>
              <RiskIndicator tier={kase.tier}>{kase.tierLabel}</RiskIndicator>
              <Badge variant={kase.statusVariant} size="md">{kase.statusLabel}</Badge>
              <span className={`${styles.caseId} ds-body-sm`}>#{kase.id}</span>
            </div>
            <h1 className={`${styles.applicant} ds-heading-2xl`}>{kase.applicant}</h1>
            <dl className={styles.facts}>
              {facts.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt className="ds-body-xs">{f.label}</dt>
                  <dd className="ds-body-sm-medium">{f.value}</dd>
                </div>
              ))}
            </dl>

            {isRejected && kase.decision && (
              <div className={[styles.banner, styles.bannerError].join(' ')}>
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
          </section>

          {kase.sources && (
            <section className={styles.card}>
              <div className={styles.cardHead}>
                <TriangleAlert size={16} strokeWidth={2} className={styles.warningIcon} aria-hidden="true" />
                <h2 className={`${styles.cardTitle} ds-body-base`}>Источники расходятся</h2>
              </div>
              <div className={styles.sources}>
                {kase.sources.map((s) => (
                  <div key={s.source} className={[styles.source, s.flagged ? styles.sourceFlagged : ''].join(' ')}>
                    <span className={`${styles.sourceName} ds-body-xs`}>{s.source}</span>
                    <span className="ds-body-sm-medium">{s.finding}</span>
                  </div>
                ))}
              </div>
              <p className={`${styles.mutedLine} ds-body-xs`}>Скор не усредняется: сверьте оба источника и примите решение сами.</p>
            </section>
          )}

          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={`${styles.cardTitle} ds-body-base`}>Почему {kase.tierLabel.replace(' risk', '')} risk</h2>
              <span className={`${styles.chip} ds-body-xs`}>{kase.modelVersion}</span>
            </div>
            <ul className={styles.factors}>
              {kase.explainability.map((point) => (
                <li key={point} className="ds-body-sm">{point}</li>
              ))}
            </ul>
            <span className={`${styles.mutedLine} ds-body-xs`}>Версия модели и входные данные записываются в аудит-лог вместе с решением</span>
          </section>

          <section className={styles.card}>
            <h2 className={`${styles.cardTitle} ds-body-base`}>Детали</h2>
            <div className={styles.disclosure}>
              {sections.map((section) => (
                <AccordionRow
                  key={section.key}
                  label={section.label}
                  expanded={expanded.has(section.key)}
                  onClick={() => toggleSection(section.key)}
                >
                  <div className={styles.sectionContent}>
                    {section.content.map((line) => (
                      <p key={line} className={`${styles.sectionLine} ds-body-sm`}>{line}</p>
                    ))}
                  </div>
                </AccordionRow>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.aside}>
          <section className={styles.card}>
            <h2 className={`${styles.cardTitle} ds-body-base`}>Решение</h2>

            {isRejected || isApproved ? (
              <>
                <span className={`${styles.mutedLine} ds-body-sm`}>
                  {isRejected
                    ? `Кейс отклонён ${kase.decision?.date ?? ''}. Дальнейшие действия недоступны.`
                    : `Кейс одобрен ${kase.decision?.date ?? ''} — ${kase.decision?.by ?? ''}.`}
                </span>
                <Button type="secondary" size="md" className={styles.fullButton} onClick={openHistory}>
                  Полная история решения
                </Button>
              </>
            ) : (
              <>
                <div className={[styles.hint, canConfirm ? styles.hintReady : ''].join(' ')}>
                  {canConfirm ? (
                    <CircleCheck size={16} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Info size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                  <span className="ds-body-xs">
                    {canConfirm
                      ? 'Детали просмотрены — решение можно подтвердить'
                      : 'Откройте хотя бы один раздел деталей, чтобы подтвердить решение'}
                  </span>
                </div>
                <Button type="primary" size="md" className={styles.fullButton} disabled={!canConfirm} onClick={handleApprove}>
                  Подтвердить решение
                </Button>
                {isOpen && (
                  <Button type="secondary" size="md" className={styles.fullButton} onClick={handleEscalate}>
                    Эскалировать на подтверждение
                  </Button>
                )}
                <Button type="danger" size="md" className={styles.fullButton} onClick={handleReject}>
                  Отклонить
                </Button>
                {isOpen && (
                  <span className={`${styles.mutedLine} ds-body-xs`}>
                    Кейс уйдёт старшему офицеру — заполнять ничего не нужно
                  </span>
                )}
                {isEscalated && (
                  <span className={`${styles.mutedLine} ds-body-xs`}>Решение по эскалации фиксируется с вашим именем</span>
                )}
              </>
            )}
          </section>

          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={`${styles.cardTitle} ds-body-base`}>Аудит-лог</h2>
              <button type="button" className={`${styles.linkButton} ds-body-xs`} onClick={openHistory}>
                Вся история
              </button>
            </div>
            <ol className={styles.timeline}>
              {kase.history.slice(0, 3).map((entry) => {
                const { time, text } = splitEntry(entry)
                return (
                  <li key={entry} className={styles.timelineItem}>
                    <span className={`${styles.mutedLine} ds-body-xs`}>{time}</span>
                    <span className="ds-body-xs">{text}</span>
                  </li>
                )
              })}
            </ol>
          </section>
        </aside>
      </div>
    </AppShell>
  )
}
