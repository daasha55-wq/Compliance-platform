import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyTheme, getInitialTheme } from './foundation/theme'
import { isDemo } from './demo/isDemo'

// Тема ставится до первого рендера, чтобы не мигал светлый экран. Демо для портфолио — всегда светлое
applyTheme(isDemo ? 'light' : getInitialTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
