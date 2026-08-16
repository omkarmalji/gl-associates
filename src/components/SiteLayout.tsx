import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Link, NavLink, useLocation, useOutlet } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Studio", href: "/studio" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/journal" },
  { label: "Team", href: "/team" },
];

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const location = useLocation();
  const outlet = useOutlet();
  const pageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return () => { window.history.scrollRestoration = previousRestoration; };
    const lenis = new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHeroVisible(isHome);
  }, [isHome, location.pathname]);

  useEffect(() => {
    if (!isHome) return;
    const hero = document.querySelector(".home-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  useLayoutEffect(() => {
    ScrollTrigger.clearScrollMemory("manual");
    const resetScroll = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    resetScroll();
    const frame = requestAnimationFrame(resetScroll);
    const timeout = window.setTimeout(resetScroll, 80);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!pageRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 24,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((frameElement) => {
        const image = frameElement.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { scale: 1.08 }, {
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: frameElement, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((frameElement) => {
        const image = frameElement.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { yPercent: -3 }, {
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: frameElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, pageRef);
    return () => context.revert();
  }, [location.pathname]);

  const overlayNav = isHome && heroVisible;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="route-curtain" key={`curtain-${location.pathname}`} aria-hidden="true" />
      <header className={`site-nav ${overlayNav ? "site-nav--overlay" : "site-nav--solid"}`}>
        <Link className="wordmark" to="/" aria-label="Gayatri Lokesh Architects home">
          <img className="wordmark-logo" src="images/gl-associates-logo-transparent.png" alt="" />
          <span className="wordmark-name">Gayatri Lokesh<br />Architects LLP</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(({ label, href }) => (
            <NavLink key={href} to={href} className={({ isActive }) => isActive ? "is-active" : ""}>
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="contact-button" to="/contact">Contact</NavLink>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu"><List size={23} weight="light" /></button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} inert={menuOpen ? undefined : true}>
        <div className="mobile-menu__top">
          <Link className="mobile-menu__brand" to="/" aria-label="Gayatri Lokesh Architects home">
            <img src="images/gl-associates-logo-transparent.png" alt="" />
            <span>Gayatri Lokesh<br />Architects LLP</span>
          </Link>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={25} weight="light" /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map(({ label, href }) => <NavLink key={href} to={href}>{label}</NavLink>)}
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="mobile-menu__footer">
          <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
          <span>Mumbai and Pune</span>
        </div>
      </div>

      <div ref={pageRef} key={`page-${location.pathname}`} className="route-page">
        <main id="main-content">{outlet}</main>
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer page-pad">
      <div className="footer__top">
        <div className="footer__identity">
          <img src="images/gl-associates-logo-transparent.png" alt="Gayatri Lokesh Architects logo" loading="lazy" />
          <p>Gayatri Lokesh Architects LLP</p>
        </div>
        <div className="footer__details">
          <div><span>Work</span><Link to="/projects/architecture">Architecture</Link><Link to="/projects/interior">Interior</Link><Link to="/journal">Journal</Link></div>
          <div><span>Studio</span><Link to="/studio">About</Link><Link to="/team">People</Link><Link to="/contact">Contact</Link></div>
          <div><span>Project inquiries</span><a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a><span>Mumbai, Pune</span></div>
          <div><span>Phone</span><a href="tel:+917507353159">+91 75073 53159</a><span>Narayan Peth, Pune 411030</span></div>
        </div>
      </div>
      <Link className="footer__wordmark" to="/projects">
        <span>GAYATRI LOKESH</span>
        <span>ARCHITECTS</span>
        <ArrowUpRight size={24} weight="light" />
      </Link>
      <div className="footer__base">
        <span>Gayatri Lokesh Architects LLP © 2026</span>
        <span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></span>
      </div>
    </footer>
  );
}
