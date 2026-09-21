import styles from './Breadcrumb.module.css'

export interface BreadcrumbProps {
  segments: string[]
}

export function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <div className={styles.breadcrumb}>
      {segments.map((segment, i) => {
        const isCurrent = i === segments.length - 1
        return (
          <span key={segment}>
            {i > 0 && <span className={styles.separator}> / </span>}
            <span className={isCurrent ? styles.current : styles.segment}>{segment}</span>
          </span>
        )
      })}
    </div>
  )
}
