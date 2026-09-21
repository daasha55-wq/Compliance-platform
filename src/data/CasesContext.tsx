import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { seedCases, currentUser, type CaseRecord } from './cases'

function nowStamp() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

interface CasesContextValue {
  cases: CaseRecord[]
  getCase: (id: string) => CaseRecord | undefined
  approve: (id: string) => void
  escalate: (id: string, note: string) => void
  reject: (id: string, reason: string) => void
}

const CasesContext = createContext<CasesContextValue | null>(null)

export function CasesProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<CaseRecord[]>(seedCases)

  const getCase = useCallback((id: string) => cases.find((c) => c.id === id), [cases])

  const update = useCallback((id: string, updater: (c: CaseRecord) => CaseRecord) => {
    setCases((prev) => prev.map((c) => (c.id === id ? updater(c) : c)))
  }, [])

  const approve = useCallback(
    (id: string) => {
      const stamp = nowStamp()
      update(id, (c) => ({
        ...c,
        stage: 'approved',
        statusLabel: 'Одобрено',
        statusVariant: 'success',
        decision: { type: 'approved', by: currentUser, date: stamp },
        history: [`${stamp} — Кейс одобрен ${currentUser}`, ...c.history],
      }))
    },
    [update],
  )

  const escalate = useCallback(
    (id: string, note: string) => {
      const stamp = nowStamp()
      update(id, (c) => ({
        ...c,
        stage: 'escalated',
        statusLabel: 'Ожидает подтверждения',
        statusVariant: 'info',
        escalation: { escalatedBy: currentUser, note, date: stamp, waitingTime: '0ч' },
        history: [`${stamp} — Эскалирован на подтверждение ${currentUser}: «${note}»`, ...c.history],
      }))
    },
    [update],
  )

  const reject = useCallback(
    (id: string, reason: string) => {
      const stamp = nowStamp()
      update(id, (c) => ({
        ...c,
        stage: 'rejected',
        statusLabel: 'Отклонён',
        statusVariant: 'error',
        decision: { type: 'rejected', by: currentUser, date: stamp, reason },
        history: [`${stamp} — Кейс отклонён ${currentUser}`, ...c.history],
      }))
    },
    [update],
  )

  const value = useMemo(() => ({ cases, getCase, approve, escalate, reject }), [cases, getCase, approve, escalate, reject])

  return <CasesContext.Provider value={value}>{children}</CasesContext.Provider>
}

export function useCases() {
  const ctx = useContext(CasesContext)
  if (!ctx) throw new Error('useCases must be used within CasesProvider')
  return ctx
}
