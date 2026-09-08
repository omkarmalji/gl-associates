import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

gsap.registerPlugin(useGSAP);

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
      {location.pathname === "/" && <BrandIntro />}

      <header className="site-nav">
        <Link className="brand" to="/" aria-label="Gayatri Lokesh Architects home">
          <img src="images/gl-associates-logo-transparent.png" alt="" />
          <span>Gayatri Lokesh<br />Architects LLP</span>
        </Link>

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
function BrandIntro() {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wrapper.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeline = gsap.timeline();
    if (reduce) {
      timeline.to(wrapper.current, { autoAlpha: 0, duration: 0.2, delay: 0.25 });
      return () => timeline.kill();
    }
    timeline
      .from(".brand-intro__mark", { opacity: 0, scale: 0.82, duration: 0.7, ease: "power3.out" })
      .from(".brand-intro__word span", { yPercent: 120, duration: 0.75, stagger: 0.045, ease: "power4.out" }, 0.18)
      .to(".brand-intro__mark", { rotate: 8, scale: 1.08, duration: 0.7, ease: "power2.inOut" }, 1.05)
      .to(wrapper.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 1.45)
      .set(wrapper.current, { display: "none" });
    return () => timeline.kill();
  }, { scope: wrapper });

  return (
    <div ref={wrapper} className="brand-intro" aria-hidden="true">
      <img className="brand-intro__mark" src="images/gl-associates-logo-transparent.png" alt="" />
      <p className="brand-intro__word" aria-label="Gayatri Lokesh Architects">
        {"GAYATRI LOKESH ARCHITECTS".split("").map((letter, index) => <span key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>)}
      </p>
    </div>
  );
}
