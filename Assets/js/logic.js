/*Pseudo code ish:
var = start quiz button
start quiz button .addEventListener(click function() {

    time = 60 - set interval for time to decrease--

(for loop to cycle through all quiz questions?)
maybe use while loop: while time > 0 --> do quiz:
    First quiz question pops up (make object of quiz questions?) along
    with potential answers:
        if correct answer chosen --> indicate 'correct' and 
        go to next question
        else --> time = time - 10, go to next question;
    Once all questions are answered (again, for loop for this?) -->
    go to 'All Done!' and display score
        userInitials = input
        print Initials + " - " + userScore
        store this input in localstorage


highScore will be = to timeRemaining, and stored locally



});
*/
//Array of all of my questions that will be used for the quiz!
const questions = [
    {
        question: 'What cult comedy was canceled after only two-and-a-half seasons, and featured many future stars including Michael Cera, Will Arnett, and Jason Bateman?',
        answers: [
            {text:"Modern Family", correct: false}, 
            {text:"Who's the Boss?", correct: false},
            {text:"Arrested Development", correct: true}, 
            {text:"30 Rock", correct: false}  ]
    },
    {
        question: 'What is the longest running TV show of all time?',
        answers: [
            {text:"NYPD: Blue", correct: false},
            {text:"The Simpsons", correct: true}, 
            {text:"South Park", correct: false},
            {text:"The Office", correct: false}  ]
    
    },
       { question: 'Which medical show was written and created by Michael Crichton, author of Jurrassic Park?',
        answers: [
            {text: "ER", correct: true}, 
            {text:"Grey's Anatomy", correct: false},
            {text:"House", correct: false}, 
            {text:"Scrubs", correct: false}  ]
    },
    {
        question: 'What blockbuster series absolutely butcher their last season, leaving a heinous, indelible stain on all our souls and TV as whole for all eternity?',
        answers: [
            {text:"Don't", correct: false}, 
            {text:"Nope", correct: false}, 
            {text:"Uh-uh", correct: false}, 
            {text:"Game of Thrones", correct: true}    ]
    },
    {
        question: 'What moniker did Walter White adopt for his druglord persona in the show "Breaking Bad"?',
        answers: [
            {text:"Zuckerberg", correct: false},
            {text:"Einstein", correct: false},
            {text:"Heisenberg", correct: true},
            {text:"McNulty", correct: false}    ]
    },
    {
        question: 'What is the funniest show ever, period?',
        answers: [
            {text:"Seinfeld", correct: true},
            {text:"Seinfeld", correct: true},
            {text:"Seinfeld", correct: true},
            {text:"Seinfeld", correct: true},  ]
    },

]

//These two variable will be used later to shuffle the above array and choose what question will be displayed
var shuffledQuestions;
var currentQuestionIndex;

var highScore = document.getElementById("high-score");
var timer = document.getElementById("timer");
var startQuiz = document.getElementById("startButton");
var nextQuestion = document.getElementById('nextButton');
const questionContainerElement = document.getElementById('questionContainer');

var questionsElement = document.getElementById('questions');
var answerButtons = document.getElementById('answerButtons');
var quizIntro = document.getElementById('introText');

var timeRemaining = 0;
var userScore = 0;
highScore.innerHTML = "High Score: "+userScore;

startQuiz.addEventListener('click', startGame)

function startGame (e){
    e.preventDefault();
    console.log('Hello There');
    startQuiz.classList.add('hide'); /*this adds the class 'hide' (which we called in html and css) 
    to the start button once it is clicked, which will then hide the start button */
    nextQuestion.classList.remove('hide'); /*this removes hide from the next button, displaying it in place of the start button */
    questionContainerElement.classList.remove('hide');
    quizIntro.classList.add('hide');
    timeRemaining = 60;
    var timerId = setInterval(function(){
        timeRemaining--;
        if (timeRemaining <=0) {
            console.log('gameOver');
            clearInterval(timerId);
            //then remove hide from the Game Over Screen
                //game over screen displays high score, has input for initials and submit button
            //set userScore = to  Time Remaining
            //log userScore to local storage
        }
    }, 1000);
    /*this takes the questions array and shuffles it randomly. If sort produces a negative number, it shuffles it
    one way, and if it's a positive number, it sorts a different way. Math.random() chooses a number between
    0 and 1, and subtracting .5 from it will yield a neg number 50% of the time and a pos number 50% of time.  */
    shuffledQuestions = questions.sort(() => Math.random() - .5);

    currentQuestionIndex = 0; /*sets the index of the questions array to zero*/
    setNextQuestion();
}

function setNextQuestion() {
    resetQuizState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion (question) {
    questionsElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
            if (answer.correct) {

                /*adds data attribute of 'correct' to the button that holds the right answer*/
                button.dataset.correct = answer.correct;
            }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    })
}

/*This function hides the next button and the empty buttons that will appear after hitting start.
The empty buttons appear because we have them written in our html, with the id 'answerButtons', but 
in our 'showQuestion' function, we create ANOTHER set of buttons and append those to the id 'answerButtons',
which normally gives us two sets of buttons, thus we must remove that first, empty set of buttons with this fxn. */
function resetQuizState () {
    nextQuestion.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event){
    var userChoice = event.target;
    var correct = userChoice.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    nextQuestion.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}





/*

startQuiz.addEventListener("click", function() {
    alert("Let's do this thang!");
    setInterval(function() {
        timeRemaining = 60;
        timeRemaining--;
        timer.textContent = "Time: "+timeRemaining;

        while (timeRemaining > 0){
            //Quiz question 1
                //if correct --> 'Correct', next question
                //if incorrect --> timeRemaining = timeRemaining - 10, next question;
            //All questions done --> 'All done' and print score.
                //input box for initials, submit --> localStorage('highscores', input+score)
        }
        
        if (timeRemaining <= 0);
            //you lost
            //timeRemaining = 0
            //userScore = timeRemaining
    
    }, 1000);
    
    

    
});
*/