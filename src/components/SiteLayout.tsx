import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { Outlet, useLocation } from "react-router-dom";
import { PageLink as Link, PageNavLink as NavLink } from "./PageLink";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
];

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const lightSurface = useMemo(
    () => ["/studio", "/process", "/contact", "/privacy", "/terms"].some((route) => location.pathname.startsWith(route)),
    [location.pathname],
  );

  useEffect(() => {
    setMenuOpen(false);
    document.documentElement.dataset.route = lightSurface ? "light" : "image";
  }, [lightSurface, location.pathname]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className={`site-shell ${lightSurface ? "site-shell--light" : "site-shell--image"}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-nav">
        <Link className="brand" to="/" aria-label="Gayatri Lokesh Architects home">
          <img src="images/gl-associates-logo-transparent.png" alt="" />
          <span>Gayatri Lokesh<br />Architects LLP</span>
        </Link>

        <div className="site-nav__actions">
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(({ label, href }) => (
              <NavLink key={href} to={href} className={({ isActive }) => isActive ? "is-active" : ""}>{label}</NavLink>
            ))}
            <NavLink className="nav-contact" to="/contact">Contact</NavLink>
          </nav>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            <List size={23} weight="light" />
          </button>
        </div>
      </header>

      <div id="site-menu" className={`site-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} inert={menuOpen ? undefined : true}>
        <div className="site-menu__top">
          <Link className="brand brand--menu" to="/" aria-label="Gayatri Lokesh Architects home">
            <img src="images/gl-associates-logo-transparent.png" alt="" />
            <span>Gayatri Lokesh<br />Architects LLP</span>
          </Link>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={25} weight="light" /></button>
        </div>
        <nav aria-label="Menu navigation">
          {navItems.map(({ label, href }) => <NavLink key={href} to={href}>{label}<ArrowUpRight weight="light" /></NavLink>)}
          <NavLink to="/contact">Contact<ArrowUpRight weight="light" /></NavLink>
        </nav>
        <div className="site-menu__footer">
          <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
          <a href="tel:+917507353159">+91 75073 53159</a>
          <span>Mumbai and Pune</span>
        </div>
      </div>

      <main id="main-content" key={location.pathname}>
        <Outlet />
      </main>
    </div>
  );
}
