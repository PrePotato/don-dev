import { useState, useEffect } from 'react';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import Background from './components/Background.jsx';
import Cursor from './components/Cursor.jsx';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Build from './components/Build.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll(loaded);

  // Track overall scroll progress (0..1) and expose to the WebGL scene.
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Background scrollProgress={scrollProgress} />
      <Cursor />
      <Loader onDone={() => setLoaded(true)} />

      <div className="app" data-loaded={loaded}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Build />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
