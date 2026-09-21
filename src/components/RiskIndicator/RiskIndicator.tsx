import styles from './RiskIndicator.module.css'

export type RiskTier = 'high' | 'medium' | 'low'

export interface RiskIndicatorProps {
  tier: RiskTier
  children: string
}

export function RiskIndicator({ tier, children }: RiskIndicatorProps) {
  return (
    <span className={[styles.indicator, styles[tier]].join(' ')}>
      <span className={styles.shape} />
      {children}
    </span>
  )
}
