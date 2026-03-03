/*
    ==========================================================================
    MAIN JAVASCRIPT
    ==========================================================================
    Handles:
    1. Particle Background Initialization
    2. Scroll Animations (Fade in on scroll)
    3. Mobile Menu Logic
*/

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Init Particles (Background) ---
    // Checks if the particles library is loaded before running
    if (window.particlesJS) {
        particlesJS("global-particles-bg", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                // Invisible dots, only lines
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.0, "random": false },
                "size": { "value": 0, "random": false },
                // Visible Lines
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

    // --- 2. Scroll Animations ---
    // Finds all elements with class 'scroll-fx' and adds 'active' when visible
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Delay slightly to ensure page load
    setTimeout(() => {
        document.querySelectorAll('.scroll-fx').forEach(el => observer.observe(el));
    }, 500);


    // --- 3. Mobile Menu Toggle Logic ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            // Show menu
            menu.classList.remove('hidden');
            btn.setAttribute('aria-expanded', 'true');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                menu.classList.remove('opacity-0', 'translate-x-full');
            }, 10);

            // Enhance accessibility by moving focus to the menu close button
            if (closeBtn) {
                setTimeout(() => closeBtn.focus(), 50);
            }
        });

        const closeMenu = () => {
            // Hide animation first
            menu.classList.add('opacity-0', 'translate-x-full');
            btn.setAttribute('aria-expanded', 'false');
            // Then hide element after transition matches CSS duration
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 300);

            // Return focus to trigger button for accessibility
            btn.focus();
        };

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    }

    // --- 4. 3D Tilt Effect for Cards ---
    // Only applies on desktops with fine pointers (mouse)
    const cards = document.querySelectorAll('.card-3d');
    const isDesktop = window.matchMedia('(pointer:fine)').matches;

    if (isDesktop) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const midX = rect.width / 2;
                const midY = rect.height / 2;
                // Subtle rotation limits
                const rotateX = ((y - midY) / midY) * -5;
                const rotateY = ((x - midX) / midX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
            });
        });
    }

});
