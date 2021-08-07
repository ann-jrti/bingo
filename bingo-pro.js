let playerScore = 1000; //set starting points for the player
let isLine = false; //set bingo line to false
let numberOfTurns = 0; //set number of turns to 0

//asks player's name
const asksPlayerName = () => {
  let playerName = window.prompt('WELCOME TO THE BINGO GAME! What´s your name?');
  if (playerName !== null) window.alert(`Hello ${playerName}. Let´s start the game!`);
  else  {
    playerName = 'guest'
    window.alert(`Hi guest! Let´s start the game`);
    }
    return playerName;
};

let playerName = asksPlayerName();

//generates all bingo numbers in bombo
let allBingoNumbers = new Array(99).fill(0).map((e, i) => i + 1);

//RANKING SYSTEM: ficticial player constructor
function Player(name, score) {
  this.name = name;
  this.score = score;
}
//RANKING SYSTEM: method for showing player score
Player.prototype.getData = function () {
  return `${this.name} with ${this.score} points`;
};

//RANKING SYSTEM: list of ficticial players
const brendan = new Player('Brendan', 925);
const bong = new Player('Bong Joon Ho', 510);
const cooper = new Player('Cooper', 655);
const elon = new Player('Elon Musk', 850);

//RANKING SYSTEM: shows explanation of how ranking works to player
const explainGame = () => {
  window.alert(`You start with 1000 points!
  The more turns you need to complete the bingo,
  the less points you will get. Each turn substracts
  5 points. Good luck!`);
};

//RANKING SYSTEM: show final rank to player
const showScoreResult = () => {
  if (!bingoCard.every((e) => e.number === 'X')) console.log('You left the game. No score achieved. See you soon!');
  else {
    console.log(`You got ${playerScore} points.`);
    let ranking = [];
    const player = new Player(playerName, playerScore);
    ranking.push(brendan, elon, cooper, bong, player);
    ranking.sort(function (a, b) {
      return b.score - a.score;
    });
    console.log('Final ranking is:')
    for (let i = 0; i < ranking.length; i++) {
      console.log(ranking[i].getData());
    }
    console.log('Thank you for playing!')
  }
};

//generates 15 random numbers for the card
const generate15RandomNumbers = () => {
  while (cardNumbers.length < 15) {
    let randomNumber = Math.floor(Math.random() * 99);
    let numCheck = cardNumbers.find((number) => number === randomNumber);
    if (numCheck !== randomNumber && randomNumber !== 0)
      cardNumbers.push(randomNumber);
  }
  return cardNumbers;
};

let card = generate15RandomNumbers(); //creates first card for the player

//asks user to choose a bingo card
const bingoCardSelection = () => {
  console.table(card);
  let askCard = window.confirm(`Do you want to keep this card numbers? ${card.join(' | ')}`);
  if (!askCard) {
    card = generate15RandomNumbers();
    bingoCardSelection();
  }
  bingoCard = card.map((number) => { //formates card into an object
    return {
      number: number,
    };
  });
};

//pull a random bingo number from bombo
const pullRandomBingoNumber = () => {
  let indexNum = Math.floor(Math.random() * allBingoNumbers.length);
  let removedNum = allBingoNumbers.splice(indexNum, 1);
  return removedNum[0];
};

//check if number is in the player´s bingo card
const checkIfNumberIsOnCard = () => {
  let newBingoNum = pullRandomBingoNumber();
  let showNextNum = window.confirm(newBingoNum);
  if (showNextNum) {
    let indexNum = card.indexOf(newBingoNum);
    if (indexNum !== -1) {
      console.log(`You´ve found the number ${card[indexNum]} in your card!`);
      bingoCard[indexNum].number = 'X';
      console.table(bingoCard);
    }
  }
};

//asks player to continue after each turn
const continueOrNot = () => {
  let nextNumberQuestion = window.confirm('Do you want to continue with next number?');
  if (nextNumberQuestion) nextTurn();
  else window.alert('Thank you and bye!');
};

//performs next turn 
const nextTurn = () => {
  if (!bingoCard.every((element) => element.number === 'X')) {
    checkIfNumberIsOnCard();
    checkLine();
    numberOfTurns++;
    playerScore -= 5;
    continueOrNot();
  }
};

//notifies if player has a bingo line
const checkLine = () => {
  if (!isLine) {
    if (
      bingoCard.slice(0, 5).every((e) => e.number === 'X') ||
      bingoCard.slice(5, 10).every((e) => e.number === 'X') ||
      bingoCard.slice(10, 15).every((e) => e.number === 'X')
    ) {
      console.log('LINE!');
      isLine = true;
    }
  }
};

//notifies when player completed bingo game
const bingo = () => {
  if (bingoCard.every((e) => e.number === 'X')) {
    window.alert('BINGO!');
    console.log(`Bingo completed! You have won in ${numberOfTurns} turns.`);
  }
};

/* starts program */
bingoCardSelection();
explainGame();
nextTurn();
bingo();
showScoreResult();
