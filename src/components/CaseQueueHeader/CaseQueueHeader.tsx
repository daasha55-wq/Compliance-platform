import styles from './CaseQueueHeader.module.css'

const columns = ['Тир', 'Заявитель', 'Статус', 'SLA', 'Дата', 'Расхождение']
const colClasses = [styles.col0, styles.col1, styles.col2, styles.col3, styles.col4, styles.col5]

export function CaseQueueHeader() {
  return (
    <div className={styles.header}>
      {columns.map((label, i) => (
        <div key={label} className={[styles.cell, colClasses[i]].join(' ')}>
          {label}
        </div>
      ))}
    </div>
  )
}
