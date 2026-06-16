function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
  })
}

export function waitForAppReady(minDisplayMs = 700) {
  const startedAt = Date.now()

  const pageReady = new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve()
      return
    }
    window.addEventListener('load', () => resolve(), { once: true })
  })

  const assetsReady = Promise.all([
    preloadImage('/assets/logo.png'),
    preloadImage('/assets/inner-banner.png'),
  ])

  return Promise.all([pageReady, assetsReady]).then(() => {
    const elapsed = Date.now() - startedAt
    const remaining = Math.max(0, minDisplayMs - elapsed)
    return new Promise((resolve) => window.setTimeout(resolve, remaining))
  })
}

export function removeInitialHtmlLoader() {
  document.getElementById('initial-loader')?.remove()
}
