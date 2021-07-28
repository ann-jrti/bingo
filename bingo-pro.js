//generates all bingo numbers
let allBingoNumbers = new Array(99).fill(0).map((e, i) => i + 1)

//generates 15 random numbers for the card
const generate15RandomNumbers = () => {
    let cardNumbers = []
    while (cardNumbers.length < 15) {
        let randomNumber = Math.floor(Math.random()* 99)
        let numCheck = cardNumbers.find(number => number === randomNumber);
        if (numCheck !== randomNumber && randomNumber !== 0) cardNumbers.push(randomNumber);
    }
    return cardNumbers;
}

//asigns numbers to the bingo card
let card = generate15RandomNumbers();

//formates bingo card 
let bingoCard = card.map(e => {
    return {
        number: e, matched: false
    }
})
 
 //pull a bingo number
 const pullRandomBingoNumber = () => {
    let indexNum = Math.floor(Math.random() * allBingoNumbers.length);
     let removedNum = allBingoNumbers.splice(indexNum, 1)
     return removedNum[0]
 }

 //asks player username
 const asksPlayerName = () => {
    let playerName = window.prompt('What is your name?')
}

//checks if number is in the player's card
const checkNumber = () => {
    const newRandomNum = pullRandomBingoNumber();
    let showNextNum = window.confirm(newRandomNum);
    if (showNextNum) {
        const indexNum = card.indexOf(newRandomNum);
        if (indexNum !== -1) {
            console.log(`You've found the number ${card[indexNum]}!`)
            bingoCard[indexNum].number = 'X';
            bingoCard[indexNum].matched = true;  
        } 
    } 
    getLine(bingoCard, 0)
    cantarLinea()
    console.table(bingoCard)
}


const keepDoingIt = () => {
    while (!card.forEach(element => element === 'X')) {
        checkNumber()
    }
}

//generate line
const getLine = (bingoCard, lineNumber) => {
    const offset = 5 * lineNumber;
    return bingoCard.slice(offset, 4 + offset);
} 

//checks if user completed any line
const cantarLinea = () => {
    for (let i = 0; i < 3; i++) {
        const line = getLine(bingoCard, i);
        let unmatched = line.find(e => e.matched === false);
        if (!unmatched) window.alert('LÍNEA!');
    }
}



keepDoingIt()