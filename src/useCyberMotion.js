import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useCyberMotion() {
  const root = useRef(null)

  useEffect(() => {
    const container = root.current
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy, .holo-panel', { y: 24, opacity: 0, stagger: .08, duration: .75, ease: 'power3.out', clearProps: 'transform,opacity' })
      for (const section of container.querySelectorAll('[data-reveal]')) {
        gsap.from(section.querySelectorAll('.section-heading, .reveal-item'), {
          y: 22,
          opacity: .68,
          duration: .6,
          stagger: .065,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 87%', once: true },
          clearProps: 'transform,opacity',
        })
      }
    }, container)
    media.add('(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 900px)', () => {
      const hero = container.querySelector('.hero')
      const frame = hero.querySelector('.hero-frame')
      const deck = hero.querySelector('.holo-deck')
      const frameX = gsap.quickTo(frame, 'x', { duration: .65, ease: 'power3.out' })
      const frameY = gsap.quickTo(frame, 'y', { duration: .65, ease: 'power3.out' })
      const deckX = gsap.quickTo(deck, 'x', { duration: .65, ease: 'power3.out' })
      const deckY = gsap.quickTo(deck, 'y', { duration: .65, ease: 'power3.out' })
      function move(event) {
        const bounds = hero.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - .5
        const y = (event.clientY - bounds.top) / bounds.height - .5
        frameX(x * -18)
        frameY(y * -12)
        deckX(x * 26)
        deckY(y * 16)
      }
      function reset() { frameX(0); frameY(0); deckX(0); deckY(0) }
      hero.addEventListener('pointermove', move)
      hero.addEventListener('pointerleave', reset)
      return () => {
        hero.removeEventListener('pointermove', move)
        hero.removeEventListener('pointerleave', reset)
      }
    }, container)
    return () => media.revert()
  }, [])

  return root
}
