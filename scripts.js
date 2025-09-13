// Interactions & polish

// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Pointer interaction: subtle pop/tilt & glow position update
document.addEventListener('pointermove', (e) => {
  document.querySelectorAll('.card.glow').forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rect.width > 0 && rect.height > 0) {
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    }

    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      const offsetX = (x - rect.width / 2) / 60;
      const offsetY = (y - rect.height / 2) / 140;
      card.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.01)`;
      card.style.transition = "transform .12s ease-out";
    } else {
      card.style.transform = '';
    }
  });
});

// Reset on pointerleave
document.addEventListener('pointerleave', () => {
  document.querySelectorAll('.card.glow').forEach(card => {
    card.style.transform = '';
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Observe cards
document.querySelectorAll('.card').forEach(el => {
  if (!el.classList.contains('pre')) el.classList.add('pre');
  io.observe(el);
});

// Pre / in animation style injection
const style = document.createElement('style');
style.textContent = `
  .card.pre { opacity: 0; transform: translateY(10px); }
  .card.in { opacity: 1; transform: translateY(0); transition: opacity .4s ease, transform .4s ease; }
`;
document.head.appendChild(style);
