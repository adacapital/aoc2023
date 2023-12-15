const fs = require('fs');
const readline = require('readline');

async function processFilePart1(filename) {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let sumValue = 0;
    let calibrationValues = [];

    for await (const line of rl) {
        const digits = line.match(/\d/g); // Find all digits in the line
        if (digits && digits.length > 0) {
            const firstDigit = digits[0];
            const lastDigit = digits.length > 1 ? digits[digits.length - 1] : firstDigit;
            const calibrationValue = parseInt(firstDigit + lastDigit, 10);
            calibrationValues.push(calibrationValue);
            sumValue += calibrationValue;
        }
    }

    console.log('Part 1 Calibration Values:', calibrationValues.join(', '));
    console.log('Part 1 Sum Value:', sumValue);
}

const numberWords = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
};

const digitWords = {
    '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
    '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '0': 'zero'
};

function convertDigitsToWords(line) {
    return line.split('').map(char => digitWords[char] || char).join('');
}

function findNumberWords(line) {
    const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const found = [];
    numberWords.forEach(word => {
        let pos = line.indexOf(word);
        while (pos !== -1) {
            found.push({ word, pos });
            pos = line.indexOf(word, pos + word.length);
        }
    });
    return found.sort((a, b) => a.pos - b.pos);
}

async function processFilePart2(filename) {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let sumValue = 0;

    for await (const line of rl) {
        const wordLine = convertDigitsToWords(line);
        const numberWordsFound = findNumberWords(wordLine);

        if (numberWordsFound.length > 0) {
            const firstWord = numberWordsFound[0].word;
            const lastWord = numberWordsFound[numberWordsFound.length - 1].word;
            const calibrationValue = parseInt(numberWords[firstWord] + numberWords[lastWord], 10);
            sumValue += calibrationValue;

            // console.log(line, " , ", wordLine, " , ", numberWordsFound," , ",calibrationValue);
        }
    }

    console.log('Total Sum Value:', sumValue);
}

// processFilePart1('dec01.input.txt');

// processFilePart2('dec01.sample.part2.txt');
processFilePart2('dec01.input.txt');


