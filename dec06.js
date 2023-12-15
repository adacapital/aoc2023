const fs = require('fs');

function parseInput(content) {
    const lines = content.split('\n');
    const times = lines[0].split('Time:')[1].trim().split(/\s+/).map(Number);
    const distances = lines[1].split('Distance:')[1].trim().split(/\s+/).map(Number);
    return { times, distances };
}

function countWaysToWin(time, distance) {
    let ways = 0;
    for (let holdTime = 0; holdTime < time; holdTime++) {
        if (holdTime * (time - holdTime) > distance) {
            ways++;
        }
    }
    return ways;
}

function calculateTotalWays(times, distances) {
    let totalWays = 1;
    for (let i = 0; i < times.length; i++) {
        totalWays *= countWaysToWin(times[i], distances[i]);
    }
    return totalWays;
}

function readInputAndProcess(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const { times, distances } = parseInput(content);
    return calculateTotalWays(times, distances);
}

function parseInputSingleRace(content) {
    const lines = content.split('\n');
    const time = parseInt(lines[0].split('Time:')[1].replace(/\s/g, ''), 10);
    const distance = parseInt(lines[1].split('Distance:')[1].replace(/\s/g, ''), 10);
    return { time, distance };
}

function countWaysToWinSingleRace(time, distance) {
    let ways = 0;
    for (let holdTime = 0; holdTime < time; holdTime++) {
        if (holdTime * (time - holdTime) > distance) {
            ways++;
        }
    }
    return ways;
}

function readInputAndProcessSingleRacePart2(filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const { time, distance } = parseInputSingleRace(content);
    return countWaysToWinSingleRace(time, distance);
}

// Using the function to read from 'input.txt' and find the answer
// const filename = 'dec06.sample.txt';
const filename = 'dec06.input.txt';
const result = readInputAndProcess(filename);
console.log(result);

const resultPart2 = readInputAndProcessSingleRacePart2(filename);
console.log(resultPart2);

