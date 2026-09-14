const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.13 });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach((item) => item.classList.add('visible'));
}
