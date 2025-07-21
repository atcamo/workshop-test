'use client';

import { useEffect, useRef } from 'react';

// Interfaz para los objetos Like
interface Like {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  spin: number;
  particles: { x: number; y: number; vx: number; vy: number; size: number; life: number }[];
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function LikeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas no está disponible');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Contexto 2D no está disponible');
      return;
    }

    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cargar íconos
    const likeImg = new Image();
    likeImg.src = '/like.png';
    const coinImg = new Image();
    coinImg.src = '/coin.png';

    // Array para almacenar los "likes"
    const likes: Like[] = [];

    // Clase para cada "like"
    class LikeClass implements Like {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      spin: number;
      particles: { x: number; y: number; vx: number; vy: number; size: number; life: number }[];
      private canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = -50;
        this.size = Math.random() * 20 + 15;
        this.speed = Math.random() * 1 + 0.7;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 3 - 1.5;
        this.particles = [];
      }

      update() {
        this.y += this.speed;
        this.angle += this.spin;
        this.particles = this.particles.filter(p => p.life > 0);
        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.05;
        });
        if (this.y > this.canvas.height) {
          this.y = -50;
          this.x = Math.random() * this.canvas.width;
          this.particles = [];
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);

        const changePoint = this.canvas.height * 0.3;
        const fadePoint = this.canvas.height * 0.5;

        if (Math.abs(this.y - changePoint) < 8 && this.particles.length === 0) {
          for (let i = 0; i < 10; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;
            this.particles.push({
              x: 0,
              y: 0,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * this.size * 0.2 + 2,
              life: 1,
            });
          }
        }

        if (Math.abs(this.y - fadePoint) < 8 && this.particles.length <= 10) {
          for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1.5 + 0.5;
            this.particles.push({
              x: 0,
              y: 0,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * this.size * 0.15 + 1,
              life: 0.8,
            });
          }
        }

        this.particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
          ctx.fillStyle = p.life > 0.5 ? '#D9F99D' : '#C4B5FD';
          ctx.globalAlpha = p.life;
          ctx.fill();
          ctx.globalAlpha = 1;
        });

        ctx.globalAlpha = Math.max(0, 1 - (this.y - changePoint) / (fadePoint - changePoint));
        const img = this.y < changePoint ? likeImg : coinImg;
        if (this.y <= fadePoint) {
          ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.restore();
      }
    }

    // Inicializar "likes"
    const init = () => {
      for (let i = 0; i < 15; i++) {
        likes.push(new LikeClass(canvas));
      }
    };

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      likes.forEach((like) => {
        like.update();
        like.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    // Cargar imágenes y empezar la animación
    const startAnimation = () => {
      if (likeImg.complete && coinImg.complete) {
        init();
        animate();
      }
    };
    likeImg.onload = startAnimation;
    coinImg.onload = startAnimation;

    // Ajustar el canvas al redimensionar la ventana
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      likes.length = 0;
      init();
    };
    window.addEventListener('resize', handleResize); // Línea 182 corregida

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}