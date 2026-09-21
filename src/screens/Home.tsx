import { Link } from 'react-router-dom'
import { screens } from './registry'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={`${styles.title} ds-heading-3xl`}>Compliance Platform — экраны</h1>
      <p className={`${styles.subtitle} ds-body-base`}>
        Статичные экраны, собранные из дизайн-системы. Логика и данные — отдельный шаг.
      </p>

      <div className={styles.grid}>
        {screens.map((screen) => (
          <Link key={screen.id} to={screen.route} className={styles.card}>
            <span className={`${styles.cardName} ds-heading-lg`}>{screen.name}</span>
            <span className={`${styles.cardDescription} ds-body-sm`}>{screen.description}</span>
            <span className={`${styles.cardRoute} ds-body-xs`}>{screen.route}</span>
          </Link>
        ))}
      </div>

      <Link to="/showcase" className={`${styles.showcaseLink} ds-body-sm`}>
        DS-витрина (Showcase) →
      </Link>
    </div>
  )
}
