// ============================================
// 1. COUNTDOWN TIMER (CRONÔMETRO FUNCIONAL)
// ============================================

// Configurar tempo final (2 horas no futuro)
const countdownTime = 2 * 60 * 60 * 1000; // 2 horas em milissegundos
let endTime = new Date(Date.now() + countdownTime);

function updateCountdown() {
    const now = new Date();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        // Quando o tempo acabar, reiniciar para 2 horas
        endTime = new Date(Date.now() + countdownTime);
        updateCountdown();
        return;
    }
    
    // Calcular horas, minutos e segundos
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Atualizar displays
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

// Iniciar cronômetro
setInterval(updateCountdown, 1000);
updateCountdown(); // Executar imediatamente

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
    
    // Mostrar notificação
    notification.classList.add('show');
    
    // Atualizar mensagem
    notificationContent.innerHTML = salesNotifications[notificationIndex];
    
    // Avançar para próxima mensagem
    notificationIndex = (notificationIndex + 1) % salesNotifications.length;
    
    // Esconder após 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Mostrar primeira notificação após 3 segundos
setTimeout(showSalesNotification, 3000);

// Mostrar notificações a cada 15-25 segundos
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

// Iniciar contadores quando a página carregar
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
            
            // Fechar todas as outras respostas
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('open');
            });
            
            // Se não estava ativo, abrir esta
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('open');
            }
        });
    });
    
    // Abrir primeira pergunta por padrão
    if (faqQuestions.length > 0) {
        faqQuestions[0].classList.add('active');
        faqQuestions[0].nextElementSibling.classList.add('open');
    }
});

// ============================================
// 5. SMOOTH SCROLL PARA ÂNCORAS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 6. SIMULAÇÃO DE DOWNLOAD (PÁGINA OBRIGADO)
// ============================================

if (window.location.pathname.includes('obrigado') || window.location.pathname.endsWith('obrigado.html')) {
    // Simular links de download
    const downloadMain = document.getElementById('downloadMain');
    const downloadBonus = document.getElementById('downloadBonus');
    
    if (downloadMain) {
        downloadMain.addEventListener('click', function(e) {
            e.preventDefault();
            // No Lowify real, este botão baixaria automaticamente
            alert('✅ Ebook principal baixado com sucesso!\n\nNo Lowify real, o download seria automático após o pagamento.');
        });
    }
    
    if (downloadBonus) {
        downloadBonus.addEventListener('click', function(e) {
            e.preventDefault();
            // No Lowify real, este botão baixaria automaticamente
            alert('✅ Ebook bônus baixado com sucesso!\n\nNo Lowify real, o download seria automático após o pagamento.');
        });
    }
}

// ============================================
// 7. TRACKING DE CLICKS COM META PIXEL
// ============================================

// WhatsApp Click Tracking
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Clique no WhatsApp detectado - Suporte');
        // Disparar evento do pixel para contato
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact');
        }
    });
});

// Email Click Tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Clique no email detectado - Suporte');
        // Disparar evento do pixel para contato
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact');
        }
    });
});

// Botão de compra tracking
document.querySelectorAll('#buyButton, .final-button, .cta-button').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Clique no botão de compra detectado');
        // O evento do pixel já é disparado pelo onclick no HTML
    });
});

// ============================================
// 8. ATUALIZAR VENDAS RECENTES (ROTATIVO)
// ============================================

function rotateRecentSales() {
    const salesItems = document.querySelectorAll('.sale-item');
    if (salesItems.length > 0) {
        const firstItem = salesItems[0];
        firstItem.parentNode.appendChild(firstItem);
    }
}

// Rotacionar a cada 10 segundos
if (document.querySelector('.sales-list')) {
    setInterval(rotateRecentSales, 10000);
}

// ============================================
// 9. TRACKING DE TEMPO NA PÁGINA
// ============================================

let pageViewStartTime = Date.now();
let maxScrollDepth = 0;

// Track scroll depth
window.addEventListener('scroll', function() {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
        
        // Disparar eventos de scroll para o pixel
        if (typeof fbq !== 'undefined') {
            if (scrollPercentage >= 25 && maxScrollDepth < 50) {
                fbq('trackCustom', 'ScrollDepth25');
            } else if (scrollPercentage >= 50 && maxScrollDepth < 75) {
                fbq('trackCustom', 'ScrollDepth50');
            } else if (scrollPercentage >= 75 && maxScrollDepth < 90) {
                fbq('trackCustom', 'ScrollDepth75');
            } else if (scrollPercentage >= 90) {
                fbq('trackCustom', 'ScrollDepth90');
            }
        }
    }
});

// Track time on page when leaving
window.addEventListener('beforeunload', function() {
    const timeSpent = Math.floor((Date.now() - pageViewStartTime) / 1000); // in seconds
    
    if (typeof fbq !== 'undefined' && timeSpent > 10) {
        fbq('trackCustom', 'TimeOnPage', {
            seconds: timeSpent,
            scroll_depth: Math.round(maxScrollDepth)
        });
    }
});

// ============================================
// 10. TRACKING DE ENGAGEMENT
// ============================================

// Track video plays (se tiver vídeo no futuro)
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', function() {
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_name: 'Vídeo de Apresentação',
                content_category: 'Vídeo'
            });
        }
    });
    
    video.addEventListener('ended', function() {
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'VideoWatched');
        }
    });
});

// Track FAQ engagement
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const questionText = this.textContent.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 50);
        
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'FAQClick', {
                question: questionText
            });
        }
    });
});
