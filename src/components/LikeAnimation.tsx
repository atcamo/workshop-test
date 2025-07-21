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
  draw: () => void;
}

export default function LikeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cargar íconos
    const likeImg = new Image();
    likeImg.src = '/like.png'; // Ícono de "like"
    const coinImg = new Image();
    coinImg.src = '/coin.png'; // Ícono de moneda

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

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -50; // Empiezan fuera de la pantalla (arriba)
        this.size = Math.random() * 20 + 15; // Tamaño entre 15 y 35px
        this.speed = Math.random() * 1 + 0.5; // Velocidad lenta (0.5 a 1.5px por frame)
        this.angle = Math.random() * 360; // Rotación inicial
        this.spin = Math.random() * 3 - 1.5; // Rotación suave
        this.particles = []; // Array para partículas del efecto
      }

      update() {
        this.y += this.speed; // Caída recta y lenta
        this.angle += this.spin;
        // Actualizar partículas
        this.particles = this.particles.filter(p => p.life > 0);
        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.05; // Reducir vida para desvanecimiento
        });
        // Reaparecer arriba cuando salen de la pantalla
        if (this.y > canvas.height) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
          this.particles = [];
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);

        // Punto de cambio de "like" a moneda
        const changePoint = canvas.height * 0.3; // Cambia al 30% de la pantalla
        // Punto de desvanecimiento al final de Hero
        const fadePoint = canvas.height * 0.5; // Ajustado al ~80% de Hero (estimado)

        // Generar partículas en el momento del cambio
        if (Math.abs(this.y - changePoint) < 8 && this.particles.length === 0) {
          for (let i = 0; i < 10; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1; // Velocidad entre 1 y 3
            this.particles.push({
              x: 0,
              y: 0,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * this.size * 0.2 + 2, // Tamaño entre 2 y ~6px
              life: 1, // Vida inicial
            });
          }
        }

        // Generar partículas al desvanecerse en el límite de Hero
        if (Math.abs(this.y - fadePoint) < 8 && this.particles.length <= 10) {
          for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1.5 + 0.5; // Velocidad más suave
            this.particles.push({
              x: 0,
              y: 0,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * this.size * 0.15 + 1, // Partículas más pequeñas
              life: 0.8, // Vida más corta
            });
          }
        }

        // Dibujar partículas
        this.particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
          ctx.fillStyle = p.life > 0.5 ? '#D9F99D' : '#C4B5FD'; // Transición de lima a púrpura
          ctx.globalAlpha = p.life; // Desvanecerse con la vida
          ctx.fill();
          ctx.globalAlpha = 1; // Restaurar opacidad
        });

        // Desvanecer ícono cerca del límite de Hero
        ctx.globalAlpha = Math.max(0, 1 - (this.y - changePoint) / (fadePoint - changePoint));
        // Dibujar "like" antes del cambio, moneda después
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
        likes.push(new LikeClass());
      }
    };

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      likes.forEach((like) => {
        like.update();
        like.draw();
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
    };
    window.addEventListener('resize', handleResize);

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