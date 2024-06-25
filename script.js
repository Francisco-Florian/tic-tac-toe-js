// etape 1 : 2 joueur physique
// etape 2 : joueur vs "ia"
// etpape 3 : version impossible de gagner (peut faire un draw)

// etape 1

const player1 = '<i class="fa-solid fa-x"></i>';
const player2 = '<i class="fa-solid fa-o"></i>';

let currentPlayer = 1;

let isGameWon = false;

let isGameFinished = false;
// la grille
let grid =[0,0,0,
            0,0,0,
            0,0,0]
;

const score = {
    player1: 0,
    player2: 0,
    draw: 0
}

// const newGame = document.querySelector('#newGame');

function init(){
    addListennerToCells();
    initScore();

    document.querySelector('button').addEventListener('click', newGame)
}
init()

function initScore(){
    document.querySelector('#j1').innerHTML = score.player1
    document.querySelector('#draw').innerHTML = score.draw
    document.querySelector('#j2').innerHTML = score.player2
}


function addListennerToCells(){
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
        cell.addEventListener('click', (e) => {
            // on verifie si la case est vide
            if(grid[index] !== 0 || isGameWon || isGameFinished){
                // la case n'est pas vide
                return;
            }
            // si on arrive la c'est que la case est vide
            // on ajoute le symbole
            grid[index] = currentPlayer;
            cells[index].innerHTML = currentPlayer === 1 ? player1 : player2;
            // on cherche si quelqun a gagner
            checkGameWon();
        });
    });
}


// verifier si il y a un gagnant
function checkGameWon(){

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
        [0, 4, 8], [2, 4, 6] // Diagonales
    ]

    // Fonction qui vérifie si une combinaison données est gagnante
    const isWinningCombination = (combination) => 
        combination.every(index => grid[index] === currentPlayer)

    // On vérifie si une combinaison gagnante est présente
    isGameWon = winningCombinations.some(isWinningCombination);
    if(isGameWon) {
        if(currentPlayer === 1){
            score.player1++
        } else  {
            score.player2++
        }
    }
   
    // On vérifie si la partie est finie
    isGameFinished = grid.every(cell => cell !== 0);

    // Si personne n'a gagné et que le jeu n'est PAS terminé : on change le joueur
    if(!isGameWon && !isGameFinished){
        changePlayer()
    }

    // Si le jeu est terminé sans vainqueur
    if(isGameFinished && !isGameWon){
        score.draw++
    }

    // Fonction qui permet de mettre à jour les scores
    initScore()
}

function changePlayer(){
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// fonction de reset
function newGame(){
    currentPlayer = 1;
    isGameWon = false;
    isGameFinished = false;
    grid = [0, 0, 0, 
            0, 0, 0, 
            0, 0, 0];

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
}





