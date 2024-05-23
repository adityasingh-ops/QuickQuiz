let currentQuestion = 0;
let score = 0; 
const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['<script>', '<css>', '<style>', '<span>'],
        answer: 2,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 3,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choices: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        answer: 1,
    },
];

function loadQuestion() {
    const questionElement = document.querySelector('.question');
    const choicesElement = document.querySelector('.choices');
    const scoreElement = document.querySelector('.score');
    const progressBar = document.querySelector('.progress-bar');

    const currentQuestionData = questions[currentQuestion];
    
    questionElement.textContent = currentQuestionData.question;
    scoreElement.textContent = `Score: ${score}/${currentQuestion}`;
    
    choicesElement.innerHTML = '';
    currentQuestionData.choices.forEach((choice, index) => {
        const choiceElement = document.createElement('div');
        choiceElement.classList.add('choice');
        choiceElement.textContent = choice;
        choiceElement.addEventListener('click', () => handleChoiceClick(index));
        choicesElement.appendChild(choiceElement);
    });

    updateProgressBar();
}

function handleChoiceClick(selectedAnswer) {
    const currentQuestionData = questions[currentQuestion];
    const choices = document.querySelectorAll('.choice');

    if (selectedAnswer === currentQuestionData.answer) {
        score++; 
    }

    choices.forEach((choice, index) => {
        const icon = document.createElement('span');
        icon.classList.add('icon');

        if (index === currentQuestionData.answer) {
            choice.classList.add('correct');
            icon.textContent = '✔'; // Unicode check mark
            icon.style.color = 'green';
        } else if (index === selectedAnswer) {
            choice.classList.add('incorrect');
            icon.textContent = '✘';
            icon.style.color = 'red';
            // Unicode X mark
        }

        choice.appendChild(icon);
        choice.style.pointerEvents = 'none'; 
    });

    setTimeout(() => {
        choices.forEach(choice => {
            choice.classList.remove('correct', 'incorrect');
            const icon = choice.querySelector('.icon');
            if (icon) {
                icon.remove();
            }
            choice.style.pointerEvents = 'auto'; 
        });
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            window.location.href = `end.html?score=${score}`;
        }
    }, 2000);
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

loadQuestion();
