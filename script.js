// ============================================
// 1. COUNTDOWN TIMER
// ============================================
const countdownTime = 2 * 60 * 60 * 1000; // 2 horas
let endTime = new Date(Date.now() + countdownTime);

function updateCountdown() {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        endTime = new Date(Date.now() + countdownTime);
    }
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Atualiza os elementos do countdown (incluindo o final)
    document.querySelectorAll('#hours, #final-hours').forEach(el => {
        if (el) el.textContent = hours.toString().padStart(2, '0');
    });
    
    document.querySelectorAll('#minutes, #final-minutes').forEach(el => {
        if (el) el.textContent = minutes.toString().padStart(2, '0');
    });
    
    document.querySelectorAll('#seconds, #final-seconds').forEach(el => {
        if (el) el.textContent = seconds.toString().padStart(2, '0');
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================
// 2. CONTADOR ANIMADO (288 pessoas, 4.9)
// ============================================
function animateCounters() {
    document.querySelectorAll('.counter-number').forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ============================================
// 3. FAQ ACCORDION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling?.classList.remove('open');
            });
            if (!isActive) {
                this.classList.add('active');
                this.nextElementSibling?.classList.add('open');
            }
        });
    });
    
    const firstFaq = document.querySelector('.faq-question');
    if (firstFaq) {
        firstFaq.classList.add('active');
        firstFaq.nextElementSibling?.classList.add('open');
    }
});
