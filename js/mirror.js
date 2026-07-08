(function() {
    const canvas = document.getElementById('mirror-canvas');
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let time = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function drawMirror() {
        time += 0.009;

        ctx.fillStyle = '#0e0e1a';
        ctx.fillRect(0, 0, width, height);

        // Deep color layer — the purple-pink base
        const depths = [
            { hue: 310, x: 0.3, y: 0.4, drift: 1.4, phase: 0 },
            { hue: 280, x: 0.6, y: 0.6, drift: 1.1, phase: 1.8 },
            { hue: 260, x: 0.2, y: 0.7, drift: 1.7, phase: 3.2 },
            { hue: 330, x: 0.7, y: 0.3, drift: 1.3, phase: 0.7 },
            { hue: 290, x: 0.5, y: 0.5, drift: 1.6, phase: 4.1 },
            { hue: 200, x: 0.8, y: 0.6, drift: 0.9, phase: 2.5 },
        ];

        depths.forEach((g, i) => {
            const cx = width * (g.x + Math.sin(time * g.drift + g.phase) * 0.25);
            const cy = height * (g.y + Math.cos(time * g.drift * 0.8 + g.phase) * 0.25);
            const radius = Math.max(width, height) * 0.55;

            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            gradient.addColorStop(0, `hsla(${g.hue}, 85%, 40%, 0.6)`);
            gradient.addColorStop(0.4, `hsla(${g.hue}, 80%, 30%, 0.35)`);
            gradient.addColorStop(1, `hsla(${g.hue}, 80%, 20%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        });

        // Pearl layer — white-silver blobs that drift through the color
        const pearls = [
            { x: 0.25, y: 0.35, drift: 1.9, phase: 0.5, size: 0.35 },
            { x: 0.7,  y: 0.55, drift: 1.5, phase: 2.8, size: 0.3 },
            { x: 0.5,  y: 0.2,  drift: 2.2, phase: 4.0, size: 0.25 },
            { x: 0.4,  y: 0.8,  drift: 1.7, phase: 1.3, size: 0.28 },
        ];

        ctx.globalCompositeOperation = 'screen';

        pearls.forEach((p) => {
            const cx = width * (p.x + Math.sin(time * p.drift + p.phase) * 0.3);
            const cy = height * (p.y + Math.cos(time * p.drift * 0.7 + p.phase) * 0.3);
            const radius = Math.max(width, height) * p.size;

            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            gradient.addColorStop(0, 'hsla(300, 20%, 85%, 0.25)');
            gradient.addColorStop(0.3, 'hsla(280, 15%, 75%, 0.12)');
            gradient.addColorStop(0.7, 'hsla(260, 10%, 65%, 0.04)');
            gradient.addColorStop(1, 'hsla(260, 10%, 60%, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        });

        ctx.globalCompositeOperation = 'source-over';

        // Shimmer bands — faster, more visible
        for (let i = 0; i < 4; i++) {
            const y = height * (0.2 + i * 0.2 + Math.sin(time * 0.8 + i * 1.7) * 0.18);
            const bandGradient = ctx.createLinearGradient(0, y - 50, 0, y + 50);
            bandGradient.addColorStop(0, 'hsla(290, 30%, 80%, 0)');
            bandGradient.addColorStop(0.5, 'hsla(290, 30%, 80%, 0.08)');
            bandGradient.addColorStop(1, 'hsla(290, 30%, 80%, 0)');

            ctx.fillStyle = bandGradient;
            ctx.fillRect(0, y - 50, width, 100);
        }

        requestAnimationFrame(drawMirror);
    }

    window.addEventListener('resize', resize);
    resize();
    drawMirror();
})();