import { useEffect, useRef } from 'react';

// Canvas starfield with depth and twinkle - stars orbit slowly around
// a soft nebula core instead of sitting on a grid, so it reads as a
// galaxy rather than a network diagram.
const STAR_COLORS = ['#FAFAFA', '#C4B5FD', '#93C5FD', '#67E8F9'];
const STAR_COUNT = 220;

export default function GalaxyBackground({ reduceMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let w = 0;
    let h = 0;
    let stars = [];
    let rafId;
    let t = 0;

    function buildStars() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: STAR_COUNT }, () => {
        const depth = Math.random();
        const dist = Math.pow(Math.random(), 0.5) * Math.max(w, h) * 0.62;
        return {
          angle: Math.random() * Math.PI * 2,
          dist,
          r: 0.5 + depth * 1.6,
          baseAlpha: 0.22 + depth * 0.55,
          twinkleSpeed: 0.01 + Math.random() * 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          drift: (0.00006 + Math.random() * 0.00012) * (Math.random() < 0.5 ? 1 : -1),
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
        };
      });
    }

    function frame() {
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
      core.addColorStop(0, 'rgba(139,92,246,0.12)');
      core.addColorStop(0.5, 'rgba(59,130,246,0.06)');
      core.addColorStop(1, 'rgba(6,182,212,0)');
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      t += 1;
      for (const s of stars) {
        s.angle += s.drift;
        const x = cx + Math.cos(s.angle) * s.dist;
        const y = cy + Math.sin(s.angle) * s.dist * 0.55;
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        ctx.globalAlpha = s.baseAlpha * (0.55 + 0.45 * twinkle);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(frame);
    }

    buildStars();
    rafId = requestAnimationFrame(frame);
    window.addEventListener('resize', buildStars);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', buildStars);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
