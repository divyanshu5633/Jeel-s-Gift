import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  density?: 'subtle' | 'stars' | 'celebration';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ density = 'subtle' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    // Check device capabilities and user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Adaptive particle count for silky-smooth 60fps even on lower-tier mobile chips
    const baseCount = density === 'stars' ? (isMobile ? 36 : 65) : density === 'celebration' ? (isMobile ? 26 : 48) : (isMobile ? 18 : 30);
    const particleCount = prefersReducedMotion ? Math.min(12, baseCount) : baseCount;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (density === 'stars' ? 1.6 : 2.2) + 0.6,
      alpha: Math.random() * 0.65 + 0.25,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.35 - 0.12,
      hue: Math.random() > 0.4 ? 340 : Math.random() > 0.5 ? 260 : 45, // romantic rose, violet, gold
    }));

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;
        }

        // Dual-pass soft halo without expensive canvas shadowBlur
        // Outer soft glow aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${p.alpha * 0.18})`;
        ctx.fill();

        // Core bright particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.alpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    // Pause animation when tab or app is hidden in background
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          if (!prefersReducedMotion) {
            animationFrameId = requestAnimationFrame(render);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 will-change-transform"
      aria-hidden="true"
    />
  );
};
