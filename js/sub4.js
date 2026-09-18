const moodQuestions = [
    {
        question: '오늘의 마음에 가장 가까운 감정은 무엇인가요?',
        prefix: 'test1_emotion',
        labels: ['설렘', '위로', '그리움', '사색', '맑음', '희망']
    },
    {
        question: '마음이 머물고 싶은 바다의 시간은 언제인가요?',
        prefix: 'test2_time',
        labels: ['아침 햇살', '맑은 낮', '노을', '깊은 밤', '새벽빛', '잔잔한 오후']
    },
    {
        question: '지금 가장 끌리는 향의 결을 골라주세요.',
        prefix: 'test3_scent',
        labels: ['시트러스', '코튼', '플로럴', '우디', '아쿠아', '허벌']
    },
    {
        question: '오늘의 마음에 남기고 싶은 단어는 무엇인가요?',
        prefix: 'test4_word',
        labels: ['시작', '쉼', '온기', '사색', '그리움', '회복']
    }
];

const moodOptions = document.querySelector('#mood-options');
const moodQuestion = document.querySelector('#mood-question');
const moodSteps = document.querySelectorAll('.mood-steps b');
const prevButton = document.querySelector('.mood-prev');
const nextButton = document.querySelector('.mood-next');
const resultModal = document.querySelector('#mood-result');
const resultImage = document.querySelector('.result-image');
const resultTitle = document.querySelector('#result-title');
const resultText = document.querySelector('.result-copy p');
let currentStep = 0;
const answers = [null, null, null, null];

function renderMoodStep() {
    const current = moodQuestions[currentStep];
    moodQuestion.textContent = current.question;
    moodOptions.innerHTML = '';

    current.labels.forEach((label, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.index = index;
        if (answers[currentStep] === index) button.classList.add('selected');
        button.innerHTML = `<img src="../images/sub4/${current.prefix}${index + 1}.jpg" alt="${label}"><span>${label}</span>`;
        button.addEventListener('click', () => {
            moodOptions.querySelector('.selected')?.classList.remove('selected');
            button.classList.add('selected');
            answers[currentStep] = index;
            nextButton.disabled = false;
        });
        moodOptions.appendChild(button);
    });

    moodSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
        step.classList.toggle('completed', index < currentStep);
    });
    prevButton.disabled = currentStep === 0;
    nextButton.disabled = answers[currentStep] === null;
    nextButton.textContent = currentStep === moodQuestions.length - 1 ? '결과 보기' : '다음';
}

function openResult() {
    resultImage.src = '../images/sub4/test_result_perfume.jpg';
    resultTitle.textContent = '오늘의 향은 SEA BREEZE';
    resultText.innerHTML = '맑은 바람처럼 가볍게 흐르는 마음이에요.<br>지금의 감정을 향으로 천천히 간직해보세요.';
    resultModal.classList.add('open');
    resultModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.querySelector('.result-close').focus();
}

function closeResult() {
    resultModal.classList.remove('open');
    resultModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

prevButton.addEventListener('click', () => {
    if (currentStep === 0) return;
    currentStep -= 1;
    renderMoodStep();
});

nextButton.addEventListener('click', () => {
    if (answers[currentStep] === null) return;
    if (currentStep === moodQuestions.length - 1) {
        openResult();
        return;
    }
    currentStep += 1;
    renderMoodStep();
});

document.querySelector('.result-close').addEventListener('click', closeResult);
document.querySelector('.result-retry').addEventListener('click', () => {
    answers.fill(null);
    currentStep = 0;
    closeResult();
    renderMoodStep();
});
resultModal.addEventListener('click', (event) => { if (event.target === resultModal) closeResult(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && resultModal.classList.contains('open')) closeResult(); });

document.querySelectorAll('.filters button').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        document.querySelectorAll('.archive-grid article').forEach((card) => {
            card.classList.toggle('hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter);
        });
    });
});

document.querySelector('.more').addEventListener('click', (event) => {
    event.currentTarget.textContent = '준비 중인 기록입니다';
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

renderMoodStep();
