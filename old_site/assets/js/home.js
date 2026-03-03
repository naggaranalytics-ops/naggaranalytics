/*
    ==========================================================================
    HOME PAGE SCRIPTS
    ==========================================================================
    Contains specific logic for:
    1. Regression Line Canvas Animation
    2. Bell Curve Canvas Animation
    3. Timeline Fill Animation (Process Section)
*/

// --- 1. REGRESSION CANVAS ANIMATION ---
(function () {
    const canvas = document.getElementById('reg-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const b0 = document.getElementById('b0');
    const b1 = document.getElementById('b1');

    let ctx, width, height;
    let points = [];

    // Animation Variables
    let currentProgress = 0;
    let targetProgress = 0;

    // Resize & Init Logic
    function init() {
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
        ctx.scale(dpr, dpr);

        generatePoints();
        draw(0);
        loop();
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

    // Draw Frame
    function draw(p) {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        const ease = 1 - Math.pow(1 - p, 3);

        // Draw Dots
        ctx.fillStyle = '#48c9b0'; // Teal
        points.forEach(pt => {
            pt.cx = pt.sx + (pt.tx - pt.sx) * ease;
            pt.cy = pt.sy + (pt.ty - pt.sy) * ease;

            ctx.beginPath();
            ctx.arc(pt.cx, pt.cy, pt.r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Line (Only appears after 15% scroll)
        if (p > 0.15) {
            const lineProg = (p - 0.15) / 0.7;
            const len = Math.min(Math.max(lineProg, 0), 1);

            if (len > 0) {
                const x1 = width * 0.05;
                const y1 = height * (1 - 0.23);
                const x2 = width * 0.95;
                const y2 = height * (1 - 0.77);

                ctx.strokeStyle = '#fbbf24'; // Yellow
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x1 + (x2 - x1) * len, y1 + (y2 - y1) * len);
                ctx.stroke();

                // Update Text
                if (b0 && b1) {
                    b0.innerText = (10 + len * 15).toFixed(0);
                    b1.innerText = (len * 0.85).toFixed(2);
                }
            }
        }
    }

    // Animation Loop
    function loop() {
        const section = document.getElementById('method');
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
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', init, { passive: true });
    // Slight delay to allow DOM to settle
    setTimeout(init, 100);
})();

// --- 2. BELL CURVE CANVAS ANIMATION ---
(function () {
    const canvas = document.getElementById('bell-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;

    const boxSig = document.getElementById('box-sig');
    const tagL = document.getElementById('sig-tag-left');
    const tagR = document.getElementById('sig-tag-right');

    let ctx, width, height;
    let currentProgress = 0;
    let targetProgress = 0;

    function pdf(x) {
        return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    }

    function init() {
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
        ctx.scale(dpr, dpr);

        draw(0);
        loop();
    }

    function draw(p) {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        const baseY = height * 0.85;
        const scaleX = width / 8;
        const scaleY = height * 0.7 * 2.5;
        const centerX = width / 2;

        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(width, baseY);
        ctx.stroke();

        ctx.strokeStyle = '#cbd5e1';
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

        updateUI(p);
    }

    function updateUI(p) {
        if (p > 0.5) {
            boxSig.style.opacity = '1';
            boxSig.style.borderColor = '#fbbf24';
            boxSig.style.background = 'rgba(251, 191, 36, 0.05)';
            tagL.style.opacity = '1';
            tagL.style.transform = 'translateY(0)';
            tagR.style.opacity = '1';
            tagR.style.transform = 'translateY(0)';
        } else {
            boxSig.style.opacity = '0.5';
            boxSig.style.borderColor = 'transparent';
            boxSig.style.background = 'transparent';
            tagL.style.opacity = '0';
            tagL.style.transform = 'translateY(20px)';
            tagR.style.opacity = '0';
            tagR.style.transform = 'translateY(20px)';
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
            }
        }
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', init, { passive: true });
    setTimeout(init, 100);
})();

// --- 3. TIMELINE FILL ANIMATION ---
(function () {
    const procSec = document.getElementById('process-section');
    const lineFill = document.getElementById('line-fill');
    const rows = document.querySelectorAll('.step-row');
    const finalDot = document.getElementById('final-dot');

    function updateTimeline() {
        if (!procSec || !finalDot) return;

        const rect = procSec.getBoundingClientRect();
        const wh = window.innerHeight;
        const containerRect = document.querySelector('.timeline-container').getBoundingClientRect();
        const dotRect = finalDot.getBoundingClientRect();

        let startOffset = wh * 0.5;
        const maxFillHeight = (dotRect.top - containerRect.top) + (dotRect.height / 2);
        let scrolled = (wh - rect.top) - startOffset;
        let currentHeight = Math.max(0, Math.min(scrolled, maxFillHeight));

        if (lineFill) lineFill.style.height = currentHeight + 'px';

        rows.forEach(row => {
            const dot = row.querySelector('.step-dot');
            const card = row.querySelector('.step-card');
            const rowTop = row.getBoundingClientRect().top - containerRect.top + (dot.offsetHeight / 2);

            if (currentHeight >= rowTop - 10) {
                dot.classList.add('active');
                card.classList.add('active');
            } else {
                dot.classList.remove('active');
                card.classList.remove('active');
            }
        });
    }

    // Performance: Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateTimeline();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Performance: Debounce/passive resize event
    window.addEventListener('resize', updateTimeline, { passive: true });
    setTimeout(updateTimeline, 100);
})();
