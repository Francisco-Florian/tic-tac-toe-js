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
            displayPlayerSymbol(index)
            // on cherche si quelqun a gagner
            checkGameWon();
        });
    });
}

function start(){
    const startBtn = document.querySelector('#start')
    startBtn.addEventListener('click', () =>{
        playWithDebilla()
    })
}
start()

function stop(){
    const stopBtn = document.querySelector('#stop')
    stopBtn.addEventListener('click', () => {
        
    })
}
stop()

function displayPlayerSymbol(index){
    document.querySelectorAll(".cell")[index].innerHTML = currentPlayer === 1 ? player1 : player2;
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

        // if (currentPlayer === 2){
        //     playWithDebilla()
        // }
        setTimeout(playWithDebilla, Math.floor(200 + Math.random() * 750), 'lancement de la fonction entre 0 et 750ms')
    }

    // Si le jeu est terminé sans vainqueur
    if(isGameFinished && !isGameWon){
        score.draw++
    }

    // Fonction qui permet de mettre à jour les scores
    initScore()

    if (isGameFinished || isGameWon){
        newGame()
    }
}

function changePlayer(){
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function playWithDebilla(){

    /*
        pour que debilla puisse jouer, elle doit pouvoir connaitre les case vide
        et choisir une case vide aléatoirement.

        premiere version simple :
        - debilla choisi une case vide aléatoirement entre 0 et 8
        - si la case est vide elle joue
        - si la case est pleine elle recommence

        un fois que l'ia a jouer, on verifie si elle a gagner
        on doit relancer la fonction changePlayer pour que le joueur 1 puisse jouer
    */

    // On choisi un nombre alétatoire entre 0 et 8
    let randomIndex = Math.floor(Math.random() * 9);
    console.log('randomIndex ', randomIndex)

    // On vérifie si la case est vide
    if(grid[randomIndex] === 0){
        // La case est vide, on peut jouer
        grid[randomIndex] = currentPlayer;

        // On affiche le symbole du joueur sur le DOM
        displayPlayerSymbol(randomIndex)
        // On test pour savoir si quelqu'un a gagné
        checkGameWon()
    } else {
        // La case n'est pas vide, on recommence
        setTimeout(playWithDebilla, Math.floor(200 + Math.random() * 750), 'lancement de la fonction entre 0 et 750ms')
    }

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
    setTimeout(playWithDebilla, 2000, 'lancement de la fonction entre 0 et 750ms')
}





