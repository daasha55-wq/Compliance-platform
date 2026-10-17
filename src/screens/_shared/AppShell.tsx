import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Inbox, UserCheck, Settings, Moon, Sun } from 'lucide-react'
import { Avatar, Breadcrumb, BrandMark, IconButton } from '../../components'
import { useCases } from '../../data/CasesContext'
import { usePageEnter } from '../../foundation/usePageEnter'
import { useTheme } from '../../foundation/theme'
import styles from './AppShell.module.css'

const users = {
  officer: { name: 'Анна Смирнова', initials: 'АС', role: 'Compliance Officer' },
  senior: { name: 'Павел Ковалёв', initials: 'ПК', role: 'Senior Compliance Officer' },
} as const

export interface AppShellProps {
  /** Заголовок страницы в рабочей области (взаимоисключим с breadcrumb) */
  title?: string
  /** Подзаголовок под title */
  subtitle?: string
  /** Хлебные крошки в Header вместо заголовка (CaseDetail/CaseHistory) */
  breadcrumb?: string[]
  /** Какой пункт Sidebar подсвечен активным */
  activeNav: 'case-queue' | 'confirmations'
  /** Под какой ролью открыт экран */
  role?: keyof typeof users
  children: ReactNode
}

export function AppShell({ title, subtitle, breadcrumb, activeNav, role = 'officer', children }: AppShellProps) {
  const location = useLocation()
  const mainRef = usePageEnter<HTMLElement>(location.pathname)
  const { cases } = useCases()
  const { theme, toggle } = useTheme()
  const user = users[role]
  const isDark = theme === 'dark'

  const openCount = cases.filter((c) => c.stage === 'open').length
  const escalatedCount = cases.filter((c) => c.stage === 'escalated').length

  const navItems = [
    { id: 'case-queue', to: '/screens/case-queue', label: 'Очередь кейсов', icon: Inbox, count: openCount },
    { id: 'confirmations', to: '/screens/confirmation-queue', label: 'Подтверждения', icon: UserCheck, count: escalatedCount },
  ] as const

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/screens/case-queue" className={styles.brandLink} aria-label="Compliance Platform — очередь кейсов">
            <BrandMark size={28} />
          </Link>
          {breadcrumb && (
            <>
              <span className={styles.divider} aria-hidden="true" />
              <Breadcrumb segments={breadcrumb} />
            </>
          )}
        </div>
        <div className={styles.user}>
          <IconButton
            type="button"
            onClick={toggle}
            aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
            title={isDark ? 'Светлая тема' : 'Тёмная тема'}
            className={styles.themeToggle}
          >
            {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
          </IconButton>
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.userText}>
            <span className="ds-body-sm-medium">{user.name}</span>
            <span className={`${styles.userRole} ds-body-xs`}>{user.role}</span>
          </div>
          <Avatar initials={user.initials} />
        </div>
      </header>

      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label="Разделы">
          {navItems.map(({ id, to, label, icon: Icon, count }) => {
            const active = activeNav === id
            return (
              <Link
                key={id}
                to={to}
                className={[styles.navItem, active ? styles.navItemActive : ''].join(' ')}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={18} strokeWidth={2} className={styles.navIcon} />
                <span className={styles.navLabel}>{label}</span>
                {count > 0 && <span className={styles.navCount}>{count}</span>}
              </Link>
            )
          })}
          <span className={[styles.navItem, styles.navItemDisabled].join(' ')}>
            <Settings size={18} strokeWidth={2} className={styles.navIcon} />
            <span className={styles.navLabel}>Настройки</span>
          </span>

          <div className={styles.sidebarFooter}>
            <span className={`${styles.footerLabel} ds-label-xs`}>Источники данных</span>
            <span className="ds-body-xs">Sumsub · ComplyAdvantage</span>
            <span className={`${styles.footerMuted} ds-body-xs`}>Модель risk-model v2.3</span>
          </div>
        </nav>

        <main className={styles.main} key={location.pathname} ref={mainRef}>
          {title && (
            <div className={styles.pageHead}>
              <h1 className={`${styles.pageTitle} ds-heading-xl`}>{title}</h1>
              {subtitle && <p className={`${styles.pageSubtitle} ds-body-sm`}>{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
