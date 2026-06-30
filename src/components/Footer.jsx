export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <span className="footer__brand">don<em>.dev</em></span>
        <span className="footer__tag">Designed &amp; built from scratch — Three.js · GSAP · React</span>
      </div>
      <div className="footer__bar">
        <span>© {new Date().getFullYear()} Yousef Jadoa</span>
        <span className="footer__pulse"><i /> Available for freelance</span>
        <a href="#hero" data-hover onClick={(e) => {
          e.preventDefault();
          if (window.__lenis) window.__lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>Back to top ↑</a>
      </div>
    </footer>
  );
}
