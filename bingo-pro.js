/* checkear que no se repitan números */
const generateRandomNumber = () => {
    let arr = []
    while (arr.length < 16) {
        let randomNumber = Math.floor(Math.random()* 99);
        let numCheck = arr.find(number => number === randomNumber);
        if (numCheck !== randomNumber && randomNumber !== 0) arr.push(randomNumber);
        // if (numCheck !== '' && randomNumber !== 0) arr.push(randomNumber);
    }
    return arr;
}

let carton = generateRandomNumber();

let bingoCard = [

    { number: carton[0], matched: false },
    { number: carton[1], matched: false },
    { number: carton[2], matched: false },
    { number: carton[3], matched: false },
    { number: carton[4], matched: false },

    //next line
    { number: carton[5], matched: false },
    { number: carton[6], matched: false },
    { number: carton[7], matched: false },
    { number: carton[8], matched: false },
    { number: carton[9], matched: false },

    //next line
    { number: carton[10], matched: false },
    { number: carton[11], matched: false },
    { number: carton[12], matched: false },
    { number: carton[13], matched: false },
    { number: carton[14], matched: false },

];


console.log(bingoCard)
console.table(bingoCard)