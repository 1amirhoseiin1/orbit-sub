import { useEffect, useRef } from 'react';
import GalaxyBackground from './GalaxyBackground';

const BURST_COLORS = ['rgba(139,92,246,0.5)', 'rgba(59,130,246,0.5)', 'rgba(6,182,212,0.5)'];

// Galaxy starfield as the base layer, plus a one-off glow burst on every
// click/tap so the background reacts to the person, not just drifts on
// its own.
export default function AmbientBackground() {
  const layerRef = useRef(null);
  const colorIndex = useRef(0);
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) return undefined;
    const layer = layerRef.current;
    if (!layer) return undefined;

    function spawnBurst(x, y) {
      const burst = document.createElement('div');
      const color = BURST_COLORS[colorIndex.current % BURST_COLORS.length];
      colorIndex.current += 1;

      const size = 260;
      burst.className = 'bg-burst';
      burst.style.left = `${x}px`;
      burst.style.top = `${y}px`;
      burst.style.width = `${size}px`;
      burst.style.height = `${size}px`;
      burst.style.background = `radial-gradient(circle, ${color}, transparent 70%)`;
      burst.style.filter = 'blur(6px)';

      layer.appendChild(burst);
      burst.addEventListener('animationend', () => burst.remove(), { once: true });
    }

    function handlePointerDown(e) {
      spawnBurst(e.clientX, e.clientY);
    }

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-bg">
      <GalaxyBackground reduceMotion={reduceMotion} />

      {/* click/tap ripples get appended here and remove themselves */}
      <div ref={layerRef} className="absolute inset-0" />
    </div>
  );
}
