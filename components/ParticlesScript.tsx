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
                    // @ts-ignore
                    window.particlesJS("global-particles-bg", {
                        "particles": {
                            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                            "color": { "value": "#ffffff" },
                            "shape": { "type": "circle" },
                            "opacity": { "value": 0.0, "random": false },
                            "size": { "value": 0, "random": false },
                            "line_linked": { "enable": true, "distance": 150, "color": "#16a085", "opacity": 0.2, "width": 1 },
                            "move": { "enable": true, "speed": 0.8, "direction": "none", "random": true, "out_mode": "out" }
                        },
                        "interactivity": {
                            "detect_on": "window",
                            "events": { "onhover": { "enable": true, "mode": "grab" }, "resize": true },
                            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } }
                        },
                        "retina_detect": true
                    });
                }
            }}
        />
    );
}
