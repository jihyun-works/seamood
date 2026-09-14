const daysContainer = document.querySelector('#calendar-days');
const classSelect = document.querySelector('#class-select');
const peopleSelect = document.querySelector('#people');
const bookingSummary = document.querySelector('#booking-summary');
let selectedDay = 19;
let selectedTime = '13:00';

function updateSummary() {
    bookingSummary.textContent = `2026.07.${String(selectedDay).padStart(2, '0')}. · ${classSelect.value} · ${selectedTime} · ${peopleSelect.value}`;
}

for (let day = 1; day <= 31; day += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = day;
    if (day === selectedDay) button.classList.add('selected');
    button.addEventListener('click', () => {
        selectedDay = day;
        daysContainer.querySelector('.selected')?.classList.remove('selected');
        button.classList.add('selected');
        updateSummary();
    });
    daysContainer.appendChild(button);
}

document.querySelectorAll('.times button').forEach((button) => {
    if (button.textContent === selectedTime) button.classList.add('selected');
    button.addEventListener('click', () => {
        selectedTime = button.textContent;
        document.querySelector('.times .selected')?.classList.remove('selected');
        button.classList.add('selected');
        updateSummary();
    });
});

[classSelect, peopleSelect].forEach((element) => element.addEventListener('change', updateSummary));

document.querySelector('#reservation-form').addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('.reserve-button').textContent = '예약 정보가 저장되었습니다';
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
