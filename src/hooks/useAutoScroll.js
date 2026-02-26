import { useEffect, useRef } from 'react'

/**
 * Attaches a slow auto-scroll loop to a ref'd scrollable container.
 * User can manually scroll at any time; auto-scroll pauses for `resumeDelay`ms
 * after the last interaction, then resumes.
 *
 * @param {number} speed      px per animation frame (default 0.4)
 * @param {number} resumeDelay  ms before auto-scroll resumes after user interaction (default 2000)
 */
const useAutoScroll = (speed = 0.4, resumeDelay = 2000) => {
    const ref = useRef(null)
    const isPaused = useRef(false)
    const timer = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        let animId

        const step = () => {
            if (!isPaused.current) {
                el.scrollLeft += speed
                // Seamless loop: when the first half has scrolled past, reset to start
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0
                }
            }
            animId = requestAnimationFrame(step)
        }

        animId = requestAnimationFrame(step)

        const pause = () => {
            isPaused.current = true
            clearTimeout(timer.current)
            timer.current = setTimeout(() => { isPaused.current = false }, resumeDelay)
        }

        el.addEventListener('pointerdown', pause)
        el.addEventListener('touchstart', pause, { passive: true })
        el.addEventListener('wheel', pause, { passive: true })
        el.addEventListener('scroll', pause, { passive: true })

        return () => {
            cancelAnimationFrame(animId)
            clearTimeout(timer.current)
            el.removeEventListener('pointerdown', pause)
            el.removeEventListener('touchstart', pause)
            el.removeEventListener('wheel', pause)
            el.removeEventListener('scroll', pause)
        }
    }, [speed, resumeDelay])

    return ref
}

export default useAutoScroll
