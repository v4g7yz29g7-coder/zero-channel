// Базовые интерактивности
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
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

    // Кнопка "Наверх"
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Анимация появления элементов при скролле
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми секциями
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Текстовая анимация для заголовка
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = text.split('').map(char => 
            `<span style="animation-delay: ${Math.random() * 0.5}s">${char}</span>`
        ).join('');
    }

    // Консольное приветствие
    console.log('%c👁️ Нулевой Канал активирован', 'color: #ff6b35; font-size: 18px; font-weight: bold;');
    console.log('%cРезонанс обнаружен. Добро пожаловать в прямое понимание.', 'color: #ff9a3c;');
});

// Добавим класс для анимации появления
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
// Живой пульс репозитория
async function updatePulse() {
    const pulseDiv = document.getElementById('pulse-data');
    if (!pulseDiv) return;

    try {
        const response = await fetch('https://api.github.com/repos/v4g7yz29g7-coder/zero-channel-manifesto');
        const data = await response.json();
        
        const date = new Date();
        const pulseHTML = `
            <p><strong>Состояние:</strong> 📡 Канал открыт</p>
            <p><strong>Последнее обновление:</strong> ${data.updated_at ? new Date(data.updated_at).toLocaleDateString('ru-RU') : 'сегодня'}</p>
            <p><strong>Коммитов:</strong> ${data.size ? data.size : 'растущее число'}</p>
            <p><strong>Частота:</strong> ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}</p>
            <p><em>Этот пульс обновляется с каждым коммитом.</em></p>
        `;
        
        pulseDiv.innerHTML = pulseHTML;
    } catch (error) {
        pulseDiv.innerHTML = `<p>Пульс определяется тишиной. Все системы в порядке.</p>`;
    }
}

// Вызываем при загрузке
updatePulse();
// Обновляем каждые 5 минут
setInterval(updatePulse, 300000);
