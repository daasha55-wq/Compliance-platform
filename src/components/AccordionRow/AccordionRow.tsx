import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './AccordionRow.module.css'

gsap.registerPlugin(useGSAP)

export interface AccordionRowProps {
  label: string
  expanded?: boolean
  onClick?: () => void
  children?: ReactNode
}

export function AccordionRow({ label, expanded = false, onClick, children }: AccordionRowProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)

  useGSAP(
    () => {
      if (!bodyRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!mounted.current) {
        gsap.set(bodyRef.current, { height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 })
        mounted.current = true
        return
      }

      if (reduceMotion) {
        gsap.set(bodyRef.current, { height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 })
        return
      }

      gsap.to(bodyRef.current, {
        height: expanded ? 'auto' : 0,
        opacity: expanded ? 1 : 0,
        duration: 0.22,
        ease: 'power2.inOut',
      })
    },
    { dependencies: [expanded], scope: bodyRef },
  )

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.row} onClick={onClick} aria-expanded={expanded}>
        <span className={[styles.chevron, expanded ? styles.chevronOpen : ''].join(' ')}>▸</span>
        <span className={styles.label}>{label}</span>
      </button>
      {children && (
        <div ref={bodyRef} className={styles.body}>
          {children}
        </div>
      )}
    </div>
  )
}
