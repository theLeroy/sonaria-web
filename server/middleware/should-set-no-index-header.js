export default defineEventHandler((event) => {
  const headers = getRequestHeaders(event)
  const host = headers['host'] // Get the current domain

  if (!host) {
    return
  }
  // Define the domains where you want to set the noindex header
  const blockedDomains = ['cherry.novu.ch', 'novu.run', 'vercel.app', 'staging', 'localhost']

  // Check if the current host matches any of the blocked domains
  const isBlockedDomain = blockedDomains.some(domain => host.includes(domain))

  // Set X-Robots-Tag header if it's a blocked domain
  if (isBlockedDomain) {
    setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
  }
})
