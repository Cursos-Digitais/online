// ============================================
// 1. COUNTDOWN TIMER
// ============================================
const countdownTime = 2 * 60 * 60 * 1000;
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
// 2. NOTIFICAÇÕES DE VENDAS
// ============================================
const salesNotifications = [
    "✅ Maria S. acabou de adquirir o ebook!",
    "✅ João P. comprou o pacote completo!",
    "✅ Ana L. garantiu sua vaga com desconto!",
    "✅ Carlos R. acabou de fazer a compra!"
];

let notificationIndex = 0;

function showSalesNotification() {
    const notification = document.getElementById('salesNotification');
    if (!notification) return;
    
    const span = notification.querySelector('.notification-content span');
    notification.classList.add('show');
    span.innerHTML = salesNotifications[notificationIndex];
    notificationIndex = (notificationIndex + 1) % salesNotifications.length;
    
    setTimeout(() => notification.classList.remove('show'), 5000);
}

setTimeout(showSalesNotification, 3000);
setInterval(showSalesNotification, 20000);

// ============================================
// 3. CONTADOR ANIMADO
// ============================================
function animateCounters() {
    document.querySelectorAll('.counter-number').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ============================================
// 4. FAQ ACCORDION
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

// ============================================
// 5. VENDAS RECENTES (ROTATIVO)
// ============================================
if (document.querySelector('.sales-list')) {
    setInterval(() => {
        const list = document.querySelector('.sales-list');
        if (list?.children.length > 1) {
            list.appendChild(list.children[0]);
        }
    }, 10000);
}

// ============================================
// 6. WHATSAPP/EMAIL TRACKING
// ============================================
document.querySelectorAll('a[href*="whatsapp"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        if (typeof fbq !== 'undefined') fbq('track', 'Contact');
    });
});
