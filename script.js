// COUNTDOWN
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
    
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// NOTIFICAÇÕES
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
    
    const notificationContent = notification.querySelector('.notification-content span');
    notification.classList.add('show');
    notificationContent.innerHTML = salesNotifications[notificationIndex];
    notificationIndex = (notificationIndex + 1) % salesNotifications.length;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

setTimeout(showSalesNotification, 3000);
setInterval(showSalesNotification, 20000);

// CONTADOR ANIMADO
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
    });
});

// FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isActive = this.classList.contains('active');
        
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('open');
        });
        
        if (!isActive) {
            this.classList.add('active');
            answer.classList.add('open');
        }
    });
});
