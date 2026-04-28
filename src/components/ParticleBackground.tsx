import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      hue: number;
      pulsePhase: number;
      pulseSpeed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.12;
        this.speedY = (Math.random() - 0.5) * 0.12;
        this.maxOpacity = Math.random() * 0.35 + 0.05;
        this.opacity = this.maxOpacity;
        this.hue = 30 + Math.random() * 25;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.008 + Math.random() * 0.015;
      }

      update(w: number, h: number) {
        this.pulsePhase += this.pulseSpeed;
        this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(this.pulsePhase));

        this.x += this.speedX;
        this.y += this.speedY;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
        }

        if (this.x < -10) this.x = w + 10;
        if (this.x > w + 10) this.x = -10;
        if (this.y < -10) this.y = h + 10;
        if (this.y > h + 10) this.y = -10;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 45%, ${this.opacity})`;
        ctx.fill();

        if (this.size > 1.5) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 4
          );
          gradient.addColorStop(0, `hsla(${this.hue}, 70%, 50%, ${this.opacity * 0.2})`);
          gradient.addColorStop(1, `hsla(${this.hue}, 70%, 50%, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    }

    const init = () => {
      resize();
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 100);
      particles = Array.from({ length: count }, () => new Particle(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(180, 83, 9, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}
