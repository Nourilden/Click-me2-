let btn = document.querySelector(".btn");
let score = 0;
let scoreDisplay = document.querySelector(".score-display");
let levelDisplay = document.querySelector(".leveldisplay");
let comboDisplay = document.getElementById("combo");
let winMessage = document.createElement("div");
let level = 0;
let lastClickTime = 0;
let comboTimeout;

// Level thresholds
const levelThresholds = [30, 60, 90, 100, 130, 160, 190, 200, 240, 260, 290, 300];

function updateScore() {
    score += 1;
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateLevel() {
    if (level < levelThresholds.length && score >= levelThresholds[level]) {
        level += 1;
        levelDisplay.textContent = `Level: ${level}`;
        console.log(`Level increased to: ${level}`);
    }
}

function checkCombo() {
    const currentTime = Date.now();
    if (currentTime - lastClickTime <= 300) {
        comboDisplay.style.opacity = 1;
        comboDisplay.style.animation = "comboExplosion 1s ease-in-out";

        clearTimeout(comboTimeout);
        comboTimeout = setTimeout(() => {
            comboDisplay.style.opacity = 0;
            comboDisplay.style.animation = "none";
        }, 1000);
    }
    lastClickTime = currentTime;
}

function checkWin() {
    if (score >= 300) {
        // Stop the game
        btn.disabled = true;

        // Display "YOU WIN"
        winMessage.textContent = "YOU WIN!";
        winMessage.style.position = "fixed";
        winMessage.style.top = "50%";
        winMessage.style.left = "50%";
        winMessage.style.transform = "translate(-50%, -50%)";
        winMessage.style.fontSize = "5rem";
        winMessage.style.fontWeight = "bold";
        winMessage.style.color = "gold";
        winMessage.style.textShadow = "0 0 10px #FFD700, 0 0 20px #FF8C00, 0 0 30px #FF4500";
        winMessage.style.padding = "20px";
        winMessage.style.border = "5px solid gold";
        winMessage.style.borderRadius = "15px";
        winMessage.style.background = "rgba(0, 0, 0, 0.8)";
        winMessage.style.boxShadow = "0 0 30px rgba(255, 215, 0, 0.8)";
        winMessage.style.textAlign = "center";
        winMessage.style.zIndex = "1000";

        document.body.appendChild(winMessage);
        console.log("You Win!");
    }
}

btn.onclick = function () {
    if (score < 300) { // Prevent additional clicks after winning
        checkCombo();
        updateScore();
        updateLevel();
        checkWin();
    }
};
