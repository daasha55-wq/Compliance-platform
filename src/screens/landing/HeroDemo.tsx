import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CircleCheck, Info } from 'lucide-react'
import { AccordionRow, Badge, Button, RiskIndicator } from '../../components'
import styles from './HeroDemo.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Step = 'idle' | 'expanded' | 'approved'

/*
 * Живая карточка кейса в первом экране лендинга.
 * Курсор проигрывает главную механику продукта: «Подтвердить» неактивна,
 * пока офицер не открыл детали, — затем решение уходит в аудит-лог.
 */
export function HeroDemo() {
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)
  const toastRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<Step>('idle')

  useGSAP(
    (_, contextSafe) => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion || !contextSafe) return

      const card = cardRef.current!
      const cursor = cursorRef.current!
      const go = contextSafe((s: Step) => setStep(s))

      // Центр элемента в координатах карточки — считается в момент старта твина,
      // потому что после раскрытия аккордеона кнопка смещается вниз
      const pointAt = (el: HTMLElement | null, axis: 'x' | 'y') => () => {
        if (!el) return 0
        const c = card.getBoundingClientRect()
        const r = el.getBoundingClientRect()
        return axis === 'x' ? r.left - c.left + r.width * 0.35 : r.top - c.top + r.height * 0.55
      }

      // Перспектива: карточка наклонена и выпрямляется по мере прокрутки
      gsap.fromTo(
        card,
        { rotateX: 22, rotateY: -8, scale: 0.94 },
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: stageRef.current, start: 'top 75%', end: 'bottom 35%', scrub: 0.6 },
        },
      )

      gsap.set(cursor, { x: 300, y: 330, opacity: 0 })
      gsap.set(toastRef.current, { yPercent: 40, opacity: 0 })

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, delay: 1.2, defaults: { ease: 'power3.inOut' } })
      tl.call(go, ['idle'])
        .to(cursor, { opacity: 1, duration: 0.3 })
        .to(cursor, { x: pointAt(rowRef.current, 'x'), y: pointAt(rowRef.current, 'y'), duration: 0.9 })
        .to(cursor, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' })
        .call(go, ['expanded'])
        .to({}, { duration: 1.1 })
        .to(cursor, { x: pointAt(confirmRef.current, 'x'), y: pointAt(confirmRef.current, 'y'), duration: 0.9 })
        .to(cursor, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' })
        .call(go, ['approved'])
        .to(toastRef.current, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, '<0.1')
        .to(cursor, { x: '+=40', y: '+=60', opacity: 0, duration: 0.6, ease: 'power2.in' }, '<0.2')
        .to({}, { duration: 1.6 })
        .to(toastRef.current, { yPercent: 40, opacity: 0, duration: 0.35, ease: 'power2.in' })

      // Не крутить сценарий, пока первый экран вне видимости
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      })
    },
    { scope: stageRef },
  )

  const expanded = step !== 'idle'
  const approved = step === 'approved'

  return (
    <div className={styles.stage} ref={stageRef}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.card} ref={cardRef}>
        <div className={styles.top}>
          <RiskIndicator tier="high">High risk</RiskIndicator>
          <Badge variant={approved ? 'success' : 'info'} size="md">
            {approved ? 'Одобрено' : 'Ожидает решения'}
          </Badge>
          <span className={`${styles.caseId} ds-body-xs`}>#4821</span>
        </div>
        <span className={`${styles.applicant} ds-heading-lg`}>Ксения Воробьёва</span>

        <div className={styles.sources}>
          <div className={styles.source}>
            <span className="ds-label-xs">Sumsub</span>
            <span className="ds-body-xs">Совпадений нет</span>
          </div>
          <div className={[styles.source, styles.sourceFlagged].join(' ')}>
            <span className="ds-label-xs">ComplyAdvantage</span>
            <span className="ds-body-xs">PEP-совпадение 82%</span>
          </div>
        </div>

        <div ref={rowRef}>
          <AccordionRow label="AML / санкции / PEP-скрининг" expanded={expanded}>
            <div className={styles.rowBody}>
              <span className="ds-body-xs">R-102 PEP screening — совпадение 82%</span>
              <span className="ds-body-xs">R-118 Страна повышенного риска: Кипр</span>
            </div>
          </AccordionRow>
        </div>

        <div className={[styles.hint, expanded ? styles.hintReady : ''].join(' ')}>
          {expanded ? <CircleCheck size={14} strokeWidth={2} aria-hidden="true" /> : <Info size={14} strokeWidth={2} aria-hidden="true" />}
          <span className="ds-body-xs">
            {expanded ? 'Детали просмотрены — можно подтвердить' : 'Откройте детали, чтобы подтвердить'}
          </span>
        </div>

        <div className={styles.actions}>
          <div ref={confirmRef} className={styles.confirmWrap}>
            <Button type="primary" size="sm" disabled={!expanded} className={styles.confirm} tabIndex={-1}>
              Подтвердить решение
            </Button>
          </div>
          <Button type="secondary" size="sm" tabIndex={-1}>
            Эскалировать
          </Button>
        </div>

        <div className={styles.toast} ref={toastRef} role="presentation">
          <CircleCheck size={16} strokeWidth={2} aria-hidden="true" />
          <span className="ds-body-xs">Кейс #4821 одобрен · записано в аудит-лог</span>
        </div>

        <div className={styles.cursor} ref={cursorRef} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M4 2.5L19 12.2L12.2 13.6L9.1 20.3Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
