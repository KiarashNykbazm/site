// =================== متغیرهای سراسری ===================
let currentQuestionIndex = 0;
let userAnswers = [];
const PASSWORD = "0519";

// تاریخ ماهگرد بعدی (۱۹ دی ۱۴۰۴)
const nextAnniversary = new Date(2025, 0, 8, 0, 0, 0); // January 8, 2026 = 19 Dey 1404

// =================== صفحه ورود ===================
document.getElementById('unlockBtn').addEventListener('click', checkPassword);
document.getElementById('passwordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    
    if (input === PASSWORD) {
        // صحیح - انیمیشن باز شدن قفل
        document.querySelector('.lock').textContent = '🔓';
        
        setTimeout(() => {
            showPage('timelinePage');
            startCountdown();
            initTreasures();
        }, 800);
    } else {
        // اشتباه - لرزش
        const passwordBox = document.querySelector('.password-box');
        passwordBox.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            passwordBox.style.animation = '';
            document.getElementById('passwordInput').value = '';
        }, 500);
    }
}

// =================== تابع نمایش صفحات ===================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // اسکرول به بالا
    window.scrollTo(0, 0);
}

// =================== شمارش معکوس ===================
function startCountdown() {
    setInterval(() => {
        const now = new Date();
        const diff = nextAnniversary - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        }
    }, 1000);
}

// =================== گنج‌های پنهان ===================
function initTreasures() {
    const treasures = document.querySelectorAll('.treasure-icon');
    let foundCount = 0;
    
    treasures.forEach(treasure => {
        treasure.addEventListener('click', function() {
            if (!this.classList.contains('found')) {
                this.classList.add('found');
                foundCount++;
                
                // جلوه ویژه
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { 
                        x: this.offsetLeft / window.innerWidth,
                        y: this.offsetTop / window.innerHeight
                    }
                });
                
                // اگر همه رو پیدا کرد
                if (foundCount === treasures.length) {
                    setTimeout(() => {
                        alert('آفرین! همه گنج‌ها رو پیدا کردی! 🎉');
                    }, 500);
                }
            }
        });
    });
}

// =================== بازی‌های مینی ===================
function playGame(monthNumber) {
    const modal = document.getElementById('gameModal');
    const gameContent = document.getElementById('gameContent');
    
    let gameHTML = '';
    
    switch(monthNumber) {
        case 1:
            gameHTML = `
                <h3>🎂 بازی ماه اول: حافظه!</h3>
                <p>کدوم کیک تولد بود؟</p>
                <div class="memory-game">
                    <div class="cake-option" onclick="selectCake(1)">🎂</div>
                    <div class="cake-option" onclick="selectCake(2)">🍰</div>
                    <div class="cake-option" onclick="selectCake(3)">🧁</div>
                </div>
                <p class="game-hint">همون که با شمع‌های صورتی بود!</p>
            `;
            break;
        case 2:
            gameHTML = `
                <h3>🌙 بازی ماه دوم: چی گفتیم؟</h3>
                <p>تو اون شب کدوم یکی از این‌ها رو بیشتر گفتیم؟</p>
                <div class="word-game">
                    <button class="word-option" onclick="selectWord('خوابم میاد')">😴 خوابم میاد</button>
                    <button class="word-option" onclick="selectWord('نخواب')">😁 نخواب، حرف بزن</button>
                    <button class="word-option" onclick="selectWord('دوستت دارم')">❤️ دوستت دارم</button>
                </div>
            `;
            break;
        case 3:
            gameHTML = `
                <h3>😍 بازی ماه سوم: اولین عکس!</h3>
                <p>اولین حسم وقتی عکست رو دیدم چی بود؟</p>
                <div class="feeling-game">
                    <button class="feeling-option" onclick="selectFeeling('وای!')">😮 وای چه خوشگل!</button>
                    <button class="feeling-option" onclick="selectFeeling('عاشقش شدم')">😍 عاشقش شدم</button>
                    <button class="feeling-option" onclick="selectFeeling('قلبم ایستاد')">💓 قلبم ایستاد</button>
                </div>
            `;
            break;
        case 4:
            gameHTML = `
                <h3>💝 بازی ماه چهارم: آینده!</h3>
                <p>کدوم یکی از این‌ها رو میخوای باهم تجربه کنیم؟</p>
                <div class="future-game">
                    <button class="future-option" onclick="selectFuture('سفر')">✈️ یه سفر خاص</button>
                    <button class="future-option" onclick="selectFuture('رستوران')">🍽️ شام تو رستوران فانتزی</button>
                    <button class="future-option" onclick="selectFuture('همه')">💕 همه‌شون!</button>
                </div>
            `;
            break;
    }
    
    gameContent.innerHTML = gameHTML;
    modal.style.display = 'block';
}

// بستن مودال
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('gameModal').style.display = 'none';
});

// توابع انتخاب در بازی‌ها
function selectCake(num) {
    alert(num === 1 ? 'آفرین! درست حدس زدی! 🎉' : 'نزدیک بود! بازم امتحان کن 😊');
    document.getElementById('gameModal').style.display = 'none';
}

