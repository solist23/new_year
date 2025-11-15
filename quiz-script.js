document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const questionPages = document.querySelectorAll('.quiz-page');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const finishQuizBtn = document.getElementById('finishQuizBtn');
    const resultDiv = document.getElementById('result');
    const backLink = document.querySelector('.back-link');
    const questionCounter = document.getElementById('questionCounter');
    const progressBar = document.getElementById('progressBar');

    let currentQuestionIndex = 0;
    const totalQuestions = questionPages.length;

    // Предсказания в зависимости от преобладающего ответа
    const predictions = {
        'A': '✨ Тебя ждет уютный и теплый год! Наслаждайся домашним очагом, заботой близких и приятными мелочами. Твое главное сокровище — это покой.',
        'B': '🚀 В новом году тебя ждут яркие, смелые события и много общения! Будь готов к авантюрам, новым знакомствам и головокружительным проектам. Это год твоих амбиций!',
        'C': '💸 2026 год принесет тебе удачу в финансах, путешествиях и больших мечтах! Не бойся рисковать и планировать крупное. Это год больших побед и исполнения заветных желаний.'
    };

    // --- ФУНКЦИИ УПРАВЛЕНИЯ ---

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
        questionCounter.textContent = `Вопрос ${currentQuestionIndex + 1} из ${totalQuestions}`;
    }

    function showQuestion(index) {
        // Скрываем все вопросы
        questionPages.forEach(page => {
            page.style.display = 'none';
        });
        
        // Показываем текущий вопрос
        questionPages[index].style.display = 'block';

        // Обновляем прогресс-бар и счетчик
        updateProgressBar();
        
        // Переключаем кнопки "Далее" / "Завершить"
        if (index === totalQuestions - 1) {
            nextQuestionBtn.style.display = 'none';
            finishQuizBtn.style.display = 'block';
        } else {
            nextQuestionBtn.style.display = 'block';
            finishQuizBtn.style.display = 'none';
        }
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    // Кнопка "Далее"
    nextQuestionBtn.addEventListener('click', () => {
        // Проверяем, отвечен ли текущий вопрос
        const currentQName = questionPages[currentQuestionIndex].dataset.question;
        const selectedAnswer = document.querySelector(`input[name="${currentQName}"]:checked`);

        if (!selectedAnswer) {
            alert('Пожалуйста, выберите ответ, чтобы перейти к следующему вопросу.');
            return;
        }

        // Переходим к следующему вопросу
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            showQuestion(currentQuestionIndex);
        }
    });

    // Отправка формы (Кнопка "Узнать предсказание!")
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Проверяем последний вопрос
        const lastQName = questionPages[totalQuestions - 1].dataset.question;
        const lastAnswer = document.querySelector(`input[name="${lastQName}"]:checked`);
        if (!lastAnswer) {
             // Эта проверка уже сделана в обработчике "Далее", но лучше оставить для надежности
             alert('Пожалуйста, выберите ответ на последний вопрос!');
             return;
        }

        // --- ЛОГИКА ПОДСЧЕТА РЕЗУЛЬТАТА ---
        const answers = [];
        for (let i = 1; i <= totalQuestions; i++) {
            const answer = document.querySelector(`input[name="q${i}"]:checked`);
            if (answer) {
                answers.push(answer.value);
            }
        }
        
        const counts = { 'A': 0, 'B': 0, 'C': 0 };
        answers.forEach(answer => {
            counts[answer]++;
        });

        // Находим преобладающий ответ
        let maxCount = 0;
        let finalAnswer = 'A'; 
        
        // Считаем
        if (counts['B'] > maxCount) { maxCount = counts['B']; finalAnswer = 'B'; }
        if (counts['C'] > maxCount) { maxCount = counts['C']; finalAnswer = 'C'; }
        // Если 'A' больше или равен текущему максимальному (обработка ничьей)
        if (counts['A'] >= maxCount) { finalAnswer = 'A'; } 

        const prediction = predictions[finalAnswer];
        
        // --- ОТОБРАЖЕНИЕ РЕЗУЛЬТАТА ---
        questionsContainer.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        finishQuizBtn.style.display = 'none';
        
        // Показываем заголовок и предсказание
        resultDiv.innerHTML = `<h3>🎉 Поздравляем! 🎉</h3>
                                <h4>Ваш Новогодний Тип: ${finalAnswer === 'A' ? 'Хранитель Очага' : finalAnswer === 'B' ? 'Искатель Приключений' : 'Магнат Удачи'}</h4>
                                <p>${prediction}</p>`;
        resultDiv.style.display = 'block';
        
        // Показываем ссылку "Назад"
        backLink.style.display = 'block';
    });

    // Инициализация: показываем первый вопрос
    showQuestion(currentQuestionIndex);
});