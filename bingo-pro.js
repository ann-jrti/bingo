let playerScore = 1000; //set default points for the player
let isLine = false; //set 'cantar línea' to false value

//generates all bingo numbers
let allBingoNumbers = new Array(99).fill(0).map((e, i) => i + 1);

//asks player's username
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
const bong = new Player('Bong Joon Ho', 540);
const cooper = new Player('Cooper', 655);
const elon = new Player('Elon Musk', 900);

//RANKING SYSTEM: explains how ranking works and shows current ranking
const showRank = () => {
  window.alert(`You start with 1000 points!
  The more turns you need to complete the bingo,
  the less points you will get. Good luck!`);
  window.alert(`Current ranking is:
   ${brendan.getData()},
   ${elon.getData()},
   ${cooper.getData()},
   ${bong.getData()}
   `);
};

//BINGO CARD FUNCTION: generates 15 random numbers for the card
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

let card = generate15RandomNumbers(); //creates first bingo card for the player

//BINGO CARD FUNCTION: pull a bingo number from bombo
const pullRandomBingoNumber = () => {
  let indexNum = Math.floor(Math.random() * allBingoNumbers.length);
  let removedNum = allBingoNumbers.splice(indexNum, 1);
  return removedNum[0];
};

//BINGO CARD FUNCTION: asks user to choose a bingo card
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
    return {
      number: number,
      matched: false,
    };
  });
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

const continueOrNot = () => {
  let nextNumberQuestion = window.confirm(
    'Do you want to continue with next number?'
  );
  if (nextNumberQuestion) return true;
  else return false;
};

//checks if number is in the player's card

//continue game
const nextTurn = () => {
  let numberOfTurns = 0;
  while (!bingoCard.every((element) => element.matched === true)) {
    checkNumber();
    checkLine();
    numberOfTurns++;
    playerScore -= 5;
    let nextNumber = continueOrNot();
    if (!nextNumber) console.log('Bye!');
  }
  window.alert('BINGO!');
  console.log(`You have won in ${numberOfTurns} turns.`);
};

const showPointsResults = () => {
  console.log(`You got ${playerScore} points.`);
};

const checkLine = () => {
  if (!isLine) {
    if (
      bingoCard.slice(0, 5).every((e) => e.matched === true) ||
      bingoCard.slice(5, 10).every((e) => e.matched === true) ||
      bingoCard.slice(10, 15).every((e) => e.matched === true)
    ) {
      console.log('LÍNEA!');
      isLine = true;
    }
  }
};

asksPlayerName();
bingoCardSelection();
showRank();
nextTurn();
showPointsResults();
