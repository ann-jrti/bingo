let playerScore = 1000; //set default points for the player
let isLine = false; //set line to false
let numberOfTurns = 0; //set number of turns to 0

//generates all bingo numbers in bombo
let allBingoNumbers = new Array(99).fill(0).map((e, i) => i + 1);

//asks player's name
const asksPlayerName = () => {
  let playerName = window.prompt('WELCOME TO BINGO! What is your name?');
  if (playerName !== null)
    window.alert(`Hello ${playerName}. Let's start the game!`);
  else window.alert(`Hi guest!`);
};

//RANKING SYSTEM: ficticial player constructor
function Player(name, score) {
  this.name = name;
  this.score = score;
}
//RANKING SYSTEM: method for showing player data
Player.prototype.getData = function () {
  return `${this.name} with ${this.score} points`;
};

//RANKING SYSTEM: list of ficticial players
const brendan = new Player('Brendan', 925);
const bong = new Player('Bong Joon Ho', 510);
const cooper = new Player('Cooper', 655);
const elon = new Player('Elon Musk', 850);

//RANKING SYSTEM: explains how ranking works and shows current ranking
const showRank = () => {
  window.alert(`You start with 1000 points!
  The more turns you need to complete the bingo,
  the less points you will get. Good luck!`);
  window.alert(`Current ranking is:
   1. ${brendan.getData()},
   2. ${elon.getData()},
   3. ${cooper.getData()},
   4. ${bong.getData()}
   `);
};

//RANKING SYSTEM: show final rank to player
const showScoreResult = () => {
  if (!bingoCard.every((e) => e.matched === true))
    console.log('You left the game. No score achieved. See you soon!');
  else {
    console.log(`You got ${playerScore} points.`);
    let points = [];
    points.push(
      brendan.score,
      elon.score,
      cooper.score,
      bong.score,
      playerScore
    );
    points.sort(function (a, b) {
      return b - a;
    });
    let playerPointsRank = points.indexOf(playerScore) + 1;
    console.log(`You got the place number ${playerPointsRank} in the rank!`);
  }
};

//generates 15 random numbers for the card
const generate15RandomNumbers = () => {
  let cardNumbers = [];
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
  let askCard = window.confirm(
    `Do you want to keep this card numbers? ${card.join(' ')}`
  );
  if (!askCard) {
    card = generate15RandomNumbers();
    bingoCardSelection();
  }
  bingoCard = card.map((number) => {
    //formates card into an object
    return {
      number: number,
      matched: false,
    };
  });
};

//pull a bingo number from bombo
const pullRandomBingoNumber = () => {
  let indexNum = Math.floor(Math.random() * allBingoNumbers.length);
  let removedNum = allBingoNumbers.splice(indexNum, 1);
  return removedNum[0];
};

//check if number is in the player's bingo card
const checkNumber = () => {
  let newBingoNum = pullRandomBingoNumber();
  let showNextNum = window.confirm(newBingoNum);
  if (showNextNum) {
    let indexNum = card.indexOf(newBingoNum);
    if (indexNum !== -1) {
      console.log(`You've found the number ${card[indexNum]} in your card!`);
      bingoCard[indexNum].number = 'X';
      bingoCard[indexNum].matched = true;
      console.table(bingoCard);
    }
  }
};

//asks player to continue after each turn
const continueOrNot = () => {
  let nextNumberQuestion = window.confirm(
    'Do you want to continue with next number?'
  );
  if (nextNumberQuestion) nextTurn();
  else window.alert('Thank you and bye!');
};

//performs next turn picking a new number from bomb
const nextTurn = () => {
  if (!bingoCard.every((element) => element.matched === true)) {
    checkNumber();
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
      bingoCard.slice(0, 5).every((e) => e.matched === true) ||
      bingoCard.slice(5, 10).every((e) => e.matched === true) ||
      bingoCard.slice(10, 15).every((e) => e.matched === true)
    ) {
      console.log('LINE!');
      isLine = true;
    }
  }
};

//notifies when player completed bingo
const bingo = () => {
  if (bingoCard.every((e) => e.matched === true)) {
    window.alert('BINGO!');
    console.log(`You have won in ${numberOfTurns} turns.`);
  }
};

/* starts program */
asksPlayerName();
bingoCardSelection();
showRank();
nextTurn();
bingo();
showScoreResult();
