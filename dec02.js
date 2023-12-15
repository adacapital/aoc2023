const fs = require('fs');

function parseGameLine(line) {
    const [idPart, cubesPart] = line.split(': ');
    const gameId = parseInt(idPart.split(' ')[1]);
    const cubeSets = cubesPart.split('; ').map(set => {
        const cubes = { red: 0, green: 0, blue: 0 };
        set.split(', ').forEach(cube => {
            const [count, color] = cube.split(' ');
            cubes[color] += parseInt(count);
        });
        return cubes;
    });
    return { gameId, cubeSets };
}

function isGamePossible(cubeSets, maxCubes) {
    return cubeSets.every(set => 
        set.red <= maxCubes.red && set.green <= maxCubes.green && set.blue <= maxCubes.blue
    );
}

function calculatePossibleGamesSum(input) {
    const games = input.split('\n').map(parseGameLine);
    const maxCubes = { red: 12, green: 13, blue: 14 };
    let sumOfIds = 0;

    games.forEach(game => {
        if (isGamePossible(game.cubeSets, maxCubes)) {
            sumOfIds += game.gameId;
        }
    });

    return sumOfIds;
}

// Example usage with file reading
fs.readFile('dec02.input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const sumOfIds = calculatePossibleGamesSum(data);
    console.log('Sum of IDs of possible games:', sumOfIds);
});

function calculateMinimumCubes(input) {
    const games = input.split('\n').map(parseGameLine);
    let sumOfPowers = 0;

    games.forEach(game => {
        const minCubes = { red: 0, green: 0, blue: 0 };

        game.cubeSets.forEach(set => {
            minCubes.red = Math.max(minCubes.red, set.red);
            minCubes.green = Math.max(minCubes.green, set.green);
            minCubes.blue = Math.max(minCubes.blue, set.blue);
        });

        const power = minCubes.red * minCubes.green * minCubes.blue;
        sumOfPowers += power;
    });

    return sumOfPowers;
}

// Assuming the same file reading code as before
fs.readFile('dec02.input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const sumOfPowers = calculateMinimumCubes(data);
    console.log('Sum of powers of minimum cube sets:', sumOfPowers);
});
