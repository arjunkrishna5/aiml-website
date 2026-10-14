"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
}

export function CursorReactiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      speed: 0,
      isActive: false,
    };

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      mouse.targetX = relativeX;
      mouse.targetY = relativeY;
      mouse.isActive = true;
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, [role='button'], input")) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    // Particle pool
    const particles: Particle[] = [];
    const maxParticles = 60;
    const colors = ["#DC2626", "#FF2E54", "#EF4444", "#94A3B8"];

    const spawnParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2, // slight upward drift
          radius: Math.random() * 2 + 1,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 40 + 25,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Grid config for responsive neural node effect
    const gridSpacing = 36;
    const proximity = 150; // Distance within which dots react to cursor

    // Animation Loop
    const render = () => {
      // Smooth lerp easing for fluid cursor follower
      const lerpFactor = 0.14;
      mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // Spawn trail particles if cursor is moving
      if (mouse.isActive && mouse.speed > 1.5) {
        const spawnCount = Math.min(Math.floor(mouse.speed * 0.4), 3);
        spawnParticles(mouse.x, mouse.y, spawnCount);
      }

      // Update CSS spotlight & follower ring
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Reactive Dot Grid & Neural Synapses near cursor
      if (mouse.isActive) {
        const startX = Math.max(0, Math.floor((mouse.x - proximity) / gridSpacing) * gridSpacing);
        const endX = Math.min(width, Math.ceil((mouse.x + proximity) / gridSpacing) * gridSpacing);
        const startY = Math.max(0, Math.floor((mouse.y - proximity) / gridSpacing) * gridSpacing);
        const endY = Math.min(height, Math.ceil((mouse.y + proximity) / gridSpacing) * gridSpacing);

        const activeNodes: { x: number; y: number; dist: number; intensity: number }[] = [];

        for (let gx = startX; gx <= endX; gx += gridSpacing) {
          for (let gy = startY; gy <= endY; gy += gridSpacing) {
            const dist = Math.hypot(mouse.x - gx, mouse.y - gy);
            if (dist < proximity) {
              const intensity = (1 - dist / proximity);
              activeNodes.push({ x: gx, y: gy, dist, intensity });

              // Draw reactive glow dot
              ctx.beginPath();
              // Dot expands slightly closer to cursor
              const r = 1.75 + intensity * 2.2;
              ctx.arc(gx, gy, r, 0, Math.PI * 2);

              // Transition from slate to glowing crimson
              ctx.fillStyle = `rgba(220, 38, 38, ${intensity * 0.75})`;
              ctx.shadowColor = "#DC2626";
              ctx.shadowBlur = intensity * 10;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }

        // Connect nearby active nodes with synaptic lines (Neural Net Effect)
        for (let i = 0; i < activeNodes.length; i++) {
          for (let j = i + 1; j < activeNodes.length; j++) {
            const n1 = activeNodes[i];
            const n2 = activeNodes[j];
            const nodeDist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

            // Connect if nodes are adjacent grid points
            if (nodeDist <= gridSpacing * 1.5) {
              const lineAlpha = Math.min(n1.intensity, n2.intensity) * 0.45;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(220, 38, 38, ${lineAlpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // 2. Draw Trailing Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.65;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Fluid Ambient Spotlight (Follows cursor with smooth spring damping) */}
      <div
        ref={spotlightRef}
        className={`absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-500 will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, rgba(255, 46, 84, 0.05) 35%, rgba(244, 245, 248, 0) 70%)`,
        }}
      />

      {/* 2. Interactive Synaptic Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* 3. Sleek Floating Cursor Ring & Dot Indicator */}
      <div
        ref={ringRef}
        className={`absolute -top-4 -left-4 w-8 h-8 rounded-full pointer-events-none transition-all duration-150 ease-out will-change-transform flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHoveringInteractive
            ? "scale-150 border border-red-500/70 bg-red-500/10 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
            : "scale-100 border border-red-500/30"
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-red-500 transition-transform duration-200 ${
            isHoveringInteractive ? "scale-0" : "scale-100"
          }`}
        />
      </div>
    </div>
  );
}
