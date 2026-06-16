import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { authors } from '../data/authors'
import { languages } from '../data/languages'
import { exploreLinks, toExploreLabel } from '../data/navigation'
import { subjects } from '../data/subjects'
import styles from './Header.module.css'

const topNavItems = exploreLinks.map((item) => ({
  label: toExploreLabel(item),
  href: item.href,
}))

const mainNavItems = [
  {
    id: 'subject',
    label: 'विषय / Subject',
    href: '/subject',
    items: subjects.map(({ slug, titleMr, titleEn }) => ({
      label: `${titleMr} # ${titleEn}`,
      href: `/subject/${slug}`,
    })),
  },
  {
    id: 'author',
    label: 'लेखक / Author',
    href: '/author',
    items: authors.map(({ slug, titleMr, titleEn }) => ({
      label: `${titleMr} # ${titleEn}`,
      href: `/author/${slug}`,
    })),
  },
  {
    id: 'language',
    label: 'भाषा / Language',
    href: '/language',
    items: languages.map(({ slug, titleMr, titleEn }) => ({
      label: `${titleMr} # ${titleEn}`,
      href: `/language/${slug}`,
    })),
  },
  { id: 'ringtones', label: 'रिंगटोन्स / Ringtones', href: '/ringtones' },
  { id: 'daswani', label: 'दासवाणी / Daswani', href: '/daswani' },
]

function isPathActive(pathname, href) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Header() {
  const { pathname } = useLocation()
  const headerRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const closeMenus = useCallback(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [])

  useEffect(() => {
    closeMenus()
  }, [pathname, closeMenus])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
        setOpenDropdown(null)
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

  const toggleDropdown = (id) => {
    setOpenDropdown((current) => (current === id ? null : id))
  }

  const renderNavLink = (href, label, linkClassName, activeClassName, onNavigate) => {
    const isActive = isPathActive(pathname, href)
    return (
      <Link
        to={href}
        className={isActive ? activeClassName : linkClassName}
        aria-current={isActive ? 'page' : undefined}
        onClick={onNavigate}
      >
        {label}
      </Link>
    )
  }

  const renderDropdown = (item, variant) => {
    const isOpen = openDropdown === item.id
    const isActive = isPathActive(pathname, item.href)

    return (
      <li
        key={item.id}
        className={`${styles.dropdownItem} ${isOpen ? styles.dropdownItemOpen : ''}`}
        onMouseEnter={() => variant === 'desktop' && setOpenDropdown(item.id)}
        onMouseLeave={() => variant === 'desktop' && setOpenDropdown(null)}
      >
        <div className={styles.dropdownTrigger}>
          {renderNavLink(
            item.href,
            item.label,
            styles.mainNavLink,
            styles.mainNavLinkActive,
            closeMenus,
          )}
          <button
            type="button"
            className={styles.dropdownToggle}
            aria-expanded={isOpen}
            aria-controls={`nav-dropdown-${item.id}-${variant}`}
            aria-label={`${item.label} submenu`}
            onClick={() => toggleDropdown(item.id)}
          >
            <span className={styles.chevron} aria-hidden="true" />
          </button>
        </div>

        <div
          id={`nav-dropdown-${item.id}-${variant}`}
          className={`${styles.dropdownPanel} ${isOpen ? styles.dropdownPanelOpen : ''}`}
          role="menu"
        >
          <ul className={styles.dropdownList}>
            {item.items.map(({ label, href }) => (
              <li key={href} role="none">
                <Link
                  to={href}
                  className={styles.dropdownLink}
                  role="menuitem"
                  onClick={closeMenus}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {isActive && <span className={styles.activeIndicator} aria-hidden="true" />}
      </li>
    )
  }

  const renderSimpleLink = (item, linkClassName, activeClassName, onNavigate) => {
    const isActive = isPathActive(pathname, item.href)
    return (
      <li key={item.id} className={styles.navItem}>
        {renderNavLink(item.href, item.label, linkClassName, activeClassName, onNavigate)}
        {isActive && <span className={styles.activeIndicator} aria-hidden="true" />}
      </li>
    )
  }

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
    >
      <div className={styles.topBar}>
        <div className={styles.container}>
          <p className={styles.topMantra}>|| जय जय रघुवीर समर्थ ||</p>
          <nav className={styles.topNav} aria-label="Top navigation">
            <ul className={styles.topNavList}>
              {topNavItems.map(({ label, href }) => (
                <li key={href}>
                  {renderNavLink(
                    href,
                    label,
                    styles.topNavLink,
                    styles.topNavLinkActive,
                    closeMenus,
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink} onClick={closeMenus}>
            <img
              src="/assets/logo.png"
              alt="श्री समर्थ रामदास"
              className={styles.logo}
            />
          </Link>

          <button
            type="button"
            className={`${styles.menuButton} ${mobileOpen ? styles.menuButtonOpen : ''}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>

          <nav className={styles.mainNav} aria-label="Main navigation">
            <ul className={styles.mainNavList}>
              {mainNavItems.map((item) =>
                item.items
                  ? renderDropdown(item, 'desktop')
                  : renderSimpleLink(
                      item,
                      styles.mainNavLink,
                      styles.mainNavLinkActive,
                      closeMenus,
                    ),
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileNavInner}>
          <p className={styles.mobileNavHeading}>मुख्य मेनू</p>
          <ul className={styles.mobileNavList}>
            {mainNavItems.map((item) =>
              item.items ? (
                <li key={item.id} className={styles.mobileDropdownItem}>
                  <div className={styles.mobileDropdownHeader}>
                    {renderNavLink(
                      item.href,
                      item.label,
                      styles.mobileNavLink,
                      styles.mobileNavLinkActive,
                      closeMenus,
                    )}
                    <button
                      type="button"
                      className={styles.mobileDropdownToggle}
                      aria-expanded={openDropdown === item.id}
                      onClick={() => toggleDropdown(item.id)}
                    >
                      <span className={styles.chevron} aria-hidden="true" />
                    </button>
                  </div>
                  <ul
                    className={`${styles.mobileSubList} ${
                      openDropdown === item.id ? styles.mobileSubListOpen : ''
                    }`}
                  >
                    {item.items.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          to={href}
                          className={styles.mobileSubLink}
                          onClick={closeMenus}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.id}>
                  {renderNavLink(
                    item.href,
                    item.label,
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                    closeMenus,
                  )}
                </li>
              ),
            )}
          </ul>

          <p className={styles.mobileNavHeading}>इतर पाने</p>
          <ul className={styles.mobileNavList}>
            {topNavItems.map(({ label, href }) => (
              <li key={href}>
                {renderNavLink(
                  href,
                  label,
                  styles.mobileNavLink,
                  styles.mobileNavLinkActive,
                  closeMenus,
                )}
              </li>
            ))}
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
