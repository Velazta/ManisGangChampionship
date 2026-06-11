"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  color: string;
  speedY: number;
  speedX: number;
}

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100; // Jumlah partikel emas di layar

    // Variasi warna emas/amber untuk efek berkilau (metallic shimmer)
    const goldColors = [
      "rgba(255, 215, 0, ",   // Bright Gold
      "rgba(218, 165, 32, ",  // Goldenrod
      "rgba(251, 146, 60, ",  // Warm Orange-Gold
      "rgba(253, 224, 71, ",  // Pale Yellow-Gold
      "rgba(245, 158, 11, ",  // Deep Amber
    ];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Inisialisasi partikel pertama kali secara acak di seluruh layar
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomY = false): Particle {
      const colorBase = goldColors[Math.floor(Math.random() * goldColors.length)];
      return {
        x: Math.random() * (canvas?.width || window.innerWidth),
        y: randomY ? Math.random() * (canvas?.height || window.innerHeight) : -10,
        radius: Math.random() * 2 + 0.6, // Ukuran bervariasi agar ada kedalaman (depth of field)
        opacity: Math.random() * 0.4 + 0.2, // Tingkat transparansi acak
        color: colorBase,
        speedY: Math.random() * 1.0 + 0.3, // Kecepatan jatuh vertikal
        speedX: Math.random() * 0.4 - 0.2, // Kecepatan angin horizontal
      };
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        
        // Efek Glow Emas Lembut pada tiap partikel
        ctx.shadowBlur = p.radius * 2.5;
        ctx.shadowColor = "rgba(251, 146, 60, 0.4)";
        ctx.fill();

        // Update Fisika Pergerakan Partikel
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 40) * 0.12; // Gerakan melayang berayun (sway) seperti salju asli

        // Reset partikel jika keluar dari batas layar
        if (p.y > canvas.height + 10 || p.x > canvas.width + 10 || p.x < -10) {
          particles[index] = createParticle(false);
        }
      });

      // Reset shadow blur agar tidak memengaruhi rendering lain
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-25"
    />
  );
}
