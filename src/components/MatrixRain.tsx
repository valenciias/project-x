import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = window.innerWidth < 768 ? 10 : 14; // Adjust font size for mobile
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixCharacters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン♔⚡☢⚔✠卍☤☸☯☬0123456789".split("");
    const columns = Math.floor(canvas.width / fontSize);

    const drops = Array.from({ length: columns }, () => ({
      y: Math.random() * canvas.height,
      speed: 1 + Math.random() * 2,
      length: 10 + Math.floor(Math.random() * 20),
      wait: Math.floor(Math.random() * 100)
    }));

    let animationFrameId: number;
    let lastFrameTime = 0;
    const fps = 30; // Limit frame rate for performance

    const draw = (timestamp: number) => {
      if (timestamp - lastFrameTime < 1000 / fps) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        if (!drop) continue;

        if (drop.wait > 0) {
          drop.wait--;
          continue;
        }

        for (let j = 0; j < drop.length; j++) {
          const char = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
          ctx.fillStyle = j === 0 ? '#7fffd4' : `rgba(55, 161, 105, ${1 - j / drop.length})`;
          ctx.font = `${fontSize}px monospace`;
          const y = drop.y - j * fontSize;
          if (y >= 0) ctx.fillText(char, i * fontSize, y);
        }

        drop.y += drop.speed;
        if (drop.y - drop.length * fontSize > canvas.height) {
          drop.y = -drop.length * fontSize;
          drop.speed = 1 + Math.random() * 2;
          drop.length = 10 + Math.floor(Math.random() * 20);
          drop.wait = Math.floor(Math.random() * 100);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const newColumns = Math.floor(canvas.width / fontSize);
        while (drops.length < newColumns) {
          drops.push({
            y: Math.random() * canvas.height,
            speed: 1 + Math.random() * 2,
            length: 10 + Math.floor(Math.random() * 20),
            wait: Math.floor(Math.random() * 100),
          });
        }
        drops.length = newColumns;
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default MatrixRain;
