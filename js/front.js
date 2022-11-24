let xMoves = []; // x hereketleri
let oMoves = []; // o hereketleri
let mover = 'X'; // hereket gezeginin kimdedigi
let gameOver = false;
const winners = [ // utyan hereketler
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

// hemme buttonlary cagyrdyk
let btns = document.getElementsByClassName('btn');
// netije yazmaly yeri cagyrdyk
let result = document.getElementById('result');

// cagyran buttonlarymyz click, mouseenter, mouseleave eventlaryny gosdyk
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseenter', baranda)
    btns[i].addEventListener('mouseleave', gaydanda)
    btns[i].addEventListener('click', basanda);
}

// mouseenter
function baranda() {
    let e = this;
    if (e.value != 9 && !gameOver) {
        let span = e.children[0];
        if (mover == 'X') {
            span.textContent = 'X';
        } else {
            span.textContent = 'O';
        }
        span.classList.remove('invisible');
    }
}

// mouseleave
function gaydanda() {
    let e = this;
    if (e.value != 9 && !gameOver) {
        let span = e.children[0];
        span.textContent = 'E';
        span.classList.add('invisible');
    }
}

// click
function basanda() {
    let e = this;
    if (e.value != 9 && !gameOver) {
        let span = e.children[0];
        if (mover == 'X') {
            span.textContent = mover;
            span.classList.remove('invisible');
            xMoves.push(+e.value);
            e.value = 9;
            mover = 'O';
        } else {
            span.textContent = mover;
            span.classList.remove('invisible');
            oMoves.push(+e.value);
            e.value = 9;
            mover = 'X';
        }
        checkWinner();
    } else {
        e.classList.remove('btn-primary');
        e.classList.add('btn-danger');
        setTimeout(function () {
            e.classList.remove('btn-danger');
            e.classList.add('btn-primary');
        }, 250)
    }
}


function checkWinner() {
    console.log(xMoves, oMoves)
    let winner_mover = [];
    winners.forEach(winner => {
        if (xMoves.includes(winner[0]) && xMoves.includes(winner[1]) && xMoves.includes(winner[2])) {
            gameOver = true;
            result.textContent = 'X UTDY';
            result.classList.remove('invisible');
            winner_mover = winner;
        }
        if (oMoves.includes(winner[0]) && oMoves.includes(winner[1]) && oMoves.includes(winner[2])) {
            gameOver = true;
            result.textContent = 'O UTDY';
            result.classList.remove('invisible');
            winner_mover = winner;
        }
    });
    if (winner_mover.length > 0) {
        btns[winner_mover[0]].classList.remove('btn-primary');
        btns[winner_mover[0]].classList.add('btn-success');
        btns[winner_mover[1]].classList.remove('btn-primary');
        btns[winner_mover[1]].classList.add('btn-success');
        btns[winner_mover[2]].classList.remove('btn-primary');
        btns[winner_mover[2]].classList.add('btn-success');
    }
}