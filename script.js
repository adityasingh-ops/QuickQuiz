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
}

function handleChoiceClick(selectedAnswer) {
    if (selectedAnswer === questions[currentQuestion].answer) {
        score++; 
    }

  
    const choices = document.querySelectorAll('.choice');
    choices.forEach((choice, index) => {
        if (index === questions[currentQuestion].answer) {
            choice.classList.add('correct');
        } else if (index === selectedAnswer) {
            choice.classList.add('incorrect');
        }
        choice.style.pointerEvents = 'none'; 
    });

  
    setTimeout(() => {
        choices.forEach(choice => {
            choice.classList.remove('correct', 'incorrect');
            choice.style.pointerEvents = 'auto'; 
        });
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            window.location.href = `end.html?score=${score}`;
        }
    }, 1000);
}




loadQuestion();
