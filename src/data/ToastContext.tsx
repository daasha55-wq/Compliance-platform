import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { Toast, type ToastVariant } from '../components'
import styles from './ToastContext.module.css'

interface ToastEntry {
  id: number
  variant: ToastVariant
  message: string
}

interface ToastContextValue {
  showToast: (variant: ToastVariant, message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([])
  const nextId = useRef(0)

  const showToast = useCallback((variant: ToastVariant, message: string) => {
    const id = nextId.current++
    setToasts((prev) => [...prev, { id, variant, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.host}>
        {toasts.map((t) => (
          <Toast key={t.id} variant={t.variant}>
            {t.message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
