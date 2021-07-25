/* checkear que no se repitan números */
const generate15RandomNumbers = () => {
    const arr = []
    while (arr.length < 15) {
        let randomNumber = generateRandomNumber();
        let numCheck = arr.find(number => number === randomNumber);
        if (numCheck !== randomNumber && randomNumber !== 0) arr.push(randomNumber);
    }
    return arr;
}


const generateRandomNumber = () => Math.floor(Math.random()* 99)

let card = generate15RandomNumbers();

let bingoCard = card.map(e => {
    return {
        number: e, matched: false
    }
})

const asksPlayerName = () => {
    let playerName = window.prompt('What is your name?')
}


console.table(bingoCard)

const nextTurn = () => {
    let newRandomNum = generateRandomNumber();
    let nextNumber = window.confirm(newRandomNum);
    if (nextNumber) {
        let indexNumber = card.findIndex(element => element === newRandomNum)
        if (indexNumber !== -1) {
            console.log(`You've found the number ${card[indexNumber]}`)
            bingoCard[indexNumber].number = 'X'
            bingoCard[indexNumber].matched = true;  
        }
    console.table(bingoCard)
    }
}

const getLine = (bingoCard, lineNumber) => {
    const offset = 5 * lineNumber
    return bingoCard.slice(offset, 4 + offset)
} 

const cantarLinea = () => {
    for (let i = 0; i < 3; i++) {
        const line = getLine(bingoCard, i);
        let unmatched = line.find(e => e.matched === false);
        if (!unmatched) console.log('línea!');
    }
}

nextTurn() 

let numbers = new Array(99).fill(0).map((e, i) => i + 1)

