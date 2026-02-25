import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash) {
            // After route renders, scroll smoothly to the target section
            const id = hash.replace('#', '')
            const attempt = (tries = 0) => {
                const el = document.getElementById(id)
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else if (tries < 10) {
                    // Retry until the element exists in the DOM (up to ~500ms)
                    setTimeout(() => attempt(tries + 1), 50)
                }
            }
            attempt()
        } else {
            window.scrollTo(0, 0)
        }
    }, [pathname, hash])

    return null
}

export default ScrollToTop
