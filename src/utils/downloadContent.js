export function getContentFileName(fileUrl, titleEn, fileType, slug) {
  const fromUrl = fileUrl?.split('/').pop()?.split('?')[0]
  if (fromUrl) return decodeURIComponent(fromUrl)
  const ext = fileType === 'pdf' ? 'pdf' : 'mp3'
  return `${slug || titleEn || 'download'}.${ext}`
}

export function fileKeyFromUrl(fileUrl) {
  if (!fileUrl) return null
  try {
    const { pathname } = new URL(fileUrl)
    return decodeURIComponent(pathname.replace(/^\//, ''))
  } catch {
    return null
  }
}

function buildDownloadApiUrl(fileUrl, fileName) {
  const key = fileKeyFromUrl(fileUrl)
  if (!key) return null

  const params = new URLSearchParams({ key })
  if (fileName) params.set('name', fileName)
  return `/api/download?${params.toString()}`
}

function triggerBrowserDownload(href) {
  const link = document.createElement('a')
  link.href = href
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export async function downloadContentFile({ fileUrl, titleEn, fileType, slug }) {
  const fileName = getContentFileName(fileUrl, titleEn, fileType, slug)
  const downloadUrl = buildDownloadApiUrl(fileUrl, fileName)

  if (!downloadUrl) {
    throw new Error('Could not build download URL')
  }

  triggerBrowserDownload(downloadUrl)
}
