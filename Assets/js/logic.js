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

If we end up not keeping the already written functions and go our own way, let's just first
try and write all the different functions we need then synthesize them at the end

});
*/
//Array of all of my questions that will be used for the quiz!
const questions = [
    {
        question: 'What cult comedy was canceled after only two-and-a-half seasons, and featured many future stars including Michael Cera, Will Arnett, and Jason Bateman?',
        answers: [
            {text:"Modern Family"}, 
            {text:"Who's the Boss?"},
            {text:"Arrested Development"}, 
            {text:"30 Rock"}  ],
        correct:"Arrested Development"
    },
    {
        question: 'What is the longest running TV show of all time?',
        answers: [
            {text:"NYPD: Blue"},
            {text:"The Simpsons"}, 
            {text:"South Park"},
            {text:"The Office"}  ],
        correct:"The Simpsons"
    
    },
       { question: 'Which medical show was written and created by Michael Crichton, author of Jurrassic Park?',
        answers: [
            {text: "ER"}, 
            {text:"Grey's Anatomy"},
            {text:"House"}, 
            {text:"Scrubs"}  ],
        correct:"ER"
    },
    {
        question: 'What blockbuster series absolutely butcher their last season, leaving a heinous, indelible stain on all our souls and TV as whole for all eternity?',
        answers: [
            {text:"Don't"}, 
            {text:"Nope"}, 
            {text:"Uh-uh"}, 
            {text:"Game of Thrones"}    ],
        correct:"Game of Thrones"
    },
    {
        question: 'What moniker did Walter White adopt for his druglord persona in the show "Breaking Bad"?',
        answers: [
            {text:"Zuckerberg"},
            {text:"Einstein"},
            {text:"Heisenberg"},
            {text:"McNulty"}    ],
        correct:"Heisenberg"
    },
    {
        question: 'What is the funniest show ever, period?',
        answers: [
            {text:"Seinfeld"},
            {text:"Seinfeld"},
            {text:"Seinfeld"},
            {text:"Seinfeld"},  ],
        correct:"Seinfeld"
    },

]

//These two variable will be used later to shuffle the above array and choose what question will be displayed
var shuffledQuestions;
var currentQuestionIndex;

var timer = document.getElementById("timer");

var startQuiz = document.getElementById("startButton");
var nextButton = document.getElementById('nextButton');
var restartQuiz = document.getElementById("restartQuiz");

const questionContainerElement = document.getElementById('questionContainer');
var quizIntro = document.getElementById('introText');
var quizCard = document.getElementById('quizContainer');

var questionsElement = document.getElementById('questions');
var answerButtons = document.getElementById('answerButtons');


var gameOverScreen = document.getElementById('gameOverScreen');
var scoresForm = document.getElementById('scoresForm');

var userScore = 0; //not sure I need this
var currentQuestionIndex;

startQuiz.addEventListener('click', startGame);
nextButton.addEventListener('click', function(){
    currentQuestionIndex++;
    nextQuestion();
})

var timeRemaining = 30;




//startQuiz.addEventListener('click', cycleQuestions); just some trial and error. Mostly error

var restartQuiz = document.getElementById("restartQuiz")
restartQuiz.addEventListener('click', function(){
    restartQuiz.setAttribute('src', 'index.html');
})

var stopTimer = false;

function startGame (e){
    //just in case
    e.preventDefault();
    currentQuestionIndex = 0;

    /*Add the class 'hide' to both our intro text and start button to make room for
    the actual question and answer list. */
    quizIntro.classList.add('hide'); 
    startQuiz.classList.add('hide');
    
    /*Remove 'hide' class from the question/answers to officially start the quiz */
    questionContainerElement.classList.remove('hide');

    var timerId = setInterval(function(){
        timeRemaining--;
        timer.textContent = "Time: "+timeRemaining;
        if (timeRemaining === 0 || stopTimer) {
            console.log('gameOver');
            questionContainerElement.classList.add('hide');
            nextButton.classList.add('hide');
            gameOverScreen.classList.remove('hide');
            scoresForm.classList.remove('hide');
            var finalScore = document.getElementById('finalScoreContainer');
            var scoreDisplay = document.createElement('h3');
            
            finalScore.appendChild(scoreDisplay);
            clearInterval(timerId);
            if (!stopTimer ){
                scoreDisplay.textContent = 'Your Score: 0';
            }
            
        }
        else if (timeRemaining < 0) {
            console.log('gameOver');
            questionContainerElement.classList.add('hide');
            nextButton.classList.add('hide');
            gameOverScreen.classList.remove('hide');
            scoresForm.classList.remove('hide');
            clearInterval(timerId);
            timeRemaining = 0;
            var finalScore = document.getElementById('finalScoreContainer');
            var scoreDisplay = document.createElement('h3');
            finalScore.appendChild(scoreDisplay);
            scoreDisplay.textContent = 'Your Score: 0';
        }
    }, 1000);
        
    nextQuestion();
    
}

/*This function hides the next button and the empty buttons that will appear after hitting start.
The empty buttons appear because we have them written in our html, with the id 'answerButtons', but 
in our 'showQuestion' function, we create ANOTHER set of buttons and append those to the id 'answerButtons',
which normally gives us two sets of buttons, thus we must remove that first, empty set of buttons with this fxn. */
function resetQuizState () {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
} 

