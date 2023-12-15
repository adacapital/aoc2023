const fs = require('fs');

function parseMapping(data) {
    return data.split('\n').map(line => {
        const [destStart, srcStart, length] = line.split(' ').map(Number);
        return { destStart, srcStart, length };
    });
}

function convertNumber(number, mappings) {
    for (const mapping of mappings) {
        const { destStart, srcStart, length } = mapping;
        if (number >= srcStart && number < srcStart + length) {
            return destStart + (number - srcStart);
        }
    }
    return number; // Default to same number if not in any range
}

function processSeeds(seeds, maps) {
    return seeds.map(seed => {
        let current = seed;
        maps.forEach(map => {
            current = convertNumber(current, map);
        });
        return current;
    });
}

function readInputAndProcess(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const sections = content.split('\n\n');
    const seeds = sections[0].split(': ')[1].split(' ').map(Number);
    const maps = sections.slice(1).map(parseMapping);

    const finalLocations = processSeeds(seeds, maps);
    return Math.min(...finalLocations);
}

function processSeed(seed, maps) {
    let current = seed;
    maps.forEach(map => {
        current = convertNumber(current, map);
    });
    return current;
}

function findLowestLocation(seedRanges, maps) {
    let lowestLocation = Infinity;
    for (let i = 0; i < seedRanges.length; i += 2) {
        let start = seedRanges[i];
        let length = seedRanges[i + 1];
        for (let j = 0; j < length; j++) {
            const seed = start + j;
            const location = processSeed(seed, maps);
            if (location < lowestLocation) {
                lowestLocation = location;
            }
        }
    }
    return lowestLocation;
}

function readInputAndProcessPart2(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const sections = content.split('\n\n');
    const seedRanges = sections[0].split(': ')[1].split(' ').map(Number);
    const maps = sections.slice(1).map(parseMapping);

    return findLowestLocation(seedRanges, maps);
}

// Using the function to read from 'inputs.txt' and find the answer
// const filename = 'dec05.sample.txt';
const filename = 'dec05.input.txt';
const lowestLocation = readInputAndProcess(filename);
console.log(lowestLocation);

const lowestLocationPart2 = readInputAndProcessPart2(filename);
console.log(lowestLocationPart2);
