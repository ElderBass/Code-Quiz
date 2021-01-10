/* It's late. My script is a hot mess. I'm sorry. It's not in an order that makes much sense, but I hope you can make sense of it.

Godspeed, soldier. */

//Array of all of my questions that will be used for the quiz!
const questions = [
    {
        question: 'What cult comedy was canceled after only two-and-a-half seasons, and featured many future stars including Michael Cera, Will Arnett, and Jason Bateman?',
        answers: [
            {text:"Modern Family"}, 
            {text:"Who's the Boss?"},
            {text:"Arrested Development"}, 
            {text:"30 Rock"}  ],
        correct:"Arrested Development" //I set the correct answer for each of these questions to the corresponding string for use later
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
       { question: 'Which medical show was written and created by Michael Crichton, author of Jurassic Park?',
        answers: [
            {text: "ER"}, 
            {text:"Grey's Anatomy"},
            {text:"House"}, 
            {text:"Scrubs"}  ],
        correct:"ER"
    },
    {
        question: 'What blockbuster series absolutely butchered their last season, leaving a heinous, indelible stain on all our souls and TV as whole for all eternity?',
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

//this variable is grabbing the 'timer' found in the upper right corner of our main page
var timer = document.getElementById("timer");

//grabbing the ids for the 'Start', 'Next', and 'Restart Quiz' buttons for later manipulation
var startQuiz = document.getElementById("startButton");
var nextButton = document.getElementById('nextButton');
var restartQuiz = document.getElementById("restartQuiz");

//grabbing the container that houses the text for the questions -- want to add the 'hide' class to it later
var questionContainerElement = document.getElementById('questionContainer');
//grabbing the container housing the the introductory text on the main page that starts with 'Test Your Knowledge'
var quizIntro = document.getElementById('introText');

//grabbing the div containing the questions for appending and further manipulation
var questionsElement = document.getElementById('questions');
//grabbing the id for the answer buttons for appending and manipulation
var answerButtons = document.getElementById('answerButtons');

//grabbing the div for the 'Game Over' screen, which we initally have hidden but will reveal at the appropriate times
var gameOverScreen = document.getElementById('gameOverScreen');
//grabbing the 'form' element that houses our initials input and submit button - this is hidden initially but revealed when needed
var scoresForm = document.getElementById('scoresForm');


var viewHighScores = document.getElementById('viewHighScoresBtn')

//grabbing the reset high scores button on the high scores page
var resetScores = document.getElementById('resetHighScores');
//setting a variable for the 'restart quiz' button that's displayed on the high scores page
var restartQuiz = document.getElementById("restartQuiz")

//setting a variable to the submit score button
var submitScore = document.getElementById('submitScoreButton');

//this global variable will dictate which index of the questions array will be displayed 
var currentQuestionIndex;

//this global variable will be the initial time on the timer in the upper right hand of the screen and will count down each second
var timeRemaining = 30;

//this is used for a fancy trick I'll explain later. setting it to false for now.
var stopTimer = false;

var highScores;

//so. here we go. 
function startGame (e){

    //just in case, though I don't think it's necessary
    e.preventDefault();
    //set our global variable from before to 0, so our questions array will start with the first question
    currentQuestionIndex = 0;

    /*Add the class 'hide' to both our intro text and start button to make room for
    the actual question and answer list. */
    quizIntro.classList.add('hide'); 
    startQuiz.classList.add('hide');
    
    //Remove 'hide' class from the question/answers to officially start the quiz 
    questionContainerElement.classList.remove('hide');

    /*setting a variable to an interval. this function essentially decrements the timer by 1 every second, and goes until either 1) the timer
    //hits 0 OR if the timeRemaining goes negative (e.g. there's three seconds left, and the user chooses poorly, thus subtracting 5 seconds from clock) */
    var timerId = setInterval(function(){

        timeRemaining--; //decrease timeRemaining, which starts at 30, by 1 every 1000ms
        timer.textContent = "Time: "+timeRemaining; //the timer in the upper right corner will display this text content

        //if timeRemaining reaches/surpasses 0 OR if that fancy stopTimer is somehow true, which comes into play later, then do all this crap
        //the stopTimer will become true if we run out of questions to display, thus signaling the end of the quiz and stopping the timer
        if (timeRemaining <= 0 || stopTimer ) { 

            //timeRemaining = 0;
            
            questionContainerElement.classList.add('hide'); //we'll hide the div containing the questions to make room for the Game Over screen
            nextButton.classList.add('hide'); //hide the next button
            gameOverScreen.classList.remove('hide'); //un-hide the Game Over screen
            scoresForm.classList.remove('hide');//reveal the submission form with the button and the input text area

            //grabbinbg our final score container from the index.html page that will house a new h3 element
            var finalScore = document.getElementById('finalScoreContainer'); 
            //creating that new h3 element and setting it to a var, which will display the user's score at the game over screen
            var scoreDisplay = document.createElement('h3');
            //appending this h3 element to the final score container
            finalScore.appendChild(scoreDisplay);
            //stop the timer
            clearInterval(timerId);
            
            //if stopTimer is still false, that means we still had questions left when we ran out of time, so our score will be zero
            if (!stopTimer ){ 
                scoreDisplay.textContent = 'Your Score: 0';
                //timeRemaining = 0;
            }
        }
    }, 1000);

    //call the next question function
    nextQuestion();
    return timeRemaining; //not sure if I need to but yeah
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

//function that brings us to the next question and erases previous answer buttons with the resetQuizState function
function nextQuestion(){
        resetQuizState();
        //this function, described just below, will bring up the question and set of answers at the position in the questions array we are currently at
        cycleQuestions(questions[currentQuestionIndex]);
    }

//this will bring up the question/answers from the current index position, as you can see above in the nextQuestion function
function cycleQuestions(q){
    
    //we have 6 questions, thus if our index exceeds 5, we've run out of questions to ask and need to go to the Game Over screen
    if (currentQuestionIndex > 5) {
        //this code is basically the same as above when our timer ran to zero or a negative number
        questionContainerElement.classList.add('hide');
        nextButton.classList.add('hide');
        gameOverScreen.classList.remove('hide');
        scoresForm.classList.remove('hide');
        var finalScore = document.getElementById('finalScoreContainer');
        var scoreDisplay = document.createElement('h3');
        //since we finished with time remaining, that time will become our score and will be displayed
        scoreDisplay.textContent = 'Your Score: '+timeRemaining;
        finalScore.appendChild(scoreDisplay);

        //as explained above, this is now set to true so we can access the game over screen when we run out of questions
        stopTimer = true;
        return timeRemaining; //so we can grab it later and put it in local storage as our user's score
    }

    else { //if we have still have questions remaining...let's grab them!

    questionsElement.textContent = q.question;
    /*for loop that will create a button for every element in our answers array, set the text content of that button equal to the text at positon
    i of the array of answers within our questions object.*/
    for (i = 0; i < q.answers.length; i++) {
        var button = document.createElement('button');
        button.innerText = q.answers[i].text;

        //setting a class of 'btn' for styling and an id of answerButtons so we can remove them with our resetQuizState when needed
        button.classList.add('btn');
        button.setAttribute('id', 'answerButtons');
        
        //so for all of our potential answers, if the text of that answer at i is the same as the text for correct, we set a value of correct to it
        if (q.answers[i].text === q.correct) {
            button.setAttribute('value', 'correct')
            }
        //for each of these buttons we'll also had a click function of selectAnswer, which is described below
        button.addEventListener('click', selectAnswer);
        //put these answer buttons into the answerButtons div for display
        answerButtons.appendChild(button);
        }       
    }
    
}
                
//this function basically checks if the targeted answer of the user is correct or incorrect, and do some stuff after that
function selectAnswer(event){ 
    //setting a variable to our target
    var userChoice = event.target;

    //if our target has that attribute we just set above ('value') then that's the correct one and we want to indicate as such
    if (userChoice.hasAttribute('value')) {
        //the text content of that targeted button is a bit scathing
        userChoice.textContent ='LUCKY GUESS';
        //style the background of the selected button to green since it was right
        userChoice.setAttribute('style', 'background-color: green');
        //add ten seconds to the clock, and thus the user's score
        timeRemaining += 10;
        //show the next button so we can click it and move to the next question
        nextButton.classList.remove('hide');
               
    }
    else {
        /*if the user chose...poorly...subtract 5 seconds from the timer, really lay into them for being wrong, and change the color
        of the button to red. Again, un-hide the next button. */
        timeRemaining -= 5;
        userChoice.textContent ='LOL WRONG';
        userChoice.setAttribute('style', 'background-color: red');
        nextButton.classList.remove('hide');   
    }  
} 


//adding a click event function to my submit score button
function submitUserScore() {

    //setting variables for the input form for the initials
    var initials = document.getElementById('inputInitials').value.trim();
    //grabbing the 'highScores' from my local storage and covnerting it to a string with JSON.parse
    var highScores = JSON.parse(localStorage.getItem('highScores'));
    
    
    //creating an object to store our individual user scores into
    //user key will have a value of the initials placed in the input box by the user
    //timeRemaining doubles as our user's score
    var userScoreObject = {
        user: initials,
        score: timeRemaining
    }
    //if the highScores array is not empty, i.e. there are already high scores logged, then...
    if (highScores) { 
        //...add the user's initials and score (in object form) into the end of the highScores array
        highScores.push(userScoreObject);
        //creating a new array consisting of the highScores array's data
        //topScores = highScores;
    }
    else { //if the local storage array IS empty, then just create it here and put the userScoreObject in it
        highScores = [userScoreObject]
    }
    
    //now we populate the local storage with a 'stringified' version of that array we just created contaning our user score object
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    //also on clicking this button, we want to be redirected to the high scores page
    location.href = './highscores.html';    
}

//Function to display the high scores on the High Scores page
function displayScores() {

    viewHighScores.classList.add('hide');
    //grabbing the 'highScores' from my local storage and covnerting it to a string with JSON.parse
    var highScores = JSON.parse(localStorage.getItem('highScores'));
    //grabbing the ordered list on our high scores page and setting it to a variable
    var scoresList = document.getElementById('highScoresList');
    
    if (highScores.length > 1){
        //this essentially sorts the highScores array into highest scores to lowest scores...I'm not entirely sure how it works lol
           highScores.sort((a, b) => (a.score < b.score) ? 1 : -1);
        } 
    
    //for every item in our highScores array, we want to display that score in a created list item on the high scores page
    for (var i = 0; i < highScores.length; i++) {
        //create a list item to be added to the above ordered list
        var userScores = document.createElement('li');
        //make the text of that list item equal to the initials and the corresponding score, e.g. <li>"SZ - 70"</li>
        userScores.textContent = highScores[i].user + " - " + highScores[i].score;
       
        //add this list item into the ordered list on our highscores page
        scoresList.appendChild(userScores);
    }
}

/*I had to make this function because I kept getting 'null' errors for these buttons if they did not exist on the page, preventing me
from being able to manipulate local storage among other things. So I basically asked, when the page loads, do these buttons
exist on this page? If they do, then add click functionality to them. */
function onLoad() {
    if (submitScore) {
        //adding click function to 'Submit Score' button if it exists on page. Will run above submitUserScore fxn
        submitScore.addEventListener('click', submitUserScore)
    }
    if (resetScores) {
        //adding click function to the 'Reset High Scores' button if it exists on page -- will empty the local storage on click
        resetScores.addEventListener('click', function(){
            localStorage.clear(); 
        })
    }
    if (restartQuiz) {
        //adding click function to this restart button that will return the user to the quiz's title page (index.html)
        restartQuiz.addEventListener('click', function(){
            location.href='./index.html';
})
    }
    if (startQuiz) {
        //adding click function to the start button - startGame function defined below
        startQuiz.addEventListener('click', startGame);
    }
    if (nextButton) {
        //adding click function to the next button that adds 1 to the index of the question array, proceeding to the next question
        //this also declares the nextQuestion function, which is described below
        nextButton.addEventListener('click', function(){
            currentQuestionIndex++;
            nextQuestion();
})
    }/*when you click this button on the highscores.html page, it will run the above 'displayScores function, which appends high scores 
    from local storage into an ordered list and hide the big button. */
    if (viewHighScores) {
        viewHighScores.addEventListener('click', displayScores)
    }
}
//call this function right away so that when pages load it checks for those buttons before anyone can click them
onLoad();
