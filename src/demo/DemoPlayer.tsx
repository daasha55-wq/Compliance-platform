import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { isDemo, DEMO_RESET_EVENT } from './isDemo'

/**
 * Демо-режим (?demo в адресе): курсор сам проходит главный флоу на настоящих экранах —
 * очередь → карточка кейса → открыть детали → «Подтвердить» → тост и новый статус в очереди.
 * Нужен для встраивания в портфолио (окно 1440×1000, без прокрутки); в обычном прототипе не монтируется.
 * Экраны меняются ровно, без въезда и лесенки строк — двигаются только курсор и то, что он нажал.
 */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Самый глубокий элемент, чей текст совпадает с `text` */
function byText(text: string, root: ParentNode = document): HTMLElement | null {
  const all = Array.from(root.querySelectorAll<HTMLElement>('body *')).filter(
    (el) => el.childElementCount === 0 && el.textContent?.trim() === text,
  )
  return all[0] ?? null
}

async function waitFor<T>(fn: () => T | null | undefined, timeout = 4000): Promise<T> {
  const start = performance.now()
  for (;;) {
    const v = fn()
    if (v) return v
    if (performance.now() - start > timeout) throw new Error('demo: element not found')
    await wait(60)
  }
}

function makeCursor() {
  const el = document.createElement('div')
  el.setAttribute('aria-hidden', 'true')
  el.style.cssText = 'position:fixed;left:0;top:0;z-index:9999;pointer-events:none;will-change:transform'
  el.innerHTML = `
    <span data-ring style="position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;background:rgba(37,99,235,.28);transform:scale(0);opacity:0"></span>
    <svg width="22" height="26" viewBox="0 0 22 26" style="display:block;filter:drop-shadow(0 2px 4px rgba(15,23,42,.35))">
      <path d="M2 2l7.2 20.5 3.1-8.4 8.4-3.1L2 2z" fill="#0F172A" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
    </svg>`
  document.body.appendChild(el)
  return el
}

const DEMO_CSS = `
  html, body { cursor: none !important; }
  main { overflow: hidden !important; }
  /* строки очереди стоят на месте, без лесенки появления */
  [class*="rowButton"] { animation: none !important; opacity: 1 !important; transform: none !important; }
  [data-demo-hover] > div { background: var(--surface-subtle) !important; }
  button[data-demo-hover] { filter: brightness(0.97); }
  #root { transition: opacity .45s ease; }
`

const START = { x: 0.6, y: 0.32 }

export function DemoPlayer() {
  // navigate меняется при каждом переходе — через ref, иначе эффект перезапускал бы сценарий на середине
  const navigate = useNavigate()
  const navigateRef = useRef(navigate)
  useEffect(() => {
    navigateRef.current = navigate
  }, [navigate])

  useEffect(() => {
    if (!isDemo) return
    const style = document.createElement('style')
    style.textContent = DEMO_CSS
    document.head.appendChild(style)
    const cursor = makeCursor()
    const ring = cursor.querySelector<HTMLElement>('[data-ring]')!
    const root = document.getElementById('root')!
    gsap.set(cursor, { x: window.innerWidth * START.x, y: window.innerHeight * START.y })
    let alive = true
    let hovered: HTMLElement | null = null

    // каждая пауза — точка остановки: после размонтирования сценарий не кликает дальше
    const pause = async (ms: number) => {
      await wait(ms)
      if (!alive) throw new Error('demo: stopped')
    }

    const hover = (el: HTMLElement | null) => {
      hovered?.removeAttribute('data-demo-hover')
      hovered = el
      el?.setAttribute('data-demo-hover', '')
    }

    const glide = async (x: number, y: number, duration: number) => {
      if (reduced()) {
        gsap.set(cursor, { x, y })
        return
      }
      await gsap.to(cursor, { x, y, duration, ease: 'power2.inOut' })
    }

    const moveTo = (el: HTMLElement, dx = 0, dy = 0, duration = 0.9) => {
      const r = el.getBoundingClientRect()
      return glide(r.left + r.width / 2 + dx, r.top + r.height / 2 + dy, duration)
    }

    const click = async (el: HTMLElement) => {
      if (!reduced()) {
        gsap.fromTo(ring, { scale: 0.3, opacity: 1 }, { scale: 1.6, opacity: 0, duration: 0.5, ease: 'power2.out' })
        await gsap.to(cursor.querySelector('svg'), { scale: 0.86, duration: 0.09, yoyo: true, repeat: 1, transformOrigin: '2px 2px' })
      }
      el.click()
    }

    const loop = async () => {
      for (;;) {
        await pause(1200)

        // 1 · очередь: кейс с расхождением источников, открываем
        const row = await waitFor(() => byText('Ксения Воробьёва')?.closest('button') as HTMLElement | null)
        await moveTo(byText('Ксения Воробьёва', row)!, 20, 0, 1.1)
        hover(row)
        await pause(450)
        await click(row)
        hover(null)

        // 2 · карточка: «Подтвердить» заблокирована, пока не открыты детали
        const confirm = await waitFor(() => byText('Подтвердить решение')?.closest('button') as HTMLElement | null)
        await pause(700)
        await moveTo(confirm, 30, 0, 1)
        await pause(1100)

        // 3 · открываем раздел деталей — подсказка меняется, кнопка оживает
        const section = await waitFor(() => byText('AML / санкции / PEP-скрининг')?.closest('button') as HTMLElement | null)
        await moveTo(section, -160, 0, 1.1)
        hover(section)
        await pause(350)
        await click(section)
        hover(null)
        await pause(1300)

        // 4 · подтверждаем
        await moveTo(confirm, 10, 0, 1)
        hover(confirm)
        await pause(450)
        await click(confirm)
        hover(null)

        // 5 · обратно в очереди: тост и новый статус в строке
        const row2 = await waitFor(() => byText('Ксения Воробьёва')?.closest('button') as HTMLElement | null)
        await pause(400)
        await moveTo(byText('Одобрено', row2) ?? row2, 0, 18, 1)
        hover(row2)
        await pause(3400)

        // новый круг: мягко растворяем, возвращаем данные, курсор на старт
        hover(null)
        root.style.opacity = '0'
        await pause(500)
        window.dispatchEvent(new Event(DEMO_RESET_EVENT))
        navigateRef.current('/screens/case-queue?demo', { replace: true })
        gsap.set(cursor, { x: window.innerWidth * START.x, y: window.innerHeight * START.y })
        await pause(150)
        root.style.opacity = '1'
      }
    }

    loop().catch(async (err) => {
      if (!alive) return
      // что-то не нашлось (например, другой размер окна) — начать сначала с чистого листа
      console.warn('[demo]', err)
      await wait(1500)
      if (alive) window.location.replace('/screens/case-queue?demo')
    })

    return () => {
      alive = false
      hover(null)
      cursor.remove()
      style.remove()
      root.style.opacity = ''
    }
  }, [])

  return null
}
