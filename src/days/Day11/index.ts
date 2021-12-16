import COLORS from "../../aoc/colors";
import parse from "../../aoc/parse";

let cave: number[][];
export const init = (input: string) => {
  cave = input.split("\n").map((l) => l.split("").map((x) => Number(x)));
  // Initialization
  parse(input);
};

const dx = [1, 1, 1, 0, 0, -1, -1, -1];
const dy = [1, 0, -1, 1, -1, 1, 0, -1];

const flash = (cave: number[][], i: number, j: number) => {
  let flashes = 0;
  if (isInArray(cave, i, j)) {
    if (cave[i][j] > 9) {
      cave[i][j] = -1;
      flashes++;
      // Increase energy of all neighbours
      for (let k = 0; k < dx.length; k++) {
        if (
          isInArray(cave, i + dx[k], j + dy[k]) &&
          cave[i + dx[k]][j + dy[k]] !== -1
        )
          cave[i + dx[k]][j + dy[k]]++;
      }
      // Test for all neighbours, if they would flash
      for (let k = 0; k < dx.length; k++) {
        flashes += flash(cave, i + dx[k], j + dy[k]);
      }
    }
  }
  return flashes;
};

const isInArray = (arr: any[][], i: number, j: number) => {
  return i >= 0 && j >= 0 && i < arr.length && j < arr[i].length;
};

export const part1 = (input: string) => {
  let totalFlashes = 0;
  for (let round = 1; round <= 100; round++) {
    totalFlashes += runRound(cave);
  }
  // Part 1
  return totalFlashes;
};

const runRound = (cave: number[][], shouldReset = true) => {
  let roundFlashes = 0;
  // Increase energy by one
  for (let i = 0; i < cave.length; i++) {
    for (let j = 0; j < cave[i].length; j++) {
      cave[i][j]++;
    }
  }

  // Test for flashes
  for (let i = 0; i < cave.length; i++) {
    for (let j = 0; j < cave[i].length; j++) {
      roundFlashes += flash(cave, i, j);
    }
  }

  if (shouldReset) resetOctopuses(cave);

  return roundFlashes;
};

const resetOctopuses = (cave: number[][]) => {
  // Reset octupuses, that have flashed
  for (let i = 0; i < cave.length; i++) {
    for (let j = 0; j < cave[i].length; j++) {
      if (cave[i][j] === -1) cave[i][j] = 0;
    }
  }
};

export const part2 = (input: string) => {
  //Reset cave
  cave = input.split("\n").map((l) => l.split("").map((x) => Number(x)));
  let round = 0;
  while (true) {
    round++;
    runRound(cave, false);
    if (cave.flatMap((x) => x).every((x) => x === -1)) return round;
    resetOctopuses(cave);
  }
  // Part 2
  return null;
};

export const cleanup = () => {
  // Cleanup
};
