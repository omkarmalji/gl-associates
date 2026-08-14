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
  const location = useLocation();
  const outlet = useOutlet();
  const pageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return () => { window.history.scrollRestoration = previousRestoration; };
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    ScrollTrigger.clearScrollMemory("manual");
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
          y: 28,
          duration: 0.68,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((frameElement) => {
        const image = frameElement.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { yPercent: -5, scale: 1.06 }, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: frameElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-line-reveal]").forEach((element) => {
        gsap.from(element, {
          yPercent: 115,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, pageRef);
    return () => context.revert();
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="route-curtain" key={`curtain-${location.pathname}`} aria-hidden="true" />
      <header className={`site-nav ${location.pathname === "/" ? "site-nav--overlay" : ""}`}>
        <Link className="wordmark" to="/" aria-label="Gayatri Lokesh Architects home">
          <span>GAYATRI LOKESH</span><span>ARCHITECTS LLP</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(({ label, href }) => (
            <NavLink key={href} to={href} className={({ isActive }) => isActive ? "is-active" : ""}>
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink className="contact-pill" to="/contact">Contact</NavLink>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><List size={24} /></button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={28} /></button>
        {navItems.map(({ label, href }) => <NavLink key={href} to={href}>{label}</NavLink>)}
        <NavLink to="/contact">Contact</NavLink>
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
      <div className="footer__details">
        <div><span>Work</span><Link to="/projects/architecture">Architecture</Link><Link to="/projects/interior">Interior</Link><Link to="/journal">Journal</Link></div>
        <div><span>Studio</span><Link to="/studio">About</Link><Link to="/team">People</Link><Link to="/contact">Contact</Link></div>
        <div><span>Project inquiries</span><a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a><span className="detail-line">Mumbai, Pune</span></div>
        <div><span>Phone</span><a href="tel:+917507353159">+91 75073 53159</a><span className="detail-line">Narayan Peth, Pune 411030</span></div>
      </div>
      <div className="footer__wordmark">GAYATRI LOKESH</div>
      <Link className="footer__gallery" to="/projects" aria-label="Explore projects">
        <img src="images/spirit-front.jpg" alt="Spirit of the Place exterior" loading="lazy" />
        <img src="images/liberation-courtyard.jpg" alt="Liberation courtyard" loading="lazy" />
        <img src="images/stair-home.jpg" alt="Residential stair detail" loading="lazy" />
        <span>Explore work <ArrowUpRight size={18} /></span>
      </Link>
      <div className="footer__base">
        <span>Gayatri Lokesh Architects LLP © 2026</span>
        <span><Link to="/privacy">Privacy</Link> <Link to="/terms">Terms</Link></span>
      </div>
    </footer>
  );
}
