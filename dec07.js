const fs = require('fs');
const cardOrder = 'AKQJT98765432';

function handStrength(hand) {
    const counts = {};
    hand.split('').forEach(card => counts[card] = (counts[card] || 0) + 1);

    const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1] || cardOrder.indexOf(a[0]) - cardOrder.indexOf(b[0]));
    const sortedHand = sortedCounts.map(pair => pair[0].repeat(pair[1])).join('');

    let type = sortedCounts.map(pair => pair[1]).join('');
    if (type === '32') type = '5'; // Full house
    else if (type === '41') type = '6'; // Four of a kind
    else if (type === '311') type = '7'; // Three of a kind
    else if (type === '221') type = '8'; // Two pair
    else if (type === '2111') type = '9'; // One pair
    else type = '10'; // High card

    return [type, sortedHand];
}

function totalWinningsFromFile(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const hands = content.trim().split('\n').map(line => {
        const [hand, bid] = line.split(' ');
        return { hand, strength: handStrength(hand), bid: Number(bid) };
    });

    hands.sort((a, b) => a.strength[0] - b.strength[0] || cardOrder.indexOf(a.strength[1][0]) - cardOrder.indexOf(b.strength[1][0]));

    return hands.reduce((sum, hand, index) => sum + hand.bid * (hands.length - index), 0);
}

// Using the function to read from 'input.txt' and find the total winnings
// const filename = 'dec07.sample.txt';
const filename = 'dec07.sample2.txt';
// const filename = 'dec07.input.txt';
const winnings = totalWinningsFromFile(filename);
console.log(winnings);
