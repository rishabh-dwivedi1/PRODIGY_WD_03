
let boxes = document.querySelectorAll(".box-align");
let turn = "X";
let isgameover = false;
let mode = "Player"; 

boxes.forEach(e => {
    e.addEventListener("click", () => {
        if (!isgameover && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function toggle(button) {
    document.querySelectorAll(".mode").forEach(btn => {
        btn.classList.remove("active");
    });
    button.classList.add("active");
    mode = button.textContent; 
    resetGame();

    if (mode === "Computer" && turn === "O") {
        computer();
    }
}

function computer() {
    if (turn === "O" && !isgameover) {
        let availableBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
        if (availableBoxes.length > 0) {
            let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
            randomBox.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    }
}

function checkWin() {
    let winconditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let i = 0; i < winconditions.length; i++) {
        let v0 = boxes[winconditions[i][0]].innerHTML;
        let v1 = boxes[winconditions[i][1]].innerHTML;
        let v2 = boxes[winconditions[i][2]].innerHTML;
        
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isgameover = true;
            document.querySelector("#final").innerHTML = v0 + " Wins!";
            document.querySelector("#again").style.display = "inline";

            for (let j = 0; j < 3; j++) {
                boxes[winconditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winconditions[i][j]].style.color = "#000";
            }
            return;
        }
    }
}

function checkDraw() {
    let isDraw = Array.from(boxes).every(box => box.innerHTML !== "");
    if (isDraw) {
        isgameover = true;
        document.querySelector("#final").innerHTML = "DRAW";
        document.querySelector("#again").style.display = "inline";
    }
}

function changeTurn() {
    if (!isgameover) {
        turn = (turn === "X") ? "O" : "X"; 
        document.querySelector(".color").style.left = (turn === "O") ? "85px" : "0";
        
        if (mode === "Computer" && turn === "O") {
            setTimeout(computer, 500); 
        }
    }
}

function resetGame() {
    isgameover = false;
    turn = "X";
    document.querySelector(".color").style.left = "0";
    document.querySelector("#final").innerHTML = "";
    document.querySelector("#again").style.display = "none";
    
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
}

document.querySelector("#again").addEventListener("click", resetGame);
