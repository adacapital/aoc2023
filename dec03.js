const fs = require('fs');

function sumPartNumbers(schematic) {
    const rows = schematic.trim().split('\n');
    const height = rows.length;
    const width = rows[0].length;

    const isSymbol = char => char !== '.' && isNaN(parseInt(char));
    const isDigit = char => !isNaN(parseInt(char)) && char !== '.';
    const counted = new Set();
    let sum = 0;
    const partNumbersWithPositions = {}; // Store part numbers with their positions

    const getFullNumber = (y, x) => {
        let num = '';
        // Look to the left
        let lx = x;
        while (lx >= 0 && isDigit(rows[y][lx])) {
            counted.add(`${y},${lx}`);
            lx--;
        }
        // Start building the number from the leftmost digit
        for (let nx = lx + 1; nx <= x; nx++) {
            num += rows[y][nx];
        }
        // Look to the right
        let rx = x + 1;
        while (rx < width && isDigit(rows[y][rx])) {
            num += rows[y][rx];
            counted.add(`${y},${rx}`);
            rx++;
        }
        if (num) {
            partNumbersWithPositions[`${y},${x}`] = parseInt(num);
        }
        return parseInt(num);
    };

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isSymbol(rows[y][x])) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                        const ny = y + dy;
                        const nx = x + dx;
                        if (ny >= 0 && ny < height && nx >= 0 && nx < width && !counted.has(`${ny},${nx}`)) {
                            const adjacentChar = rows[ny][nx];
                            if (isDigit(adjacentChar)) {
                                sum += getFullNumber(ny, nx);
                            }
                        }
                    }
                }
            }
        }
    }
    return { sum: sum, partNumbersWithPositions: partNumbersWithPositions };
}

function sumGearRatios(schematic, partNumbersWithPositions) {
    const rows = schematic.trim().split('\n');
    const height = rows.length;
    const width = rows[0].length;
    let totalGearRatio = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (rows[y][x] === '*') {
                let adjacentParts = [];
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) continue;
                        const ny = y + dy;
                        const nx = x + dx;
                        if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                            const key = `${ny},${nx}`;
                            if (partNumbersWithPositions[key] !== undefined) {
                                adjacentParts.push(partNumbersWithPositions[key]);
                            }
                        }
                    }
                }
                if (adjacentParts.length === 2) {
                    totalGearRatio += adjacentParts[0] * adjacentParts[1];
                }
            }
        }
    }

    return totalGearRatio;
}



// Example usage with file reading
// let fileName = 'dec03.sample.part1.txt';
let fileName = 'dec03.input.txt';

fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const partNumbersSum = sumPartNumbers(data);
    console.log('Sum of part numbers:', partNumbersSum.sum);

    const gearRatiosSum = sumGearRatios(data, partNumbersSum.partNumbersWithPositions);
    console.log('Sum of gear ratios:', gearRatiosSum);
});
