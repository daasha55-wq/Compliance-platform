import { Inbox } from 'lucide-react'
import { AppShell } from '../_shared/AppShell'
import styles from './CaseQueueEmpty.module.css'

export default function CaseQueueEmpty() {
  return (
    <AppShell logo={<span className={styles.logoPlaceholder} />} title="Очередь кейсов" activeNav="case-queue">
      <div className={styles.filterBar}>
        <span className="ds-body-sm-medium">Тир: Все / Low / Medium / High</span>
        <span className="ds-body-sm-medium">0 кейсов в очереди</span>
      </div>

      <div className={styles.emptyPlate}>
        <Inbox size={100} strokeWidth={2} className={styles.emptyIcon} />
        <h2 className={`${styles.emptyTitle} ds-heading-lg`}>Очередь пуста</h2>
        <p className={`${styles.emptySubtitle} ds-body-sm`}>Новые кейсы появятся здесь по мере поступления заявок</p>
      </div>
    </AppShell>
  )
}
