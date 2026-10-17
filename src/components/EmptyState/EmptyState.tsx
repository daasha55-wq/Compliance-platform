import type { ReactNode } from 'react'
import styles from './EmptyState.module.css'

export type EmptyStateVariant = 'queue-empty' | 'filter-empty' | 'confirm-empty' | 'not-found'

export interface EmptyStateProps {
  variant: EmptyStateVariant
  title: string
  description?: string
  /** Действие под текстом, например кнопка «Сбросить фильтры» */
  action?: ReactNode
}

/*
 * Общий приём иллюстраций «Слои»: серая платформа внизу и пунктирное место,
 * где мог бы лежать кейс. Синий предмет сверху объясняет, почему здесь пусто.
 */
const art: Record<EmptyStateVariant, ReactNode> = {
  'queue-empty': (
    <>
      <path className={styles.base} d="M120 150L210 105L120 60L30 105Z" />
      <path className={styles.slot} d="M120 130L170 105L120 80L70 105Z" />
      <path className={styles.strong} d="M70 52L120 77L170 52V59L120 84L70 59Z" />
      <path className={styles.primary} d="M120 27L170 52L120 77L70 52Z" />
      <path className={styles.check} d="M106 52l10 6 18-11" />
      <circle className={styles.soft} cx="48" cy="40" r="4" />
      <circle className={styles.soft} cx="196" cy="30" r="3" />
      <circle className={styles.tint} cx="204" cy="68" r="5" />
    </>
  ),
  'filter-empty': (
    <>
      <path className={styles.base} d="M120 150L210 105L120 60L30 105Z" />
      <path className={styles.slot} d="M120 130L170 105L120 80L70 105Z" />
      <path className={styles.drip} d="M120 98V112" />
      <path className={styles.primary} d="M74 38L114 84V96H126V84L166 38Z" />
      <ellipse className={styles.soft} cx="120" cy="38" rx="46" ry="18" />
      <ellipse className={styles.strong} cx="120" cy="40" rx="32" ry="11" />
      <path className={styles.tint} d="M84 14L96 20L84 26L72 20Z" />
      <path className={styles.soft} d="M156 6L166 11L156 16L146 11Z" />
      <circle className={styles.tint} cx="204" cy="56" r="5" />
    </>
  ),
  'confirm-empty': (
    <>
      <path className={styles.base} d="M120 150L210 105L120 60L30 105Z" />
      <path className={styles.soft} d="M80 105L120 125L160 105V111L120 131L80 111Z" />
      <path className={styles.tint} d="M120 85L160 105L120 125L80 105Z" />
      <path className={styles.strong} d="M70 46L120 71L170 46V53L120 78L70 53Z" />
      <path className={styles.primary} d="M120 21L170 46L120 71L70 46Z" />
      <path className={styles.check} d="M93 45l7 5 12-8M109 49l7 5 20-13" />
      <circle className={styles.soft} cx="44" cy="58" r="4" />
      <circle className={styles.tint} cx="200" cy="26" r="5" />
    </>
  ),
  'not-found': (
    <>
      <path className={styles.base} d="M120 150L210 105L120 60L30 105Z" />
      <path className={styles.slot} d="M120 130L170 105L120 80L70 105Z" />
      <path className={styles.handle} d="M131 75L152 96" />
      <circle className={styles.lens} cx="112" cy="54" r="25" />
      <path className={styles.ghost} d="M112 45L126 52L112 59L98 52Z" />
      <circle className={styles.soft} cx="52" cy="44" r="4" />
      <circle className={styles.tint} cx="196" cy="40" r="5" />
    </>
  ),
}

export function EmptyState({ variant, title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.plate}>
      <svg className={styles.art} viewBox="0 0 240 160" aria-hidden="true">
        {art[variant]}
      </svg>
      <h2 className={`${styles.title} ds-heading-lg`}>{title}</h2>
      {description && <p className={`${styles.description} ds-body-sm`}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
