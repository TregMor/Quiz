//Question's constructor
function Question(text,choices,answer) {
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}
    //Definition of correct answer method
Question.prototype.correctAnswer = function (choice){
    return choice === this.answer;
};

//----Controller----//

//Quiz constructor
function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
    //Method for current question
    Quiz.prototype.getQuestionIndex = function(){
        return this.questions[this.questionIndex];
    };
    //Method for conditions that end of the quiz
    Quiz.prototype.isEnded = function () {
        return this.questions.length === this.questionIndex;
    };
    //Method for quiz progress
    Quiz.prototype.play = function(answer) {
        if (this.getQuestionIndex().correctAnswer(answer)){
            this.score++;
        }
        this.questionIndex++;
    };

//----Application script----//
//Method for running the quiz
function edit(){
    if (quiz.isEnded()){
        showScores ();
    }
    else {
        //Display question
        var quest = document.getElementById("question");
        quest.innerHTML = quiz.getQuestionIndex().text;

        //Display choices
        var choices=quiz.getQuestionIndex().choices;
        for(var i=0; i<choices.length; i++){
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            play("btn" +  i, choices[i]);
        }
        showProgress();
    }
}

function play(id,guess){
    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.play(guess);
        edit();
    }
}
function showProgress(){
    var currentQuestionNb = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNb + " of " + quiz.questions.length;
}
function showScores(){
    var quizEnded = "<h1>Result</h1>";
    var element = document.getElementById("quiz");
    quizEnded += "<h2 id='score'>Your score is " + quiz.score + "</h2>"

    var failed = "<h3 id='com'>Try Again !!</h3>";
    var success = "<h3 id='com'>Congratulations !!</h3>";
    if(quiz.score < quiz.questions.length){
        element.innerHTML = quizEnded + failed;
    }else{
        element.innerHTML = quizEnded + success;
    }
}

//Description of the quiz questions: {question,choices,answer}
var questions = [
    new Question("Quel mode de reproduction ne correspond à aucun reptile ?",["Ovipare", "Vivipare","Ovovipare","Ovovivipare"], "Vivipare"),
    new Question("Quel pays n'a pas de frontière avec la Russie ?",["Mongolie", "Lituanie","Azerbaïdjan","Corée du Sud"], "Corée du Sud"),
    new Question("Quel pays n'est pas traversé par le Danube?",["Autriche", "Slovenie","Allemagne","Bulgarie"], "Slovenie"),
    new Question("Quel est l'équivalent grec de Jupiter ?",["Cronos", "Poseidon","Zeus","Hades"], "Zeus"),
    new Question("Quels animaux sont étudiés par les ichtyologues ?",["Les poissons", "Les oiseaux","Les reptiles","les insectes"], "Les poissons"),
    new Question("Comment se prénommait le frère de Vincent Van Gogh ?",["Léo","Hugo","Théo","Timo"],"Théo")
];

var quiz = new Quiz(questions);

edit();
