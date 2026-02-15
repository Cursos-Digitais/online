// COUNTDOWN TIMER
const countdownTime = 2 * 60 * 60 * 1000;
let endTime = new Date(Date.now() + countdownTime);

function updateCountdown() {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        endTime = new Date(Date.now() + countdownTime);
        updateCountdown();
        return;
    }
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    const hoursElements = document.querySelectorAll('#hours, #final-hours');
    const minutesElements = document.querySelectorAll('#minutes, #final-minutes');
    const secondsElements = document.querySelectorAll('#seconds, #final-seconds');
    
    hoursElements.forEach(el => {
        if (el) el.textContent = hours.toString().padStart(2, '0');
    });
    
    minutesElements.forEach(el => {
        if (el) el.textContent = minutes.toString().padStart(2, '0');
    });
    
    secondsElements.forEach(el => {
        if (el) el.textContent = seconds.toString().padStart(2, '0');
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();

// NOTIFICAÇÕES DE VENDAS
const salesNotifications = [
    "✅ <strong>Maria S.</strong> acabou de adquirir o ebook!",
    "✅ <strong>João P.</strong> comprou o pacote completo!",
    "✅ <strong>Ana L.</strong> garantiu sua vaga com desconto!",
    "✅ <strong>Carlos R.</strong> acabou de fazer a compra!",
    "✅ <strong>Fernanda M.</strong> adquiriu os dois ebooks!",
    "✅ <strong>Roberto S.</strong> comprou agora mesmo!"
];

let notificationIndex = 0;

function showSalesNotification() {
    const notification = document.getElementById('salesNotification');
    const notificationContent = notification.querySelector('.notification-content span');
    
    notification.classList.add('show');
    notificationContent.innerHTML = salesNotifications[notificationIndex];
    notificationIndex = (notificationIndex + 1) % salesNotifications.length;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

setTimeout(showSalesNotification, 3000);
setInterval(showSalesNotification, 15000 + Math.random() * 10000);

// CONTADOR ANIMADO
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, 0, target, 2000);
    });
});

// FAQ ACCORDION
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
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
    
    if (faqQuestions.length > 0) {
        faqQuestions[0].classList.add('active');
        faqQuestions[0].nextElementSibling.classList.add('open');
    }
});

// ROTACIONAR VENDAS RECENTES
function rotateRecentSales() {
    const salesItems = document.querySelectorAll('.sale-item');
    if (salesItems.length > 0) {
        const firstItem = salesItems[0];
        firstItem.parentNode.appendChild(firstItem);
    }
}

if (document.querySelector('.sales-list')) {
    setInterval(rotateRecentSales, 10000);
}
