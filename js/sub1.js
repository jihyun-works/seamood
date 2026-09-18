document.addEventListener('DOMContentLoaded', () => {
    const revealItems = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -70px'
    });

    revealItems.forEach((item) => observer.observe(item));

    const glassReborn = document.querySelector('#glass-reborn');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!glassReborn || reduceMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const photos = glassReborn.querySelectorAll('.glass-reborn_photo');
    const steps = glassReborn.querySelectorAll('.glass-reborn_steps li');
    const stepContents = glassReborn.querySelectorAll('.glass-reborn_steps li>div');

    gsap.set(photos[0], { autoAlpha: 1, scale: 1 });
    gsap.set(photos[1], { autoAlpha: 0, scale: 1.04 });
    gsap.set(steps[0], { autoAlpha: 1 });
    gsap.set(steps[1], { autoAlpha: 0.35 });
    gsap.set(stepContents, { y: 38 });

    gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
            trigger: glassReborn,
            start: 'top 45%',
            end: 'bottom 55%',
            scrub: 0.8
        }
    })
        .to(stepContents[0], { y: 0, duration: 0.5, ease: 'power2.out' }, 0)
        .to(photos[0], { autoAlpha: 0, scale: 1.04, duration: 1 }, 0.65)
        .to(photos[1], { autoAlpha: 1, scale: 1, duration: 1 }, 0.65)
        .to(steps[0], { autoAlpha: 0.35, duration: 0.45 }, 0.65)
        .to(steps[1], { autoAlpha: 1, duration: 0.45 }, 1.05)
        .to(stepContents[1], { y: 0, duration: 0.5, ease: 'power2.out' }, 1.05);
});
