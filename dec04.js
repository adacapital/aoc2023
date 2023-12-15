const fs = require('fs');

function calculateTotalPoints(cards) {
    let totalPoints = 0;

    cards.forEach(card => {
        const [winningPart, yourPart] = card.split(' | ');
        const winningNumbers = winningPart.split(' ').filter(n => n).map(Number);
        const yourNumbers = yourPart.split(' ').filter(n => n).map(Number);

        const matches = yourNumbers.filter(number => winningNumbers.includes(number));
        if (matches.length > 0) {
            let points = 1 << (matches.length - 1); // Equivalent to Math.pow(2, matches.length - 1)
            totalPoints += points;

            // console.log(card, " , ", matches, " , ", points);
        }
    });

    return totalPoints;
}

function getCardIndex(cardString) {
    const parts = cardString.split(':');
    const cardInfo = parts[0].trim();
    const match = cardInfo.match(/\d+/); // Regular expression to find one or more digits

    return match ? parseInt(match[0], 10) : null;
}

function processCards(cards, totalCards = 0, index = 0) {
    if (index >= cards.length) {
        return totalCards;
    }

    const [winningPart, yourPart] = cards[index].split(' | ');
    const winningNumbers = winningPart.split(' ').filter(n => n).map(Number);
    const yourNumbers = yourPart.split(' ').filter(n => n).map(Number);

    const matches = yourNumbers.filter(number => winningNumbers.includes(number)).length;
    totalCards++; // Count the current card
    // totalCards += matches; // Count the current card
    
    // console.log(cards[index], " , ", matches, " , ", totalCards);

    let newCards = [];
    let carIdx = getCardIndex(cards[index])-1;
    for (let i = 1; i <= matches; i++) {
        // const nextCardIndex = index + i;
        const nextCardIndex = carIdx + i;
        if (nextCardIndex < gCards.length) {
            newCards.push(gCards[nextCardIndex]);
        }
    }

    // Process the current card and then the new cards won
    return processCards(cards, totalCards, index + 1) + processCards(newCards, 0, 0);
    // return processCards(cards, totalCards, index + 1);
}

// Example usage with file reading
let fileName = 'dec04.sample.part1.txt';
// let fileName = 'dec04.input.txt';
let gCards;

fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    gCards = data.trim().split('\n');
    // console.log(gCards);

    const totalPoints = calculateTotalPoints(gCards);
    console.log('Total points:', totalPoints);

    const totalCards = processCards(gCards);
    console.log('Total scratchcards won:', totalCards);
});
