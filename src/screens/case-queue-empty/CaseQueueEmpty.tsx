import { EmptyState } from '../../components'
import { AppShell } from '../_shared/AppShell'
import styles from './CaseQueueEmpty.module.css'

export default function CaseQueueEmpty() {
  return (
    <AppShell title="Очередь кейсов" subtitle="KYC/AML-кейсы по риск-тиру и SLA. Low-риск закрывается автоматически." activeNav="case-queue">
      <section className={styles.card}>
        <EmptyState
          variant="queue-empty"
          title="Очередь пуста"
          description="Новые кейсы появятся здесь по мере поступления заявок"
        />
      </section>
    </AppShell>
  )
}
