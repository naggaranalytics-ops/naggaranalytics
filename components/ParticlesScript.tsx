"use client";

import Script from 'next/script';

export default function ParticlesScript() {
    return (
        <Script
            src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
            strategy="lazyOnload"
            onLoad={() => {
                // @ts-ignore
                if (window.particlesJS) {
                    const isMobile = window.innerWidth < 768;
                    // @ts-ignore
                    window.particlesJS("global-particles-bg", {
                        "particles": {
                            "number": {
                                "value": isMobile ? 30 : 80,
                                "density": { "enable": true, "value_area": 800 }
                            },
                            "color": { "value": "#ffffff" },
                            "shape": { "type": "circle" },
                            "opacity": { "value": 0.0, "random": false },
                            "size": { "value": 0, "random": false },
                            "line_linked": {
                                "enable": true,
                                "distance": isMobile ? 100 : 150,
                                "color": "#16a085",
                                "opacity": isMobile ? 0.1 : 0.2,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": isMobile ? 0.4 : 0.8,
                                "direction": "none",
                                "random": true,
                                "out_mode": "out"
                            }
                        },
                        "interactivity": {
                            "detect_on": "window",
                            "events": {
                                "onhover": { "enable": !isMobile, "mode": "grab" },
                                "resize": true
                            },
                            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } }
                        },
                        "retina_detect": true
                    });
                }
            }}
        />
    );
}