/*
function cycleQuestions(){
    
    var index = 0;
    
    //resetQuizState();    
    if (index < questions.length) {
        questionsElement.textContent = questions[index].question;
       
        for (i = 0; i < questions[index].answers.length; i++) {
            var button = document.createElement('button');
            button.innerText = questions[index].answers[i].text;
            button.classList.add('btn');
            button.setAttribute('id', 'answerButtons');
            
            if (questions[index].answers[i].text === questions[index].correct) {
                button.setAttribute('value', 'correct')
            }
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        } 
    }
    index+=1;        
    
    } */

function nextQuestion(){
        resetQuizState();
        cycleQuestions(questions[currentQuestionIndex]);
    }

function cycleQuestions(q){
    
    if (currentQuestionIndex > 5) {
        //clearInterval(timerId);
        questionContainerElement.classList.add('hide');
        nextButton.classList.add('hide');
        gameOverScreen.classList.remove('hide');
        scoresForm.classList.remove('hide');
        var finalScore = document.getElementById('finalScoreContainer');
        var scoreDisplay = document.createElement('h3');
        scoreDisplay.textContent = 'Your Score: '+timeRemaining;
        finalScore.appendChild(scoreDisplay);
        stopTimer = true;
        
    }
    else {

    questionsElement.textContent = q.question;
    for (i = 0; i < q.answers.length; i++) {
        var button = document.createElement('button');
        button.innerText = q.answers[i].text;
        button.classList.add('btn');
        button.setAttribute('id', 'answerButtons');
        
        if (q.answers[i].text === q.correct) {
            button.setAttribute('value', 'correct')
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    } 
}
    
    
    }
                


//for correct or incorrect choices: need
function selectAnswer(event){ //but how to properly call select answer? 

    var userChoice = event.target;
    
    if (userChoice.hasAttribute('value')) {
        userChoice.textContent ='LUCKY GUESS';
        userChoice.setAttribute('style', 'background-color: green');
        timeRemaining += 10;
        nextButton.classList.remove('hide');
               
    }
    else {
        timeRemaining -= 5;
        userChoice.textContent ='LOL WRONG';
        userChoice.setAttribute('style', 'background-color: red');
        nextButton.classList.remove('hide');
        
    }
    
} 

//setting a variable to the submit score button
var submitScore = document.getElementById('submitScoreButton');

//adding a click event function to my submit score button
submitScore.addEventListener('click', function() {

    //setting variables for the input form for the initials
    var initials = document.getElementById('inputInitials').value.trim();
    //grabbing the 'highScores' from my local storage and covnerting it to a string with JSON.parse
    var highScores = JSON.parse(localStorage.getItem('highScores'));

    var userScoresObject = {
        user: initials
        score: score
    }

    if (highScores !== null) {

    }


    localStorage.setItem(initials, 50);
})

var resetScores = document.getElementById('resetHighScores');

resetScores.addEventListener('click', function(){
    localStorage.clear(); //this isn't working and I have no idea why.
})



/* POORNIMA PSEUDO CODE


 //click start button
    //start the timer
        if timer === 0 --> game over
    //start displaying questions one by one
            //can reference the bubbling/carousel activity to see how to move to next question
        //creat index var = 0 for questions array
make sep fxn -- if (index < questionsarray.length) {
                    //questionsList[iindex].question -- displays the question
                    //for loop over questionsList[index].answers -- loop through the potential answers
                         //questionsList[index].options[i] 
                        //create an element for each of these = button
                }
             
    //click on answer button
        //find which button user clicks (eg event.target, matches('element'))
        //capture the value on the button (eg: data-correct/incorrect, if button '<button value='', or event.target)
        //compare this capture value to the correct answer > questionsList[index].correctAns
        //if correct --> display correct
            go to next questions
        else --> display incorrect
             subtract from timer
        if (index < questionsarray.length) {
                //questionsList[iindex].question -- displays the question
                //for loop over questionsList[index].answers -- loop through the potential answers
                    //questionsList[index].options[i] 
                    //create an element for each of these = button
                }
in scores file...
    //capture score from local Storage
    //dispaly to user in list
    //have button to reset local storage to 0

    Check the Hang Man game for more help!
    

    POORNIMA's PSEUDOCODE:
    // create 2 html files
    // game.html
         //qList = [{
                                //        question:"",
                                //        options:[op1,op2,op3,op4],
                                //        correctAns: op1
                                //    },
                                // {
                                    //        question:"",
                                    //        options:[op1,op2,op3,op4],
                                    //        correctAns: op1
                                    //    },
                            // ]
        //timer = 75s;
        //click event on a start btn
            //start the timer
                //if timer === 0 game over
            //start displaying questions one by one
                //create var index = 0
                //if (index < qList.length)
                    //qList[index].question
                    // for loop over qList[index].options > create html element for qList[index].options[i]
                //index++
        //click on options element
            //Find which element user clicked (eg: event.target, matches("element"))
            //capture the value on the element (eg : "data-something", "<button value=''>", event.target)
            //compare the value to the correct answer. > //qList[index].correctAns
            //if (it's correct){
                //whatever time left that is user's  score 
                //display message to the user
            // else time left - penalty 
                    //display message to the user
            //save scores with initials in local storage
            //start displaying questions one by one
              //create index var = 0
            //   if (index < qList.length)
                    //qList[index].question
                    // for loop over qList[index].options > create html element for qList[index].options[i]
    //score.html
      //capture the score form the local storage and display it to user
      //reset the local storage with 0. */

      /*STORAGE PROBLEMS

      Add submitted high score to local storage array
      set each one's key to initials and value to score;
      sort local storage array by value..?
      getLocalStorage.... */
