"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';

export default function RegressionCurve() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [b0, setB0] = useState("0");
    const [b1, setB1] = useState("0.0");
    const { theme } = useTheme();
    const { t, dir } = useLanguage();

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        let ctx: CanvasRenderingContext2D | null = null;
        let width = 0;
        let height = 0;
        let points: Array<{ tx: number, ty: number, sx: number, sy: number, cx: number, cy: number, r: number }> = [];

        let currentProgress = 0;
        let targetProgress = 0;
        let animationFrameId: number;

        function init() {
            if (!container || !canvas) return;
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;

            if (width === 0 || height === 0) {
                setTimeout(init, 50);
                return;
            }

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            generatePoints();
            draw(0);
        }

        function generatePoints() {
            points = [];
            for (let i = 0; i < 60; i++) {
                let nx = Math.random();
                let ty = 0.5 * nx + 0.25;
                let noise = (Math.random() - 0.5) * 0.35;

                points.push({
                    tx: (nx * 0.9 + 0.05) * width,
                    ty: (1 - (ty + noise)) * height,
                    sx: Math.random() * width,
                    sy: Math.random() * height,
                    cx: 0, cy: 0,
                    r: Math.random() * 2 + 2
                });
            }
        }

        function draw(p: number) {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const ease = 1 - Math.pow(1 - p, 3);

            ctx.fillStyle = theme === 'dark' ? '#48c9b0' : '#16a085';
            points.forEach(pt => {
                pt.cx = pt.sx + (pt.tx - pt.sx) * ease;
                pt.cy = pt.sy + (pt.ty - pt.sy) * ease;

                if (ctx) {
                    ctx.beginPath();
                    ctx.arc(pt.cx, pt.cy, pt.r, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (p > 0.15) {
                const lineProg = (p - 0.15) / 0.7;
                const len = Math.min(Math.max(lineProg, 0), 1);

                if (len > 0 && ctx) {
                    const x1 = width * 0.05;
                    const y1 = height * (1 - 0.23);
                    const x2 = width * 0.95;
                    const y2 = height * (1 - 0.77);

                    ctx.strokeStyle = '#fbbf24';
                    ctx.lineWidth = 4;
                    ctx.lineCap = 'round';

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x1 + (x2 - x1) * len, y1 + (y2 - y1) * len);
                    ctx.stroke();

                    setB0((10 + len * 15).toFixed(0));
                    setB1((len * 0.85).toFixed(2));
                }
            }
        }

        function loop() {
            const section = document.getElementById('method-section');
            if (section) {
                const rect = section.getBoundingClientRect();
                const wh = window.innerHeight;

                let rawProgress = (wh - rect.top) / (wh + rect.height * 0.6);
                targetProgress = Math.max(0, Math.min(1, rawProgress));

                let diff = targetProgress - currentProgress;
                if (Math.abs(diff) > 0.001) {
                    currentProgress += diff * 0.05;
                    draw(currentProgress);
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        }

        const handleResize = () => init();
        window.addEventListener('resize', handleResize, { passive: true });

        // Initial setup
        setTimeout(() => {
            init();
            loop();
        }, 100);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div className="content-layer relative z-20 w-full py-20 overflow-hidden" id="method-section">
            <section className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {t("method.title")}
                    </h2>
                    <h3 className="text-2xl md:text-3xl text-[#16a085] mb-6">
                        {t("method.subtitle")}
                    </h3>
                    <p className="text-sm md:text-base font-mono" style={{ color: 'var(--text-muted)' }}>
                        {t("method.scroll")}
                    </p>
                </div>

                <div ref={containerRef} className="relative w-full max-w-5xl h-[400px] md:h-[60vh] bg-[var(--input-bg)] rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-inner">
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
                        <canvas ref={canvasRef} className="block w-full h-full"></canvas>
                    </div>
                    <div className={`absolute bottom-6 ${dir === 'rtl' ? 'right-6 md:right-12' : 'left-6 md:left-12'} glass-card px-6 py-4 rounded-2xl text-[#fbbf24] font-mono text-lg md:text-2xl z-30 border-[#fbbf24]/20 shadow-2xl`}>
                        y = <span>{b0}</span> + <span>{b1}</span>x + ε
                    </div>
                </div>

                <div className="text-center mt-12 max-w-3xl space-y-4 px-2">
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {t("method.desc")}
                    </p>
                </div>
            </section>
        </div>
    );
}
