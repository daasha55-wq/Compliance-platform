import styles from './Navbar.module.css'

export interface NavbarProps {
  links?: string[]
}

export function Navbar({ links = ['Case Queue', 'Confirmations', 'Account Settings'] }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo} />
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link} className={styles.link}>
              {link}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.avatarSlot} />
    </nav>
  )
}
