//----Question's constructor----//
function Question(text,choices,answer) {
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}
    //Definition of correct answer method
    Question.prototype.correctAnswer = function (choice){
        return choice === this.answer;
    };

//----Quiz constructor----//
function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
    //Definition of current question method
    Quiz.prototype.getQuestionIndex = function(){
        return this.questions[this.questionIndex];
    };
    //Definition of conditions that end the quiz
    Quiz.prototype.isEnded = function () {
        return this.questions.length === this.questionIndex;
    };
    //Definition of quiz progress lethod
    Quiz.prototype.play = function(answer) {
        if (this.getQuestionIndex().correctAnswer(answer)){
            this.score++;
        }
        this.questionIndex++;
    };

//----Application script----//
//Methods for running the quiz
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
            display("btn" +  i, choices[i]);
        }
        showProgress();
    }
}

function display(id,guess){
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
    var result = "<h1>Result</h1>";
    var element = document.getElementById("quiz");
    result += "<h2 id='score'>Your score is " + quiz.score + "</h2>"

    //Method to allow insertion of a video in success case
    function insertVideo(element, src, type) {
        var element = document.getElementById("quiz");
        var video = document.createElement('video');
        var source = document.createElement('source');
        source.src = src;
        source.type = type;

        element.appendChild(video);
        video.appendChild(source);

        video.play();
        video.loop = true;
    }

    //Method to allow insertion of a button in case of failure
    function tryAgain(){
        var restart = document.getElementById("btnTry");
        restart.onclick = function(){
            location.reload();
        };
    }

    var failed = "<h3 id='com'><button id='btnTry'> Try Again !!</button></h3>";
    var success = "<h3 id='com'>Congratulations !!</h3>";

    if(quiz.score < quiz.questions.length){
        element.innerHTML = result + failed;
        tryAgain();
    }else{
        element.innerHTML = result + success;
        var video = document.createElement('video');
        insertVideo(video, "https://media.giphy.com/media/ehhuGD0nByYxO/giphy.mp4", 'video/mp4');
        //console.log(video.canPlayType('video/mp4')); 
    }
}

//List of the quiz questions: ("question",[choices],"answer"}
var questions = [
    new Question("Quel mode de reproduction ne correspond à aucun reptile ?",["Ovipare", "Vivipare","Ovovipare","Ovovivipare"], "Vivipare"),
    new Question("Quel pays n'a pas de frontière avec la Russie ?",["Mongolie", "Lituanie","Azerbaïdjan","Corée du Sud"], "Corée du Sud"),
    new Question("Quel est l'équivalent grec de Jupiter ?",["Cronos", "Poseidon","Zeus","Hades"], "Zeus"),
    new Question("Quel pays n'est pas traversé par le Danube?",["Autriche", "Slovenie","Allemagne","Bulgarie"], "Slovenie"),
    new Question("Quels animaux sont étudiés par les ichtyologues ?",["Les poissons", "Les oiseaux","Les reptiles","les insectes"], "Les poissons"),
    new Question("Comment se prénommait le frère de Vincent Van Gogh ?",["Léo","Hugo","Théo","Timo"],"Théo")
];

var quiz = new Quiz(questions);

edit();
