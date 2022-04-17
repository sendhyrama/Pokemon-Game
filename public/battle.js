var myHealth = 100;
var enemyHealth = 100;
var bgmusic;
var mySound;
var yourmove;
var savedCompMove;
var compmove;
var totalRound = 0;
var limit = 2;
var delay = 2
let i = 1;
var res;
var playByPlay = document.getElementById('message');
var attackButton = document.getElementById("attack");
var sattackButton = document.getElementById("sattack");
var deffendButton = document.getElementById("deffend");
var sdeffendButton = document.getElementById("sdeffend");
var myHealthBar = document.getElementById("myhealthbar");
var enemyHealthBar = document.getElementById("enemyhealthbar");
var startButton = document.getElementById("startBtn");
var $startBtn = $("#startBtn");
var backmusic = document.getElementById("playbgm");
var sfx1;
var sfx2;
var sfx3;
var sfx4;
var VictoryS;



function playMusic() {
    bgmusic = new Audio("public/music/bg.mp3");
    bgmusic.play();
    bgmusic.volume = 0.1;
}

function stopAudio(bgmusic) {
    bgmusic.pause();
    bgmusic.currentTime = 0;
}
$startBtn.click(function() {
    $layOver.toggle();
})

function startButton() {
    fight(id);
    $layOver.toggle();
    element.classList.toggle("layOver");
}
startButton.onclick = function() {
    fight(id);
    $layOver.toggle();
    element.classList.toggle("layOver");
}

function enableButtons() {
    attackButton.disabled = false;
    sattackButton.disabled = false;
    deffendButton.disabled = false;
    sdeffendButton.disabled = false;

}

function fight(id) {
    addRound();
    compMove(id);
    healthChange();
    gameOver();
}

function addRound() {
    totalRound += 1;
}

function clearText() {
    setInterval(
        function() {
            document.getElementById("message").value = "";
        }, 3000);
}

function startGame() {
    bgmusic = new Audio("public/music/bg.mp3");
    bgmusic.play();
}

function roundResults(res) {

    playByPlay.innerHTML += res + "<p>";
    const limitedInterval = setInterval(() => {
        playByPlay.innerHTML = " ";
        i++;
        if (i > limit) {
            clearInterval(limitedInterval);
            console.log('interval cleared!');
        }
    }, delay * 2000);

}

function ani() {
    document.getElementById('img').pokemon = 'pokemon#img';
}

function healthChange() {
    myHealthBar.style.width = myHealth + "%";
    enemyHealthBar.style.width = enemyHealth + "%";
    if (enemyHealth <= 50) {
        enemyHealthBar.style.backgroundColor = "rgb(255, 200, 0)";
    }
    if (myHealth <= 50) {
        myHealthBar.style.backgroundColor = "rgb(255, 200, 0)";
    }
    if (enemyHealth <= 20) {
        enemyHealthBar.style.backgroundColor = "red";
    }
    if (myHealth <= 20) {
        myHealthBar.style.backgroundColor = "red";
    }
}

function gameOver() {
    if (myHealth === 0 || enemyHealth === 0) {
        myHealthBar.style.width = myHealth + "%";
        enemyHealthBar.style.width = enemyHealth + "%";
        res = 'gameOver!';
        roundResults(res);
        if (myHealth > enemyHealth) {
            VictoryS = new Audio("public/music/VS.mp3");
            VictoryS.play();
            VictoryS.volume = 0.1;
            alert("Game Over!! Player Win!!! \n Player HP : " + myHealth);
        } else if (myHealth < enemyHealth) {
            alert("Game Over!! Computer Win!!! \n Enemy HP : " + enemyHealth);
        } else {
            VictoryS = new Audio("public/music/VS.mp3");
            VictoryS.play();
            VictoryS.volume = 0.1;
            alert("Game Over!!  Player Win!!! \n Enemy HP : " + enemyHealth);
        }
        window.location.reload();
        attackButton.disabled = true;
        sattackButton.disabled = true;
        deffendButton.disabled = true;
        sdeffendButton.disabled = true;
        playAgain.disabled = true;

    }
}



function compMove(id) {
    var move = Math.floor((Math.random() * 4) + 1);
    if (move == 1) {
        savedCompMove = 'attack';
    } else if (move == 2) {
        savedCompMove = 'sattack';
    } else if (move == 3) {
        savedCompMove = 'deffend';
    } else if (move == 4) {
        savedCompMove = 'sdeffend';
    }
    res = ('your move is ' + id + ' and the computers move is ' + savedCompMove + ' on round ' + totalRound);
    roundResults(res);
    damageStep(id, savedCompMove);
    roundResults(res);
}

