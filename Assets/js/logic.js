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
            
});

