const startStopBtn = document.getElementById("startstop");

let playing= false;
const GAME = 30;
let game_time;
let score; 
let correctAns;
let intervalObj;

startStopBtn.addEventListener('click', handleStartStop);

function show(selector) {
    document.querySelector(selector).style.display= 'block';
}

function hide(selector) {
    document.querySelector(selector).style.display= 'none';
}

function setInnerHTML(selector,html) {
    document.querySelector(selector).innerHTML = html;
}

function handleStartStop(evt) {
    evt.preventDefault();
    playing=!playing;

    if(playing) {
        startGame();
    }else {
        location.reload();
    } 
}

function startGame() {
    hide('#gameover');
    game_time=GAME;
    score = 0;
    setInnerHTML('#startstop', "Stop Game");
    show('#timeremaining');
    setInnerHTML('#timeremainingValue', GAME);


    scoreValue.innerHTML=score;

    for(let i=1; i<=4 ; i++){
        document.getElementById(`box${i}`).addEventListener('click', verifyAnswer);
    }

    intervalObj = setInterval(function() {
        game_time--;
        if(game_time<=0) {
            endGame();
        }
        setInnerHTML('#timeremainingValue', game_time);
    },1000)

    generateQA();
}

function endGame() {
    clearInterval(intervalObj);
    show('#gameover');
    hide('#timeremaining');
    setInnerHTML('#gameover',`<p>GAME OVER </p> <p>YOUR SCORE: ${score}`);
    setInnerHTML('#startstop', "Start Game");
    playing=false;

    for(let i=1;i<=4;i++){
        document.getElementById(`box${i}`).removeEventListener('click', verifyAnswer);
    }
}

function generateQA() {
    let num1 = generateRandomNumber();
    let num2 = generateRandomNumber();

    correctAns=num1*num2;

    setInnerHTML('#question', `${num1} x ${num2}`);

    const correctAnsBox = generateRandomNumber(1,3);
    setInnerHTML(`#box${correctAnsBox}`, correctAns);

    const answers = [correctAns];

    for(i=1;i<=4;i++) {
        if(i == correctAnsBox) continue;

        let wrongNum1;
        let wrongNum2;
        let wrongAns;

        do {
            wrongNum1 = generateRandomNumber();
            wrongNum2 = generateRandomNumber();
            wrongAns = wrongNum1*wrongNum2;
        }while(answers.indexOf(wrongAns) != -1);

        setInnerHTML(`#box${i}`, wrongAns);
    }
}

function generateRandomNumber(min=1, endMinus1=9) {
    return Math.round(Math.random()*endMinus1)+min;
}

function verifyAnswer() {
    const answerclicked = parseInt(this.innerHTML);

    if(answerclicked ===  correctAns) {
        generateQA();
        score++;
        scoreValue.innerHTML=score;
        show('#correct');
        hide('#wrong');
        setTimeout(function() {
            hide('#correct');
        }, 500);
    } else {
        show('#wrong');
        hide('#correct');
        setTimeout(function() {
            hide('#wrong');
        }, 500)
    }
}

