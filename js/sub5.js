const inquiryType = document.querySelector('#inquiry-type');

document.querySelectorAll('.inquiry-grid button').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.inquiry-grid button').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        inquiryType.value = button.dataset.type;
    });
});

document.querySelector('.contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = event.currentTarget.querySelector('button[type="submit"]');
    submitButton.textContent = '문의가 접수되었습니다';
    submitButton.disabled = true;
});

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
