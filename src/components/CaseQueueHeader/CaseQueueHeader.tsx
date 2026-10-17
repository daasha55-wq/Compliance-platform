import styles from './CaseQueueHeader.module.css'

const columns = ['Кейс', 'Тир', 'Заявитель', 'Статус', 'SLA', 'Дата', 'Расхождение']

export function CaseQueueHeader() {
  return (
    <div className={styles.header}>
      {columns.map((label) => (
        <div key={label} className={styles.cell}>
          {label}
        </div>
      ))}
    </div>
  )
}
