# Code Quiz - Homework 4

A function quiz to test your knowledge of TV.

# Purpose of Repository

This is the fourth homework assignment of the bootcamp. The assignment called for the creation of a quiz, heavily utilizing javascript and DOM functionality. A firm grasp of javascript commands and logic was required in order to program buttons to start the quiz, cycle through questions, display messages for right or wrong answers, store users' high scores to the local storage, and reset the scores by clicking a button. 

# Description of Repository

A quiz of certain length is the main feature of this assignment. One presses a button to start the quiz, which will direct the user away from the title screen to the first question of the assignment. A timer then starts in the upper right corner of the screen upon clicking the start button, counting down from 30 seconds. If the user selects the button associated with the right answer to the question, 10 seconds is added to the timer and the quiz continues to the next question. If the user selects incorrectly, 5 seconds is subtracted from the timer and the quiz proceeds to the next question.

When quiz ends and directs the user to the 'Game Over' screen. The Game Over screen contains an input box asking for the user's intials, as well as a submit button which, when pressed, will store the user's high score in the local storage. If the timer reaches zero before the user finishes the quiz, the user will automatically be redirected to the Game Over screen and their score will be 0. Otherwise, if they finish with time left on the clock, their score will be their time remaining.

Upon submitting the user's score, the user will be redirected to the 'High Scores' page, which is a separate html file. On this page, the high scores from the local storage will be displayed in a list on the page. Below this list rests a 'Restart Quiz' button, taking you back to the quiz html file with the start button. Another button adjacent to 'Restart Quiz', labeled 'Reset High Scores', will clear the local storage of high scores. 

# Files in Repository

There are two html files within this repository. The principle file is index.html, which codes for the the actual quiz itself, including the title screen, the quiz questions, and the Game Over screen with the input form and submit button. 

The highscores.html page simply displays the top scores stored in the local storage. It also has a button for restarting the quiz and another button for resetting the highscores from local storage. 

The Assets folder contains a folder for the style.css file and a separate folder housing the logic.js file. This is the extent of the files in the repository. 

# Links and Pictures



