document.addEventListener('DOMContentLoaded', () => {
    // 1. Логика кнопки "Пройти квиз" на главной странице
    const startQuizBtn = document.getElementById('startQuizBtn');

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            // Перенаправление на страницу квиза
            window.location.href = 'quiz.html'; 
        });
    }


    // 2. Логика анимации снежинок (Работает на обеих страницах)
    const snowflakeContainer = document.querySelector('.snowflake-container');
    if (!snowflakeContainer) return; // Выход, если контейнера нет
    
    const snowflakeCount = 80; // Количество снежинок
    const snowflakeIcons = ['✨', '⭐', '❄️', '✶']; // Иконки для снежинок/звездочек

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const icon = snowflakeIcons[Math.floor(Math.random() * snowflakeIcons.length)];
        snowflake.innerHTML = icon;

        const xPos = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.8;
        const duration = Math.random() * 10 + 5;

        snowflake.style.left = `${xPos}vw`;
        snowflake.style.fontSize = `${size}em`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        const delay = Math.random() * 5;
        snowflake.style.animationDelay = `${delay}s`;

        snowflakeContainer.appendChild(snowflake);

        // Перезапускаем в новой позиции после завершения анимации
        snowflake.addEventListener('animationiteration', () => {
            snowflake.style.left = `${Math.random() * 100}vw`; 
        });
    }

    // Создаем нужное количество снежинок
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }
});