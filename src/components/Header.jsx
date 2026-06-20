import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import { libraryMegaMenu, libraryRoutePrefixes, mainNavItems, mediaMenu, mediaRoutePrefixes } from '../data/headerNav'
import SiteLogo from './SiteLogo'
import styles from './Header.module.css'

function isPathActive(pathname, href) {
  if (href === '/') return pathname === '/'
  const pathOnly = href.split('#')[0]
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`)
}

function isDaswaniGalleryView(pathname, hash) {
  return pathname === '/daswani' && hash === '#gallery'
}

function matchesMenuLink(pathname, hash, href) {
  if (href.includes('#')) {
    const [path, linkHash] = href.split('#')
    return pathname === path && hash === `#${linkHash}`
  }

  if (hash) return false
  return isPathActive(pathname, href)
}

function matchesRoutePrefix(pathname, prefixes) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

function isLibraryActive(pathname, hash = '') {
  if (isDaswaniGalleryView(pathname, hash)) return false
  if (matchesRoutePrefix(pathname, mediaRoutePrefixes)) return false
  return matchesRoutePrefix(pathname, libraryRoutePrefixes)
}

function getTopLevelHrefs() {
  return new Set(mainNavItems.filter((item) => item.type === 'link').map((item) => item.href))
}

function isMediaActive(pathname, hash = '') {
  if (isDaswaniGalleryView(pathname, hash)) return true
  if (matchesRoutePrefix(pathname, mediaRoutePrefixes)) return true

  const topLevelHrefs = getTopLevelHrefs()

  return mediaMenu.links.some(({ href }) => {
    if (topLevelHrefs.has(href.split('#')[0])) return false
    if (matchesRoutePrefix(pathname, libraryRoutePrefixes) && !href.includes('#')) return false
    return matchesMenuLink(pathname, hash, href)
  })
}

function getActiveDropdownLinkId(pathname, hash, links) {
  if (!isMediaActive(pathname, hash)) return null

  const topLevelHrefs = getTopLevelHrefs()

  const match = links.find((link) => {
    if (!matchesMenuLink(pathname, hash, link.href)) return false
    if (topLevelHrefs.has(link.href.split('#')[0])) return false
    return true
  })

  return match?.id ?? null
}

function NavLabel({ labelMr, labelEn, stacked = true }) {
  if (!stacked) {
    return (
      <span className={styles.navLabelInline}>
        <span className={styles.navMr}>{labelMr}</span>
        <span className={styles.navSep}>/</span>
        <span className={styles.navEn}>{labelEn}</span>
      </span>
    )
  }

  return (
    <span className={styles.navLabel}>
      <span className={styles.navMr}>{labelMr}</span>
      <span className={styles.navEn}>{labelEn}</span>
    </span>
  )
}

