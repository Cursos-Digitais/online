// ============================================
// 1. COUNTDOWN TIMER (CRONÔMETRO FUNCIONAL)
// ============================================

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

// ============================================
// 2. NOTIFICAÇÕES DE VENDAS FALSAS
// ============================================

const salesNotifications = [
    "✅ <strong>Maria S.</strong> acabou de adquirir o ebook!",
    "✅ <strong>João P.</strong> comprou o pacote completo!",
    "✅ <strong>Ana L.</strong> garantiu sua vaga com desconto!",
    "✅ <strong>Carlos R.</strong> acabou de fazer a compra!",
    "✅ <strong>Fernanda M.</strong> adquiriu os dois ebooks!",
    "✅ <strong>Roberto S.</strong> comprou agora mesmo!",
    "✅ <strong>Patrícia T.</strong> acabou de se inscrever!",
    "✅ <strong>Lucas M.</strong> garantiu o acesso imediato!"
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

// ============================================
// 3. CONTADOR ANIMADO (PESSOAS TRANSFORMADAS)
// ============================================

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

// ============================================
// 4. FAQ ACCORDION
// ============================================

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

// ============================================
// 5. ATUALIZAR VENDAS RECENTES (ROTATIVO)
// ============================================

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
    
    // Você pode substituir por um video real depois:
    // window.open('assets/prova-vendas.mp4', '_blank');
}

// ============================================
// 7. DOWNLOAD AUTOMÁTICO (PÁGINA OBRIGADO)
// ============================================

if (window.location.pathname.includes('obrigado') || window.location.pathname.endsWith('obrigado.html')) {
    // Links dos seus PDFs no Google Drive
    const ebookLinks = {
        principal: 'https://drive.google.com/uc?export=download&id=1Xns9McqNMM-ySxMUiNs4QQnwxmcHg8F2',
        bonus: 'https://drive.google.com/uc?export=download&id=1TwFhR487y-X1Di6k9PpgYL6jRI4NRT5v'
    };
    
    const downloadMain = document.getElementById('downloadMain');
    const downloadBonus = document.getElementById('downloadBonus');
    const downloadAll = document.getElementById('downloadAll');
    
    if (downloadMain) {
        downloadMain.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(ebookLinks.principal, '_blank');
            alert('✅ Ebook principal iniciando download!');
        });
    }
    
    if (downloadBonus) {
        downloadBonus.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(ebookLinks.bonus, '_blank');
            alert('✅ Ebook bônus iniciando download!');
        });
    }
    
    if (downloadAll) {
        downloadAll.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(ebookLinks.principal, '_blank');
            setTimeout(() => {
                window.open(ebookLinks.bonus, '_blank');
            }, 1000);
            alert('✅ Iniciando download dos 2 ebooks!');
        });
    }
}

// ============================================
// 8. WHATSAPP E EMAIL TRACKING
// ============================================

document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact');
        }
    });
});

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact');
        }
    });
});
