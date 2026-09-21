import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserRoundArrowLeft } from 'lucide-react'
import { Breadcrumb } from '../../components'
import styles from './AppShell.module.css'

export interface AppShellProps {
  /** Иконка/плейсхолдер в слоте логотипа (левый край Header) */
  logo: ReactNode
  /** Плоский заголовок Header (взаимоисключим с breadcrumb) */
  title?: string
  /** Хлебные крошки в Header вместо заголовка (CaseDetail/CaseHistory/CaseDetailRejected) */
  breadcrumb?: string[]
  /** Доп. контент перед аватаром справа (например, подпись роли на ConfirmationQueue) */
  headerRight?: ReactNode
  /** Какой пункт Sidebar подсвечен активным */
  activeNav: 'case-queue' | 'confirmations'
  children: ReactNode
}

export function AppShell({ logo, title, breadcrumb, headerRight, activeNav, children }: AppShellProps) {
  const location = useLocation()

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logoSlot}>{logo}</span>
          {breadcrumb ? <Breadcrumb segments={breadcrumb} /> : <h1 className={`${styles.title} ds-heading-lg`}>{title}</h1>}
        </div>
        <div className={styles.headerRight}>
          {headerRight}
          <span className={styles.avatarSlot}>
            <UserRoundArrowLeft size={24} strokeWidth={2} />
          </span>
        </div>
      </header>

      <div className={styles.body}>
        <nav className={styles.sidebar}>
          <Link
            to="/screens/case-queue"
            className={[styles.navItem, activeNav === 'case-queue' ? styles.navItemActive : ''].join(' ')}
          >
            Case Queue
          </Link>
          <Link
            to="/screens/confirmation-queue"
            className={[styles.navItem, activeNav === 'confirmations' ? styles.navItemActive : ''].join(' ')}
          >
            Confirmations
          </Link>
          <span className={styles.navItem}>Account Settings</span>
        </nav>

        <main className={styles.main} key={location.pathname}>
          {children}
        </main>
      </div>
    </div>
  )
}
