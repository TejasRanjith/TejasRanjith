// --- Background: Circuitry Animation ---
import React, { useRef, useEffect } from 'react';

const CircuitBackground = ({ isDarkMode }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        const resize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; };
        window.addEventListener('resize', resize);
        resize();
        const gridSize = 40;
        const signalCount = 15;
        const signals = [];
        class Signal {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
                this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
                const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
                this.dir = dirs[Math.floor(Math.random() * dirs.length)];
                this.speed = 2; this.life = Math.random() * 100 + 100; this.history = []; this.historyMaxLength = 20;
            }
            update() {
                this.life--; this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.historyMaxLength) this.history.shift();
                this.x += this.dir.x * this.speed; this.y += this.dir.y * this.speed;
                if (this.x % gridSize === 0 && this.y % gridSize === 0) {
                    if (Math.random() < 0.3) {
                        const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
                        this.dir = dirs[Math.floor(Math.random() * dirs.length)];
                    }
                }
                if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
            }
            draw(ctx) {
                if (this.history.length < 2) return;
                ctx.beginPath(); ctx.moveTo(this.history[0].x, this.history[0].y);
                for (let i = 1; i < this.history.length; i++) ctx.lineTo(this.history[i].x, this.history[i].y);
                ctx.strokeStyle = `rgba(239, 68, 68, ${this.life / 100})`; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill();
            }
        }
        for (let i = 0; i < signalCount; i++) signals.push(new Signal());
        const staticLines = [];
        const numStaticLines = 50;
        for (let i = 0; i < numStaticLines; i++) {
            const sx = Math.floor(Math.random() * (width / gridSize)) * gridSize;
            const sy = Math.floor(Math.random() * (height / gridSize)) * gridSize;
            const length = Math.floor(Math.random() * 5 + 2) * gridSize;
            const vertical = Math.random() > 0.5;
            staticLines.push({ x: sx, y: sy, length, vertical });
        }
        let animationFrameId;
        let time = 0;
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.05;
            const baseOpacity = isDarkMode ? 0.1 : 0.05;
            const breathing = (Math.sin(time) + 1) * 0.05;
            ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${baseOpacity + breathing})` : `rgba(0, 0, 0, ${baseOpacity + breathing})`;
            ctx.lineWidth = 1;
            staticLines.forEach(line => {
                ctx.beginPath(); ctx.moveTo(line.x, line.y);
                if (line.vertical) ctx.lineTo(line.x, line.y + line.length); else ctx.lineTo(line.x + line.length, line.y);
                ctx.stroke(); ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(line.x, line.y, 2, 0, Math.PI * 2); ctx.fill();
            });
            signals.forEach(signal => { signal.update(); signal.draw(ctx); });
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, [isDarkMode]);
    return (<canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />);
};

export default CircuitBackground;
