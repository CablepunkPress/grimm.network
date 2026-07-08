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
        time += 0.005;

        // Background base
        ctx.fillStyle = '#1a1a2a';
        ctx.fillRect(0, 0, width, height);

        // Multiple drifting radial gradients in pastel colors
        const gradients = [
            { hue: 320, x: 0.3, y: 0.4, drift: 1.0 },  // pink
            { hue: 270, x: 0.6, y: 0.6, drift: 0.7 },  // purple
            { hue: 180, x: 0.7, y: 0.3, drift: 1.3 },  // mint
            { hue: 200, x: 0.4, y: 0.7, drift: 0.9 },  // cyan
            { hue: 50, x: 0.5, y: 0.5, drift: 1.1 },   // pale yellow
        ];

        ctx.globalCompositeOperation = 'screen';

        gradients.forEach((g, i) => {
            const cx = width * (g.x + Math.sin(time * g.drift + i) * 0.2);
            const cy = height * (g.y + Math.cos(time * g.drift + i * 1.3) * 0.2);
            const radius = Math.max(width, height) * 0.5;

            const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            gradient.addColorStop(0, `hsla(${g.hue}, 70%, 75%, 0.7)`);
            gradient.addColorStop(1, `hsla(${g.hue}, 70%, 75%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        });

        ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(drawMirror);
    }

    window.addEventListener('resize', resize);
    resize();
    drawMirror();
})();