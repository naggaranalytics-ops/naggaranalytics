"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';

export default function BellCurve() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);
    const { theme } = useTheme();
    const { t } = useLanguage();

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        let ctx: CanvasRenderingContext2D | null = null;
        let width = 0;
        let height = 0;
        let currentProgress = 0;
        let targetProgress = 0;
        let animationFrameId: number;

        function pdf(x: number) {
            return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
        }

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
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            draw(0);
        }

        function draw(p: number) {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const baseY = height * 0.85;
            const scaleX = width / 8;
            const scaleY = height * 0.7 * 2.5;
            const centerX = width / 2;

            // Axe
            ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, baseY);
            ctx.lineTo(width, baseY);
            ctx.stroke();

            // Curve
            ctx.strokeStyle = theme === 'dark' ? '#cbd5e1' : '#475569';
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.beginPath();

            for (let x = -4; x <= 4; x += 0.1) {
                const screenX = centerX + x * scaleX;
                const screenY = baseY - pdf(x) * scaleY;
                if (x === -4) ctx.moveTo(screenX, screenY);
                else ctx.lineTo(screenX, screenY);
            }
            ctx.stroke();

            const fillOpacity = Math.min(Math.max((p - 0.2) * 1.5, 0), 0.8);

            if (fillOpacity > 0) {
                ctx.fillStyle = `rgba(251, 191, 36, ${fillOpacity})`;

                ctx.beginPath();
                for (let x = -4; x <= -1.96; x += 0.1) {
                    const screenX = centerX + x * scaleX;
                    const screenY = baseY - pdf(x) * scaleY;
                    if (x === -4) ctx.moveTo(screenX, baseY);
                    ctx.lineTo(screenX, screenY);
                }
                ctx.lineTo(centerX + (-1.96) * scaleX, baseY);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(centerX + (1.96) * scaleX, baseY);
                for (let x = 1.96; x <= 4; x += 0.1) {
                    const screenX = centerX + x * scaleX;
                    const screenY = baseY - pdf(x) * scaleY;
                    ctx.lineTo(screenX, screenY);
                }
                ctx.lineTo(centerX + (4) * scaleX, baseY);
                ctx.fill();
            }
        }

        function loop() {
            const section = document.getElementById('sig-section');
            if (section) {
                const rect = section.getBoundingClientRect();
                const wh = window.innerHeight;

                let rawProgress = (wh - rect.top) / (wh + rect.height * 0.6);
                targetProgress = Math.max(0, Math.min(1, rawProgress));

                let diff = targetProgress - currentProgress;
                if (Math.abs(diff) > 0.001) {
                    currentProgress += diff * 0.05;
                    draw(currentProgress);
                    setProgress(currentProgress);
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        }

        const handleResize = () => init();
        window.addEventListener('resize', handleResize, { passive: true });

        setTimeout(() => {
            init();
            loop();
        }, 100);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Redraw on theme change

    const isVisible = progress > 0.5;

    return (
        <div className="content-layer relative z-20 w-full py-20 overflow-hidden" id="sig-section">
            <section className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                <div className="lg:col-span-4 order-2 lg:order-1 space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            {t("sig.title")}
                        </h2>
                        <h3 className="text-xl md:text-3xl text-[#16a085] mb-4">
                            {t("sig.subtitle")}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {t("sig.desc")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-sm">
                        <div id="box-normal" className="glass-card p-5 rounded-lg border-l-2 border-slate-400 transition-all duration-500">
                            <h4 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{t("sig.curveTitle")}</h4>
                            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{t("sig.curveDesc")}</p>
                        </div>

                        <div id="box-sig" className={`glass-card p-5 rounded-lg border-l-2 transition-all duration-500 ${isVisible ? 'opacity-100 border-[#fbbf24] bg-[#fbbf24]/5' : 'opacity-50 border-transparent bg-transparent'}`}>
                            <h4 className="font-bold text-[#fbbf24] mb-1">{t("sig.pTitle")}</h4>
                            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{t("sig.pDesc")}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 order-1 lg:order-2 relative h-[350px] md:h-[60vh] w-full" ref={containerRef}>
                    <div className="w-full h-full bg-[var(--input-bg)] rounded-3xl border border-[var(--border-color)] relative overflow-hidden shadow-inner">
                        <canvas ref={canvasRef} className="block w-full h-full"></canvas>
                    </div>
                    <div id="sig-tag-left" className={`absolute top-1/2 left-[10%] glass-card px-4 py-2 rounded-lg text-center border-l-2 border-[#fbbf24] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[#fbbf24] font-bold text-sm">{t("sig.tag")}</div>
                        <div className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>p &lt; 0.05</div>
                    </div>
                    <div id="sig-tag-right" className={`absolute top-1/2 right-[10%] glass-card px-4 py-2 rounded-lg text-center border-r-2 border-[#fbbf24] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="text-[#fbbf24] font-bold text-sm">{t("sig.tag")}</div>
                        <div className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>p &lt; 0.05</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
