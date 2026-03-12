"use client";

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeProvider';

export default function ParticlesScript() {
    const { theme } = useTheme();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => initParticles(theme);
        // Only add script if not already loaded
        // @ts-ignore
        if (window.particlesJS) {
            initParticles(theme);
        } else {
            document.body.appendChild(script);
        }

        return () => {
            // Clean up particles on theme change so it re-inits
            const el = document.getElementById('global-particles-bg');
            if (el) {
                // @ts-ignore
                if (window.pJSDom && window.pJSDom.length > 0) {
                    // @ts-ignore
                    window.pJSDom.forEach((pjs: any) => pjs.pJS?.fn?.vendors?.destroypJS());
                    // @ts-ignore
                    window.pJSDom = [];
                }
            }
        };
    }, [theme]);

    return null;
}

function initParticles(theme: string) {
    // @ts-ignore
    if (!window.particlesJS) return;
    if (!document.getElementById("global-particles-bg")) return;

    const isMobile = window.innerWidth < 768;
    const lineColor = '#16a085';
    const particleColor = theme === 'dark' ? '#ffffff' : '#94a3b8';

    // @ts-ignore
    window.particlesJS("global-particles-bg", {
        particles: {
            number: {
                value: isMobile ? 30 : 80,
                density: { enable: true, value_area: 800 }
            },
            color: { value: particleColor },
            shape: { type: "circle" },
            opacity: { value: 0.0, random: false },
            size: { value: 0, random: false },
            line_linked: {
                enable: true,
                distance: isMobile ? 100 : 150,
                color: lineColor,
                opacity: isMobile ? 0.1 : 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: isMobile ? 0.4 : 0.8,
                direction: "none",
                random: true,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: { enable: !isMobile, mode: "grab" },
                resize: true
            },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } } }
        },
        retina_detect: true
    });
}
