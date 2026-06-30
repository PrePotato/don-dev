import { useEffect, useRef } from 'react';
import PortfolioScene from '../webgl/scene.js';

export default function Background({ scrollProgress }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Mount the WebGL scene once.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new PortfolioScene(canvasRef.current, { reduced });
    sceneRef.current = scene;
    scene.start();

    const onResize = () => scene.resize();
    const onMouse = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      scene.setMouse(x, y);
    };
    const onVisibility = () => {
      if (document.hidden) scene.stop();
      else if (!reduced) scene.start();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.dispose();
    };
  }, []);

  // Push scroll progress into the scene.
  useEffect(() => {
    sceneRef.current?.setScroll(scrollProgress);
  }, [scrollProgress]);

  return (
    <div className="bg-webgl" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-webgl__canvas" />
      <div className="bg-webgl__vignette" />
    </div>
  );
}
