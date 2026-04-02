"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  label: string;
  pulse: number;
  pulseSpeed: number;
}

interface Particle {
  fi: number;
  ti: number;
  t: number;
  speed: number;
  color: string;
  size: number;
}

const SERVICE_NODES = [
  { label: "Custom Websites", color: "#6ea3e6", size: 10 },
  { label: "AI Automation", color: "#818cf8", size: 12 },
  { label: "Funnels", color: "#6366f1", size: 9 },
  { label: "SEO & Growth", color: "#38bdf8", size: 9 },
  { label: "DevOps", color: "#94a3b8", size: 8 },
  { label: "E-Commerce", color: "#818cf8", size: 8 },
  { label: "Analytics", color: "#c084fc", size: 7 },
  { label: "API Dev", color: "#6ea3e6", size: 7 },
];

const COLORS = ["#6ea3e6", "#818cf8", "#6366f1", "#38bdf8"];

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let nodes: Node[] = [];
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    function spawnParticle() {
      if (nodes.length < 2) return;
      let fi = Math.floor(Math.random() * nodes.length);
      let ti = Math.floor(Math.random() * nodes.length);
      while (ti === fi) ti = Math.floor(Math.random() * nodes.length);
      const f = nodes[fi], t = nodes[ti];
      if (Math.hypot(t.x - f.x, t.y - f.y) > W * 0.7) return;
      particles.push({
        fi,
        ti,
        t: 0,
        speed: 0.003 + Math.random() * 0.005,
        color: f.color,
        size: 1.5 + Math.random() * 1.5,
      });
    }

    function build() {
      const cv = canvasRef.current;
      if (!cv) return;
      
      W = cv.width = cv.offsetWidth || window.innerWidth;
      H = cv.height = cv.offsetHeight || window.innerHeight;
      nodes = [];
      particles = [];
 
      const cols = 4, rows = 2;
      const padX = W * 0.22, padY = H * 0.32; // Ultimate spacing for high-end readability
      const cellW = (W - padX * 2) / cols;
      const cellH = (H - padY * 2) / rows;

      SERVICE_NODES.forEach((s, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const bx = padX + col * cellW + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.45;
        const by = padY + row * cellH + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.5;
        nodes.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: s.size,
          color: s.color,
          label: s.label,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.018 + Math.random() * 0.012,
        });
      });

      // Create balanced node density (Reduced from 180 to 125 for better spacing)
      for (let i = 0; i < 125; i++) {
        const bx = padX * 0.5 + Math.random() * (W - padX);
        const by = 30 + Math.random() * (H - 60);
        nodes.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: 3.5 + Math.random() * 4.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          label: "",
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.01,
        });
      }

          for (let k = 0; k < 180; k++) spawnParticle();
    }

    function roundRect(canv: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      canv.beginPath();
      canv.moveTo(x + r, y);
      canv.arcTo(x + w, y, x + w, y + h, r);
      canv.arcTo(x + w, y + h, x, y + h, r);
      canv.arcTo(x, y + h, x, y, r);
      canv.arcTo(x, y, x + w, y, r);
      canv.closePath();
    }

    function draw() {
      const cv = canvasRef.current;
      const c = cv?.getContext("2d");
      if (!cv || !c) return;

      c.clearRect(0, 0, W, H);

      // Grid
      c.save();
      c.strokeStyle = "rgba(0,212,255,0.04)";
      c.lineWidth = 1;
      const gs = 70;
      for (let gx = 0; gx < W; gx += gs) { c.beginPath(); c.moveTo(gx, 0); c.lineTo(gx, H); c.stroke(); }
      for (let gy = 0; gy < H; gy += gs) { c.beginPath(); c.moveTo(0, gy); c.lineTo(W, gy); c.stroke(); }
      c.restore();

      const mr = 500; // Ultra Mouse interaction radius

      // Update nodes
      nodes.forEach((n) => {
        n.vx += (n.baseX - n.x) * 0.001;
        n.vy += (n.baseY - n.y) * 0.001;
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < mr && d > 0) {
          const f = (mr - d) / mr;
          n.vx += (dx / d) * f * 1.8;
          n.vy += (dy / d) * f * 1.8;
        }
        n.vx *= 0.94;
        n.vy *= 0.94;
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
      });

      // Connections
      const CD = W * 0.4; // Refined Connection distance (Reduced from 0.65 for clarity)
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const na = nodes[a], nb = nodes[b];
          const d = Math.hypot(na.x - nb.x, na.y - nb.y);
          if (d > CD) continue;
          const alpha = (1 - d / CD) * 0.22;
          const grad = c.createLinearGradient(na.x, na.y, nb.x, nb.y);
          const a1 = Math.round(alpha * 255).toString(16).padStart(2, "0");
          grad.addColorStop(0, na.color + a1);
          grad.addColorStop(1, nb.color + a1);
          c.beginPath();
          c.strokeStyle = grad;
          c.lineWidth = 0.8;
          c.moveTo(na.x, na.y);
          c.lineTo(nb.x, nb.y);
          c.stroke();
        }
      }

      // Mouse connections
      if (mouse.x > 0 && mouse.x < W && mouse.y > 0 && mouse.y < H) {
        const nearest = [...nodes]
          .map((n, i) => ({ i, d: Math.hypot(n.x - mouse.x, n.y - mouse.y) }))
          .sort((a, b) => a.d - b.d)
          .slice(0, 5);
        c.setLineDash([4, 6]);
        nearest.forEach(({ i, d }) => {
          if (d > mr * 2) return;
          const alpha = Math.max(0, 1 - d / (mr * 2)) * 0.55;
          c.beginPath();
          c.strokeStyle = `rgba(0,212,255,${alpha})`;
          c.lineWidth = 1;
          c.moveTo(mouse.x, mouse.y);
          c.lineTo(nodes[i].x, nodes[i].y);
          c.stroke();
        });
        c.setLineDash([]);
      }

      // Particles
      for (let k = particles.length - 1; k >= 0; k--) {
        const p = particles[k];
        p.t += p.speed;
        if (p.t >= 1) {
          particles.splice(k, 1);
          spawnParticle();
          continue;
        }
        const f = nodes[p.fi], t = nodes[p.ti];
        if (!f || !t) continue;
        const px = f.x + (t.x - f.x) * p.t;
        const py = f.y + (t.y - f.y) * p.t;
        const alpha = Math.sin(p.t * Math.PI) * 0.9;
        c.globalAlpha = alpha;
        const grd = c.createRadialGradient(px, py, 0, px, py, p.size * 2);
        grd.addColorStop(0, p.color + "ff");
        grd.addColorStop(1, p.color + "00");
        c.beginPath();
        c.fillStyle = grd;
        c.arc(px, py, p.size * 2, 0, Math.PI * 2);
        c.fill();
        c.globalAlpha = 1;
      }

      // Nodes
      nodes.forEach((n) => {
        const ps = Math.sin(n.pulse) * 0.4 + 1;
        const pr = n.r * ps;
        const ra = (Math.sin(n.pulse) * 0.5 + 0.5) * 0.25;

        // Outer glow
        const og = c.createRadialGradient(n.x, n.y, pr, n.x, n.y, pr * 4.5);
        const oa = Math.round(ra * 255).toString(16).padStart(2, "0");
        og.addColorStop(0, n.color + oa);
        og.addColorStop(1, n.color + "00");
        c.beginPath();
        c.fillStyle = og;
        c.arc(n.x, n.y, pr * 4.5, 0, Math.PI * 2);
        c.fill();

        // Inner dot
        const ig = c.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 1.4);
        ig.addColorStop(0, "#ffffff");
        ig.addColorStop(0.4, n.color);
        ig.addColorStop(1, n.color + "aa");
        c.beginPath();
        c.fillStyle = ig;
        c.arc(n.x, n.y, pr, 0, Math.PI * 2);
        c.fill();

        // Label pill
        if (n.label) {
          const la = 0.65 + Math.sin(n.pulse) * 0.1;
          c.save();
          c.globalAlpha = la;
          c.font = 'bold 14px "IBM Plex Mono",monospace'; // Increased font for readability
          const tw = c.measureText(n.label).width;
          const pw = tw + 38, ph = 34, lx = n.x + pr + 15, ly = n.y - ph / 2;
          c.fillStyle = "rgba(0,0,0,0.85)";
          roundRect(c, lx, ly, pw, ph, 6);
          c.fill();
          c.strokeStyle = n.color + "66";
          c.lineWidth = 1.5;
          roundRect(c, lx, ly, pw, ph, 6);
          c.stroke();
          c.fillStyle = n.color;
          c.beginPath();
          c.arc(lx + 10, ly + ph / 2, 4, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = "#fff";
          c.fillText(n.label, lx + 22, ly + ph / 2 + 5);
          c.restore();
        }
      });

      // Cursor orb
      if (mouse.x > 0 && mouse.x < W && mouse.y > 0 && mouse.y < H) {
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 50);
        cg.addColorStop(0, "rgba(0,212,255,0.18)");
        cg.addColorStop(1, "rgba(0,212,255,0)");
        ctx.beginPath();
        ctx.fillStyle = cg;
        ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    let animationId: number;
    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", build);

    build();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
