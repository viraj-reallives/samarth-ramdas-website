const SCROLL_DELAY_MS = 80

function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
}

function scrollToMainContent() {
  const content = document.querySelector('main [id$="-content"]')
  content?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
}

/**
 * Scroll to the meaningful page content after navigation.
 * Skips hero/banner images so users land where the data lives.
 */
export function scheduleRouteScroll(pathname, hash, search) {
  const timer = window.setTimeout(() => {
    if (hash) {
      scrollToId(hash.startsWith('#') ? hash.slice(1) : hash)
      return
    }

    if (pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior() })
      return
    }

    if (pathname === '/browse' && search) {
      scrollToId('browse-results')
      return
    }

    scrollToMainContent()
  }, SCROLL_DELAY_MS)

  return () => window.clearTimeout(timer)
}
