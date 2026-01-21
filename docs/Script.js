// ==================== НУЛЕВОЙ КАНАЛ - ОСНОВНОЙ СКРИПТ ====================
console.log('👁️ Нулевой Канал: Скрипт загружен');

// Ждём полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM полностью загружен');
    
    // ==================== ПЛАВНАЯ ПРОКРУТКА ====================
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

    // ==================== ЖИВОЙ ПУЛЬС ====================
    function updatePulse() {
        console.log('Обновляем пульс...');
        const now = new Date();
        
        // Частота (время)
        const freqElement = document.getElementById('pulse-frequency');
        if (freqElement) {
            freqElement.textContent = 
                `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        }
        
        // Статус
        const statusElement = document.getElementById('pulse-status');
        if (statusElement) {
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
        }
        
        // Дата обновления
        const updatedElement = document.getElementById('pulse-updated');
        if (updatedElement) {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            updatedElement.textContent = now.toLocaleDateString('ru-RU', options);
        }
    }
    
    // Запускаем пульс
    updatePulse();
    setInterval(updatePulse, 60000);
    
    // ==================== ФОРМА "САД → КОД" ====================
    console.log('Инициализируем форму Сад→Код');
    
    const gardenForm = document.getElementById('garden-form');
    const workflowLinkDiv = document.getElementById('workflow-link');
    const actionLink = document.getElementById('action-link');
    
    if (!gardenForm) {
        console.error('❌ Форма не найдена! Проверь id="garden-form" в HTML');
    } else {
        console.log('✅ Форма найдена, добавляем обработчик');
        
        gardenForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Останавливаем перезагрузку страницы
            console.log('Форма отправлена!');
            
            // Получаем значения полей
            const plantName = document.getElementById('plant-name').value.trim();
            const plantNote = document.getElementById('plant-note').value.trim();
            const plantDate = document.getElementById('plant-date').value;
            
            console.log('Данные:', { plantName, plantNote, plantDate });
            
            // Проверяем заполненность
            if (!plantName || !plantNote) {
                alert('🌱 Пожалуйста, заполните название растения и заметку');
                return;
            }
            
            // Показываем уведомление
            alert(`✅ "${plantName}" сохранён!\n\nТеперь перейди по ссылке ниже, чтобы создать Issue на GitHub.`);
            
            // Формируем ссылку на GitHub Actions
            const repo = 'v4g7yz29g7-coder/zero-channel-manifesto';
            const workflowLink = `https://github.com/${repo}/actions/workflows/garden-issue.yml`;
            
            // Показываем блок со ссылкой
            if (workflowLinkDiv && actionLink) {
                actionLink.href = workflowLink;
                actionLink.textContent = 'Создать Issue на GitHub';
                workflowLinkDiv.style.display = 'block';
                
                // Прокручиваем к ссылке
                workflowLinkDiv.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'nearest'
                });
                
                console.log('Ссылка показана:', workflowLink);
            } else {
                console.error('Не найден блок workflow-link или action-link');
            }
            
            // Очищаем форму (кроме даты)
            document.getElementById('plant-name').value = '';
            document.getElementById('plant-note').value = '';
            // Дата остаётся сегодняшней
            document.getElementById('plant-date').value = new Date().toISOString().split('T')[0];
            
            console.log('Форма очищена');
        });
        
        console.log('✅ Обработчик формы добавлен');
    }
    
    // ==================== ПОКАЗЫВАЕМ ТЕКУЩУЮ ДАТУ В ФОРМЕ ====================
    const dateField = document.getElementById('plant-date');
    if (dateField) {
        const today = new Date().toISOString().split('T')[0];
        dateField.value = today;
        console.log('Дата установлена на сегодня:', today);
    }
    
    // ==================== АНИМАЦИИ ====================
    // Анимация пульса
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-glow {
            0% { box-shadow: 0 0 5px #ff6b35; }
            50% { box-shadow: 0 0 20px #ff6b35; }
            100% { box-shadow: 0 0 5px #ff6b35; }
        }
        .pulse-card {
            animation: pulse-glow 4s infinite;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        #workflow-link {
            animation: fadeIn 0.5s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Все скрипты инициализированы');
});

// Консольное приветствие
console.log('%c👁️ НУЛЕВОЙ КАНАЛ АКТИВИРОВАН', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
console.log('%cРезонанс обнаружен. Система готова к работе.', 'color: #ff9a3c;');
