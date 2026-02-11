// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const endTime = new Date();
    
    // Configurar para terminar em 2 horas e 45 minutos
    endTime.setHours(now.getHours() + 2);
    endTime.setMinutes(now.getMinutes() + 45);
    endTime.setSeconds(now.getSeconds() + 30);
    
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        document.getElementById('countdown-timer').innerHTML = 
            '<span class="countdown-expired">OFERTA EXPIRADA!</span>';
        return;
    }
    
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Atualizar contador a cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Executar imediatamente

// FAQ Accordion
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

// Smooth Scroll para âncoras
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

// Hotmart Checkout (exemplo de integração)
function openHotmartCheckout() {
    // Substitua com seu código Hotmart
    const hotmartUrl = 'https://pay.hotmart.com/SEU_LINK_AQUI';
    window.open(hotmartUrl, '_blank');
}

// Adicionar evento de clique ao botão de compra
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('#buyButton, .final-button[href*="hotmart"]');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('SEU_LINK_AQUI')) {
                e.preventDefault();
                alert('Configure seu link do Hotmart no código!');
                // Substitua a linha acima por: openHotmartCheckout();
            }
        });
    });
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.testimonial-card, .pain-item, .bonus-item, .step').forEach(el => {
    observer.observe(el);
});

// Download tracking (para página de obrigado)
if (window.location.pathname.includes('obrigado')) {
    console.log('Página de obrigado carregada - acesso liberado!');
    
    // Pode adicionar Google Analytics ou outro tracking aqui
    // Exemplo: gtag('event', 'purchase', { ... });
}
