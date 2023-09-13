var body = document.body;

var color = ['red', 'green', 'blue', 'yellow', 'violet'];
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}


var width = window.innerWidth;
var height = window.innerHeight;

function create() {
    let balloon = document.createElement("div");
    balloon.classList = 'balloon balloon-' + color.sample();
    let bl_width = balloon.width;
    balloon.style.left = (Math.round(Math.random()*width*0.9)+10) + "px";
    balloon.style.top = height;
    body.appendChild(balloon);

    balloon.old_balloon = false;

    balloon.addEventListener("click", (event) => {
        clearInterval(balloon.looping);
        balloon.remove();
        if (!balloon.old_balloon) {
            score++;
        }
        if (!isLosed) {
            elm_score.array.forEach(element => {
                element.textContent = score;
            });
        }
    });
    animate(balloon);

    number_balloon++;
    if (number_balloon%10 === 0) {
        number_balloon = 0;
        if (speed > 3) {
            speed -= speed_up;
        }
        timePopup = timePopup/10*9;
        update();
    }
}


function animate(balloon) {
    let time = 0;
    
    balloon.looping = setInterval(function(){
        time++;
        balloon.style.top = height - time + "px";
        if (isLosed) {
            balloon.old_balloon = true;
        }

        if (time > height + 150) {
            time = 0;
            clearInterval(balloon.looping);
            balloon.remove();
            if (!balloon.old_balloon) {
                isLosed = true;
            }
        }
    }, speed);
}

function startGame() {
    gameLoop = setInterval(() => {
        create();

        if(isLosed) {
            stopGame();
            losedPopup();
        }
    }, timePopup);
}

function stopGame() {
    clearInterval(gameLoop);
}

function update() {
    stopGame();
    startGame();
}

function losedPopup() {
    popup.style.display = "block";
    popup.style.zIndex = "0";
}

var resetGame = document.getElementById("reset-btn");
resetGame.addEventListener("click", event => {
    reset(event);
});


var endGame = document.getElementById("end-game");
endGame.addEventListener("click", function() {
    popup.style.display = "none";
    window.close();
})

function reset(event) {
    speed = 10;
    timePopup = 1000;
    score = 0;
    isLosed = false;
    elm_score.array.forEach(element => {
        element.textContent = 0;
    });
    popup.style.display = "none";
    startGame();
}

var number_balloon = 0;
var popup = document.getElementById("popup");
var elm_score = {array: document.querySelectorAll('.score')};
var gameLoop;
var speed = 10;
var speed_up = 1;
var timePopup = 1000;
var score = 0;
var isLosed = false;

startGame();