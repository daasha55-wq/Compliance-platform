import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { isDemo } from '../demo/isDemo'

gsap.registerPlugin(useGSAP)

/**
 * Restrained fade+rise entrance for a screen's main content area.
 * Re-plays whenever `watch` changes (e.g. route pathname), and is skipped
 * (opacity/position set instantly) when the user prefers reduced motion.
 */
export function usePageEnter<T extends HTMLElement>(watch: unknown) {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // в демо для портфолио экраны меняются ровно, без въезда — двигается только то, что нажали
      if (reduceMotion || isDemo) {
        gsap.set(ref.current, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(ref.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' })
    },
    { scope: ref, dependencies: [watch] },
  )

  return ref
}