function damageStep(y, c) {
    if (y === 'attack' && c === 'attack') {
        res = 'Both players took damage';
        $('.pokemon .img').animate({
                'margin-left': '-30px',
                'margin-top': '10px'
            },
            50,
            'swing'
        );
        if (enemyHealth >= 12 && myHealth >= 12) {
            sfx2 = new Audio("public/music/SFX2.mp3");
            sfx2.play();
            sfx2.volume = 0.1;
            enemyHealth -= 12;
            myHealth -= 12;
        } else {
            enemyHealth = 0;
            myHealth = 0;
        }
    } else if (y === 'attack' && c === 'sattack') {
        ani();
        res = 'Both player took damage';
        if (enemyHealth >= 12 && myHealth >= 20) {
            sfx2 = new Audio("public/music/SFX2.mp3");
            sfx2.play();
            sfx2.volume = 0.1;
            enemyHealth -= 12;
            myHealth -= 20;
        } else {
            myHealth = 0;
            enemyHealth = 0;
        }
    } else if (y === 'attack' && c === 'sdeffend') {
        ani();
        res = 'Comp uneffectively deffend';
        if (enemyHealth >= 5) {
            sfx2 = new Audio("public/music/SFX2.mp3");
            sfx2.play();
            sfx2.volume = 0.1;
            enemyHealth -= 5;
        } else {
            enemyHealth = 0;
        }
    } else if (y === 'attack' && c === 'deffend') {
        ani();
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
        res = 'Comp perfectly deff';
    } else if (y === 'sattack' && c === 'attack') {
        ani();
        res = 'Both player took damage';
        if (enemyHealth >= 20 && myHealth >= 12) {
            sfx1 = new Audio("public/music/SFX1.mp3");
            sfx1.play();
            sfx1.volume = 0.1;
            enemyHealth -= 20;
            myHealth -= 12;
        } else {
            myHealth = 0;
            enemyHealth = 0;
        }
    } else if (y === 'sattack' && c === 'sattack') {
        ani();
        res = 'Both player took damage';
        if (enemyHealth >= 20 && myHealth >= 20) {
            enemyHealth -= 20;
            myHealth -= 20;
            sfx1 = new Audio("public/music/SFX1.mp3");
            sfx1.play();
            sfx1.volume = 0.1;
        } else {
            myHealth = 0;
            enemyHealth = 0;
        }
    } else if (y === 'sattack' && c === 'deffend') {
        ani();
        res = 'Comp deffend was failed, damage taken';
        if (enemyHealth >= 15) {
            sfx1 = new Audio("public/music/SFX1.mp3");
            sfx1.play();
            sfx1.volume = 0.1;
            enemyHealth -= 15;
        } else {
            enemyHealth = 0;
        }
    } else if (y === 'sattack' && c === 'sdeffend') {
        ani();
        res = 'Comp perfectly deffend';
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
    } else if (y === 'deffend' && c === 'deffend') {
        ani();
        res = 'Both perfectly deffend';
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
    } else if (y === 'deffend' && c === 'attack') {
        ani();
        res = 'You perfectly deff';
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
    } else if (y === 'deffend' && c === 'sattack') {
        ani();
        res = 'Your deffend was failed, damage taken';
        if (myHealth >= 15) {
            sfx3 = new Audio("public/music/SFX3.mp3");
            sfx3.play();
            sfx3.volume = 0.1;
            myHealth -= 15;
        } else {
            myHealth = 0;
        }
    } else if (y === 'deffend' && c === 'sdeffend') {
        ani();
        res = 'Both perfectly deffend';
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
    } else if (y === 'sdeffend' && c === 'sdeffend') {
        ani();
        res = 'Both perfectly deffend';
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
    } else if (y === 'sdeffend' && c === 'sattack') {
        ani();
        res = 'You perfectly deffend';
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
    } else if (y === 'sdeffend' && c === 'attack') {
        ani();
        res = 'You uneffectively deffend';
        if (myHealth >= 5) {
            sfx3 = new Audio("public/music/SFX3.mp3");
            sfx3.play();
            sfx3.volume = 0.1;
            myHealth -= 5;
        } else {
            myHealth = 0;
        }
    } else if (y === 'deffend' && c === 'sdeffend') {
        ani();
        res = 'Both perfectly deffend';
        sfx4 = new Audio("public/music/SFX4.mp3");
        sfx4.play();
        sfx4.volume = 0.1;
    }
}

window.onload = enableButtons();
