const colors = ['red', 'blue', 'green', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;
let isPlaying = true;

const levelDisplay = document.getElementById('level');
const startBtn = document.getElementById('start-btn');

// إضاءة الزر
function flash(color) {
    const btn = document.getElementById(color);
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 500);
}

// تشغيل التسلسل
function playSequence() {
    let i = 0;
    isPlaying = true;
    const interval = setInterval(() => {
        flash(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            isPlaying = false;
        }
    }, 700);
}

// إضافة لون جديد للتسلسل
function nextRound() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    level++;
    levelDisplay.textContent = `المستوى: ${level}`;
    playerSequence = [];
    setTimeout(playSequence, 500);
}

// التحقق من النقرات
function handleClick(color) {
    if (isPlaying) return;

    flash(color);
    playerSequence.push(color);
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        alert(`لقد خسرت,وصلت للمستوى ${level}`);
        resetGame();
        if (confirm('أتريداللعب مرة أخرى؟')) {
            startGame();
        }

        return;
    }

    if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}

// بدء اللعبة
function startGame() {
    startBtn.classList.add('hidden');
    sequence = [];
    playerSequence = [];
    level = 0;
    levelDisplay.textContent = `المستوى: ${level}`;
    nextRound();
}

// إعادة تعيين اللعبة
function resetGame() {
    startBtn.classList.remove('hidden');
    sequence = [];
    playerSequence = [];
    level = 0;
    levelDisplay.textContent = `المستوى: 0`;
    isPlaying = false;
}

// ربط الأحداث
colors.forEach(color => {
    document.getElementById(color).addEventListener('click', () => handleClick(color));
});

startBtn.addEventListener('click', startGame);