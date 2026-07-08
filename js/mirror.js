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
        time += 0.004;

        ctx.fillStyle = '#0e0e1a';
        ctx.fillRect(0, 0, width, height);

        const gradients = [
            { hue: 310, x: 0.3, y: 0.4, drift: 1.0 },   // deep pink
            { hue: 280, x: 0.6, y: 0.6, drift: 0.7 },   // violet
            { hue: 260, x: 0.2, y: 0.7, drift: 1.3 },   // purple
            { hue: 330, x: 0.7, y: 0.3, drift: 0.9 },   // magenta
            { hue: 290, x: 0.5, y: 0.5, drift: 1.1 },   // orchid
            { hue: 200, x: 0.8, y: 0.6, drift: 0.6 },   // teal accent
        ];

        gradients.forEach((g, i) => {
            const cx = width * (g.x + Math.sin(time * g.drift + i) * 0.2);
            const cy = height * (g.y + Math.cos(time * g.drift + i * 1.3) * 0.2);
            const radius = Math.max(width, height) * 0.55;

            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            gradient.addColorStop(0, `hsla(${g.hue}, 85%, 40%, 0.6)`);
            gradient.addColorStop(0.4, `hsla(${g.hue}, 80%, 30%, 0.35)`);
            gradient.addColorStop(1, `hsla(${g.hue}, 80%, 20%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        });

        // Highlight bands — slow-moving light streaks across the surface
        for (let i = 0; i < 3; i++) {
            const y = height * (0.3 + i * 0.25 + Math.sin(time * 0.3 + i * 2) * 0.15);
            const bandGradient = ctx.createLinearGradient(0, y - 60, 0, y + 60);
            bandGradient.addColorStop(0, 'hsla(300, 60%, 50%, 0)');
            bandGradient.addColorStop(0.5, 'hsla(300, 60%, 50%, 0.06)');
            bandGradient.addColorStop(1, 'hsla(300, 60%, 50%, 0)');

            ctx.fillStyle = bandGradient;
            ctx.fillRect(0, y - 60, width, 120);
        }

        requestAnimationFrame(drawMirror);
    }

    window.addEventListener('resize', resize);
    resize();
    drawMirror();
})();