function selectWord(word) {
    alert(`خوب انتخاب کردی! واقعاً "${word}" زیاد گفتیم 😄`);
    document.getElementById('gameModal').style.display = 'none';
}

function selectFeeling(feeling) {
    alert('دقیقاً همین حس بود! 💕');
    document.getElementById('gameModal').style.display = 'none';
}

function selectFuture(choice) {
    if (choice === 'همه') {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
    alert('قول میدم حتماً اینا رو باهم انجام بدیم! 💖');
    document.getElementById('gameModal').style.display = 'none';
}

// =================== صفحه کوئیز ===================
function goToQuiz() {
    showPage('quizPage');
}

function selectAnswer(questionNum, answer) {
    userAnswers[questionNum - 1] = answer;
    
    // علامت‌گذاری دکمه انتخاب شده
    const options = document.querySelectorAll(`[data-question="${questionNum}"] .quiz-option`);
    options.forEach(opt => opt.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // نمایش سوال بعدی
    setTimeout(() => {
        const currentQ = document.querySelector(`[data-question="${questionNum}"]`);
        const nextQ = document.querySelector(`[data-question="${questionNum + 1}"]`);
        
        if (nextQ) {
            currentQ.classList.add('hidden');
            nextQ.classList.remove('hidden');
        } else {
            // تمام شد - نمایش دکمه نهایی
            currentQ.classList.add('hidden');
            document.querySelector('.btn-final').classList.remove('hidden');
        }
    }, 500);
}

function goToFinal() {
    showPage('finalPage');
    
    // کنفتی جشن!
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, 500);
    
    initEnvelope();
    initEasterEgg();
}



// =================== ادامه انیمیشن پاکت ===================
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    
    envelope.addEventListener('click', function() {
        this.classList.add('opened');
        
        setTimeout(() => {
            letter.classList.remove('hidden');
            
            // کنفتی!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 700);
    });
}

// =================== Easter Egg ===================
function initEasterEgg() {
    const trigger = document.getElementById('easterEgg');
    const content = document.getElementById('easterEggContent');
    let clickCount = 0;
    let clickTimeout;
    
    trigger.addEventListener('click', function() {
        clickCount++;
        
        // ریست تایمر
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            clickCount = 0;
        }, 1000);
        
        // بعد از 3 کلیک
        if (clickCount === 3) {
            content.classList.remove('hidden');
            
            // انفجار کنفتی!
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            
            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });
            }, 100);
            
            clickCount = 0;
        }
    });
}

// =================== افکت‌های اضافی ===================

// پروانه‌های متحرک
function createButterflies() {
    const container = document.querySelector('.timeline');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const butterfly = document.createElement('div');
            butterfly.className = 'butterfly';
            butterfly.innerHTML = '🦋';
            butterfly.style.cssText = `
                position: fixed;
                font-size: 2em;
                pointer-events: none;
                z-index: 1000;
                animation: flyButterfly ${5 + Math.random() * 3}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0.6;
            `;
            
            document.body.appendChild(butterfly);
            
            // حذف بعد از مدتی
            setTimeout(() => {
                butterfly.remove();
            }, 8000);
        }, i * 2000);
    }
}

// اضافه کردن استایل انیمیشن پروانه
const style = document.createElement('style');
style.textContent = `
    @keyframes flyButterfly {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(100px, -100px) rotate(90deg);
        }
        50% {
            transform: translate(200px, 50px) rotate(180deg);
        }
        75% {
            transform: translate(100px, 150px) rotate(270deg);
        }
        100% {
            transform: translate(0, 0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// شروع پروانه‌ها وقتی صفحه تایم‌لاین نمایش داده شد
const originalShowPage = showPage;
showPage = function(pageId) {
    originalShowPage(pageId);
    
    if (pageId === 'timelinePage') {
        setTimeout(() => {
            createButterflies();
        }, 1000);
    }
};

// =================== موزیک پس‌زمینه (اختیاری) ===================
// اگر می‌خوای موزیک اضافه کنی، این کد رو uncomment کن و یه فایل mp3 اضافه کن

/*
const bgMusic = new Audio('music/background.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

document.body.addEventListener('click', function() {
    bgMusic.play();
}, { once: true });
*/

// =================== انیمیشن اسکرول ===================
window.addEventListener('scroll', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
});

// =================== جلوگیری از بستن تصادفی مودال ===================
window.addEventListener('click', function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// =================== پیام خوش‌آمدگویی در کنسول ===================
console.log('%c💕 ساخته شده با عشق برای نرگس 💕', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%c4 ماه... و قراره خیلی بیشتر باشه! 🌸', 'color: #ff9a9e; font-size: 14px;');

// =================== ذخیره پیشرفت (Local Storage) ===================
function saveProgress(page) {
    localStorage.setItem('currentPage', page);
}

function loadProgress() {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage && savedPage !== 'loginPage') {
        // اگر قبلاً لاگین کرده، مستقیم به صفحه ذخیره شده برو
        // showPage(savedPage);
        // startCountdown();
    }
}

// بارگذاری پیشرفت هنگام لود صفحه
// loadProgress();

console.log('✅ اسکریپت بارگذاری شد!');
