import styles from './BrandMark.module.css'

export interface BrandMarkProps {
  /** Размер знака в px */
  size?: number
  /** Показывать название рядом со знаком */
  withWordmark?: boolean
}

/** Знак «Слои»: три слоя — KYC, AML и санкционный скрининг, сложенные в одну платформу */
export function BrandMark({ size = 28, withWordmark = true }: BrandMarkProps) {
  return (
    <span className={styles.brand}>
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className={styles.mark}>
        <path className={styles.layer3} d="M4 23L20 31L36 23V27L20 35L4 27Z" />
        <path className={styles.layer2} d="M4 15.5L20 23.5L36 15.5V19.5L20 27.5L4 19.5Z" />
        <path className={styles.layer1} d="M20 4L36 12L20 20L4 12Z" />
      </svg>
      {withWordmark && <span className={styles.wordmark}>Compliance Platform</span>}
    </span>
  )
}
