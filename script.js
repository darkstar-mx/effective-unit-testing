const deck = document.getElementById('deck');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');
const progressBar = document.getElementById('progressBar');
let slides = [];
let current = 0;

async function loadSlides() {
    const manifestResponse = await fetch('content/slides.json');
    if (!manifestResponse.ok) {
        throw new Error(`Unable to load slide manifest: ${manifestResponse.status}`);
    }

    const slidePaths = await manifestResponse.json();
    const slideMarkup = await Promise.all(slidePaths.map(async path => {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Unable to load slide file: ${path}`);
        }

        return response.text();
    }));

    deck.innerHTML = slideMarkup.join('\n');
    slides = [...deck.querySelectorAll('.slide')];
}

function renderLoadError(message) {
    deck.innerHTML = `
        <section class="slide active">
            <h2>Slides Failed to Load</h2>
            <p class="rule">${message}</p>
            <p class="notes">Serve this presentation over HTTP instead of opening <code>index.html</code> directly from the file system.</p>
        </section>
    `;
    slides = [...deck.querySelectorAll('.slide')];
    counter.textContent = '1 / 1';
    progressBar.style.width = '100%';
}

function showSlide(index) {
    if (!slides.length) {
        return;
    }

    current = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    counter.textContent = `${current + 1} / ${slides.length}`;
    progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
    slides[current].scrollTop = 0
}

prevBtn.addEventListener('click', () => showSlide(current - 1));
nextBtn.addEventListener('click', () => showSlide(current + 1));
window.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        showSlide(current + 1)
    }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        showSlide(current - 1)
    }
    if (event.key === 'Home') showSlide(0);
    if (event.key === 'End') showSlide(slides.length - 1)
});

async function initSlides() {
    try {
        await loadSlides();
        showSlide(0);
    } catch (error) {
        console.error(error);
        renderLoadError(error.message);
    }
}

initSlides();

const canvas = document.getElementById('tech-bg');
const ctx = canvas.getContext('2d');
let width, height, points;

function resize() {
    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    const count = Math.min(90, Math.floor(window.innerWidth / 16));
    points = Array.from({length: count}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .35 * devicePixelRatio,
        vy: (Math.random() - .5) * .35 * devicePixelRatio
    }))
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.1 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.55)';
        ctx.fill()
    }
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const a = points[i];
            const b = points[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const max = 150 * devicePixelRatio;
            if (distance < max) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(91, 124, 250, ${0.18 * (1 - distance / max)})`;
                ctx.lineWidth = 1 * devicePixelRatio;
                ctx.stroke()
            }
        }
    }
    requestAnimationFrame(animate)
}

window.addEventListener('resize', resize);
resize();
animate();
