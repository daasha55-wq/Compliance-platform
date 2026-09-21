import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from '../../components'
import { useToast } from '../../data/ToastContext'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [email, setEmail] = useState('a.smirnova@compliancecorp.ru')
  const [password, setPassword] = useState('••••••••')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Неверный email или пароль')
      return
    }
    setError(null)
    showToast('success', 'Добро пожаловать, Анна')
    navigate('/screens/case-queue')
  }

  return (
    <div className={styles.root}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <span className={`${styles.brand} ds-heading-lg`}>Compliance Platform</span>
        <h1 className={`${styles.heading} ds-heading-lg`}>Вход</h1>

        <label className={styles.field}>
          <Input
            type="email"
            value={email}
            state={error ? 'error' : 'default'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <Input
            type="password"
            value={password}
            state={error ? 'error' : 'default'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <span className={`${styles.error} ds-body-sm`}>{error}</span>}

        <Button type="primary" size="md" className={styles.submit}>
          Войти
        </Button>

        <a href="#" className={`${styles.forgot} ds-body-sm`}>
          Забыли пароль?
        </a>
      </form>
    </div>
  )
}
