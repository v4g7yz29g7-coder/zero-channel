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
// ==================== ЖИВОЙ ПУЛЬС ====================
async function updatePulse() {
    const now = new Date();
    
    // Частота (время) и статус (оставляем как есть)
    document.getElementById('pulse-frequency').textContent = 
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const statusElement = document.getElementById('pulse-status');
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
        statusElement.innerHTML = '☀️ Утренний резонанс';
    } else if (hour >= 12 && hour < 17) {
        statusElement.innerHTML = '📡 Дневная активность';
    } else if (hour >= 17 && hour < 22) {
        statusElement.innerHTML = '🔥 Вечернее горение';
    } else {
        statusElement.innerHTML = '🌙 Ночная тишина';
    }
    
    // ======= ДАННЫЕ GITHUB API =======
    try {
        // Получаем информацию о репозитории
        const repoResponse = await fetch('https://api.github.com/repos/v4g7yz29g7-coder/zero-channel-manifesto');
        const repoData = await repoResponse.json();
        
        // Получаем последний коммит
        const commitsResponse = await fetch('https://api.github.com/repos/v4g7yz29g7-coder/zero-channel-manifesto/commits?per_page=1');
        const commitsData = await commitsResponse.json();
        
        // Обновляем информацию
        const lastUpdatedElement = document.getElementById('pulse-updated');
        if (commitsData.length > 0) {
            const lastCommitDate = new Date(commitsData[0].commit.author.date);
            lastUpdatedElement.textContent = lastCommitDate.toLocaleDateString('ru-RU');
            
            // Добавляем скрытый хинт при наведении
            lastUpdatedElement.title = `Коммит: "${commitsData[0].commit.message}"`;
        } else {
            lastUpdatedElement.textContent = repoData.updated_at ? 
                new Date(repoData.updated_at).toLocaleDateString('ru-RU') : 
                'Ещё не обновлялся';
        }
        
        // Добавляем информацию о звёздах и форках (если есть)
        const pulseContainer = document.querySelector('.pulse-container');
        if (pulseContainer && (repoData.stargazers_count > 0 || repoData.forks_count > 0)) {
            // Создаём дополнительную карточку, если её нет
            let extraCard = document.querySelector('.pulse-card:nth-child(4)');
            if (!extraCard) {
                extraCard = document.createElement('div');
                extraCard.className = 'pulse-card';
                extraCard.innerHTML = `
                    <div class="pulse-icon">⭐</div>
                    <h3>Сообщество</h3>
                    <p id="pulse-community">Загрузка...</p>
                `;
                pulseContainer.appendChild(extraCard);
            }
            
            const communityText = [];
            if (repoData.stargazers_count > 0) {
                communityText.push(`Звёзд: ${repoData.stargazers_count}`);
            }
            if (repoData.forks_count > 0) {
                communityText.push(`Форков: ${repoData.forks_count}`);
            }
            
            document.getElementById('pulse-community').textContent = communityText.join(' | ');
        }
        
    } catch (error) {
        console.log('GitHub API временно недоступен, используем локальные данные');
        // Оставляем текущие данные
    }
}

// Запускаем сразу и каждые 5 минут
updatePulse();
setInterval(updatePulse, 300000);

// ==================== АНИМАЦИЯ ПУЛЬСА ====================
function createPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-glow {
            0% { box-shadow: 0 0 5px var(--fire); }
            50% { box-shadow: 0 0 20px var(--fire); }
            100% { box-shadow: 0 0 5px var(--fire); }
        }
        .pulse-card {
            animation: pulse-glow 4s infinite;
        }
    `;
    document.head.appendChild(style);
}

createPulseAnimation();}

// Вызываем при загрузке
updatePulse();
// Обновляем каждые 5 минут
setInterval(updatePulse, 300000);

// ==================== САД → КОД ====================
document.getElementById('garden-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const plantName = this.querySelector('input[type="text"]').value;
    const note = this.querySelector('textarea').value;
    const date = this.querySelector('input[type="date"]').value;
    
    // Пока просто демо-сообщение
    alert(`Рост зафиксирован!\n\nРастение: ${plantName}\nДата: ${date}\nЗаметка: ${note}\n\nВ следующей версии это сохранится в Issues GitHub.`);
    
    // Очистка формы
    this.reset();
    this.querySelector('input[type="date"]').value = '2024-04-11';
});

// Функция для создания ссылки на workflow
function createWorkflowLink(plantName, note, date) {
    // Кодируем данные для передачи в URL
    const encodedPlant = encodeURIComponent(plantName);
    const encodedNote = encodeURIComponent(note);
    const encodedDate = encodeURIComponent(date);
    
    // Ссылка на запуск workflow с параметрами
    const repo = "v4g7yz29g7-coder/zero-channel-manifesto";
    return `https://github.com/${repo}/actions/workflows/garden-issue.yml?query=workflow%3A"Создание+Issue+для+сада"&plant=${encodedPlant}&note=${encodedNote}&date=${encodedDate}`;
}

// Обработчик формы
document.getElementById('garden-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const plantName = document.getElementById('plant-name').value.trim();
    const note = document.getElementById('plant-note').value.trim();
    const date = document.getElementById('plant-date').value;
    
    if (!plantName || !note) {
        alert('Заполните название растения и заметку');
        return;
    }
    
    // Сохраняем в localStorage (как backup)
    savePlantGrowth(plantName, note, date);
    
    // Показываем ссылку на workflow
    const link = createWorkflowLink(plantName, note, date);
    const workflowLinkDiv = document.getElementById('workflow-link');
    const actionLink = document.getElementById('action-link');
    
    actionLink.href = link;
    actionLink.textContent = `Создать Issue для "${plantName}"`;
    workflowLinkDiv.style.display = 'block';
    
    // Прокручиваем к ссылке
    workflowLinkDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Очищаем форму
    this.reset();
    document.getElementById('plant-date').value = new Date().toISOString().split('T')[0];
});
// ==================== ФОРМА "САД → КОД" ====================
console.log("Скрипт формы загружен!");

document.getElementById('garden-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const plantName = document.getElementById('plant-name').value;
    const note = document.getElementById('plant-note').value;
    const date = document.getElementById('plant-date').value;
    
    console.log("Форма отправлена:", plantName, note, date);
    
    // Простая проверка
    if (!plantName || !note) {
        alert("Заполните все поля!");
        return;
    }
    
    // Показываем ссылку
    const linkDiv = document.getElementById('workflow-link');
    const linkElement = document.getElementById('action-link');
    
    // Создаём простую ссылку (пока без параметров)
    const repo = "v4g7yz29g7-coder/zero-channel-manifesto";
    const simpleLink = `https://github.com/${repo}/actions/workflows/garden-issue.yml`;
    
    linkElement.href = simpleLink;
    linkElement.textContent = "Нажми здесь, чтобы создать Issue на GitHub";
    linkDiv.style.display = 'block';
    
    // Прокручиваем к ссылке
    linkDiv.scrollIntoView({ behavior: 'smooth' });
    
    console.log("Ссылка показана:", simpleLink);
});