function Header() {
  const { pathname, hash } = useLocation()
  const headerRef = useRef(null)
  const menuCloseTimer = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)

  const isHome = pathname === '/'
  const isTransparent = isHome && !scrolled

  const closeMenus = useCallback(() => {
    if (menuCloseTimer.current) {
      window.clearTimeout(menuCloseTimer.current)
      menuCloseTimer.current = null
    }
    setMobileOpen(false)
    setOpenMenu(null)
  }, [])

  const openMenuNow = useCallback((menuId) => {
    if (menuCloseTimer.current) {
      window.clearTimeout(menuCloseTimer.current)
      menuCloseTimer.current = null
    }
    setOpenMenu(menuId)
  }, [])

  const scheduleMenuClose = useCallback(() => {
    if (menuCloseTimer.current) {
      window.clearTimeout(menuCloseTimer.current)
    }
    menuCloseTimer.current = window.setTimeout(() => {
      setOpenMenu(null)
      menuCloseTimer.current = null
    }, 120)
  }, [])

  useEffect(() => {
    return () => {
      if (menuCloseTimer.current) {
        window.clearTimeout(menuCloseTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    closeMenus()
  }, [pathname, closeMenus])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeMenus])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const renderMegaMenu = (item) => {
    const isOpen = openMenu === item.id
    const isActive = isLibraryActive(pathname, hash)

    return (
      <li
        key={item.id}
        className={`${styles.navItem} ${styles.hasMenu} ${isOpen ? styles.menuOpen : ''}`}
        onMouseEnter={() => openMenuNow(item.id)}
        onMouseLeave={scheduleMenuClose}
      >
        <button
          type="button"
          className={`${styles.navTrigger} ${isActive ? styles.navTriggerActive : ''}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          title={`${item.labelMr} / ${item.labelEn}`}
          onClick={() => setOpenMenu((c) => (c === item.id ? null : item.id))}
        >
          <NavLabel labelMr={item.labelMr} labelEn={item.labelEn} stacked={false} />
          <FiChevronDown className={styles.chevron} aria-hidden="true" />
          {isActive && <span className={styles.activeLine} aria-hidden="true" />}
        </button>

        <div className={`${styles.megaPanel} ${isOpen ? styles.panelOpen : ''}`}>
          <div className={styles.megaInner}>
            <div className={styles.megaHeader}>
              <div>
                <p className={styles.megaEyebrow}>श्री समर्थ वाङ्मय</p>
                <h3 className={styles.megaTitle}>
                  {item.labelMr} <span>/ {item.labelEn}</span>
                </h3>
              </div>
              <Link to={item.href} className={styles.megaCta} onClick={closeMenus}>
                सर्व पहा / View all
              </Link>
            </div>
            <div className={styles.megaGrid}>
              {item.columns.map((column) => (
                <div key={column.titleEn} className={styles.megaColumn}>
                  <Link to={column.href} className={styles.megaColumnTitle} onClick={closeMenus}>
                    <span>{column.titleMr}</span>
                    <span className={styles.megaColumnTitleEn}>{column.titleEn}</span>
                  </Link>
                  <ul className={styles.megaList}>
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className={`${styles.megaLink} ${
                            isPathActive(pathname, link.href) ? styles.megaLinkActive : ''
                          }`}
                          onClick={closeMenus}
                        >
                          <span className={styles.megaLinkMr}>{link.labelMr}</span>
                          <span className={styles.megaLinkEn}>{link.labelEn}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>
    )
  }

  const renderDropdown = (item) => {
    const isOpen = openMenu === item.id
    const isActive = isMediaActive(pathname, hash)
    const activeLinkId = getActiveDropdownLinkId(pathname, hash, item.links)

    return (
      <li
        key={item.id}
        className={`${styles.navItem} ${styles.hasMenu} ${isOpen ? styles.menuOpen : ''}`}
        onMouseEnter={() => openMenuNow(item.id)}
        onMouseLeave={scheduleMenuClose}
      >
        <button
          type="button"
          className={`${styles.navTrigger} ${isActive || isOpen ? styles.navTriggerActive : ''}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          title={`${item.labelMr} / ${item.labelEn}`}
          onClick={() => setOpenMenu((c) => (c === item.id ? null : item.id))}
        >
          <NavLabel labelMr={item.labelMr} labelEn={item.labelEn} stacked={false} />
          <FiChevronDown className={styles.chevron} aria-hidden="true" />
          {(isActive || isOpen) && <span className={styles.activeLine} aria-hidden="true" />}
        </button>

        <div className={`${styles.dropPanel} ${isOpen ? styles.panelOpen : ''}`}>
          <ul className={styles.dropList}>
            {item.links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.href}
                  className={`${styles.dropLink} ${
                    activeLinkId === link.id ? styles.dropLinkActive : ''
                  }`}
                  onClick={closeMenus}
                >
                  <span className={styles.dropLinkMr}>{link.labelMr}</span>
                  <span className={styles.dropLinkEn}>{link.labelEn}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    )
  }

  const renderNavLink = (item) => {
    const isActive = isPathActive(pathname, item.href)

    return (
      <li key={item.href} className={styles.navItem}>
        <Link
          to={item.href}
          className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          aria-current={isActive ? 'page' : undefined}
          title={`${item.labelMr} / ${item.labelEn}`}
          onClick={closeMenus}
        >
          <NavLabel labelMr={item.labelMr} labelEn={item.labelEn} stacked={false} />
          {isActive && <span className={styles.activeLine} aria-hidden="true" />}
        </Link>
      </li>
    )
  }

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''} ${
        isTransparent ? styles.headerTransparent : ''
      }`}
    >
      <div className={styles.topBar}>
        <div className={styles.topShell}>
          <p className={styles.mantra}>॥ जय जय रघुवीर समर्थ ॥</p>
        </div>
      </div>

      <div className={styles.mainBar}>
        <div className={styles.mainShell}>
          <Link to="/" className={styles.logoLink} onClick={closeMenus}>
            <SiteLogo variant={isTransparent ? 'white' : 'color'} />
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {mainNavItems.map((item) => {
                if (item.type === 'mega') return renderMegaMenu(item)
                if (item.type === 'dropdown') return renderDropdown(item)
                return renderNavLink(item)
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.menuBtn} ${mobileOpen ? styles.menuBtnOpen : ''}`}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileInner}>
          <p className={styles.mobileHeading}>मुख्य मेनू</p>
          <ul className={styles.mobileList}>
            {mainNavItems.map((item) => {
              if (item.type === 'link') {
                const isActive = isPathActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                      onClick={closeMenus}
                    >
                      <NavLabel labelMr={item.labelMr} labelEn={item.labelEn} />
                    </Link>
                  </li>
                )
              }

              const menuId = item.id
              const isOpen = openMenu === menuId
              const isMega = item.type === 'mega'

              return (
                <li key={menuId} className={styles.mobileAccordion}>
                  <button
                    type="button"
                    className={styles.mobileAccordionBtn}
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu((c) => (c === menuId ? null : menuId))}
                  >
                    <NavLabel labelMr={item.labelMr} labelEn={item.labelEn} />
                    <FiChevronDown className={styles.mobileChevron} aria-hidden="true" />
                  </button>
                  <div className={`${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ''}`}>
                    {isMega
                      ? libraryMegaMenu.columns.map((column) => (
                          <div key={column.titleEn} className={styles.mobileGroup}>
                            <Link
                              to={column.href}
                              className={styles.mobileGroupTitle}
                              onClick={closeMenus}
                            >
                              {column.titleMr} / {column.titleEn}
                            </Link>
                            <ul className={styles.mobileSubList}>
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    to={link.href}
                                    className={styles.mobileSubLink}
                                    onClick={closeMenus}
                                  >
                                    {link.labelMr}
                                    <span>{link.labelEn}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      : mediaMenu.links.map((link) => (
                          <Link
                            key={link.id}
                            to={link.href}
                            className={styles.mobileSubLink}
                            onClick={closeMenus}
                          >
                            {link.labelMr}
                            <span>{link.labelEn}</span>
                          </Link>
                        ))}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {mobileOpen && (
        <button
          type="button"
          className={styles.mobileOverlay}
          aria-label="Close menu"
          onClick={closeMenus}
        />
      )}
    </header>
  )
}

export default Header
