import parse from "../../aoc/parse";

let heightMap: number[][];
let basins: string[][];
export const init = (input: string) => {
  // Initialization
  heightMap = input
    .split("\n")
    .map((line) => line.split("").map((x) => Number(x)));
  parse(input);
  basins = heightMap.map((l) => l.map((x) => null));
};

const isLowest = (arr: number[][], row: number, col: number) => {
  let isLowest = true;
  if (row > 0) isLowest &&= arr[row - 1][col] > arr[row][col];
  if (row < arr.length - 1) isLowest &&= arr[row + 1][col] > arr[row][col];
  if (col > 0) isLowest &&= arr[row][col - 1] > arr[row][col];
  if (col < arr[row].length - 1) isLowest &&= arr[row][col + 1] > arr[row][col];
  return isLowest;
};

export const part1 = (input: string) => {
  let res = 0;
  // Part 1
  heightMap.forEach((line, row) =>
    line.forEach((pos, col) => {
      if (isLowest(heightMap, row, col)) res += pos + 1;
    })
  );
  return res;
};

let basinSizes = {};

const findBasin = (i: number, j: number, basinName: string) => {
  if (i < 0) return;
  if (i >= heightMap.length) return;
  if (j < 0) return;
  if (j >= heightMap[i].length) return;
  if (heightMap[i][j] === 9) return;
  if (basins[i][j]) return;

  basins[i][j] = basinName;
  basinSizes[basinName] += 1;

  findBasin(i - 1, j, basinName);
  findBasin(i + 1, j, basinName);
  findBasin(i, j - 1, basinName);
  findBasin(i, j + 1, basinName);
};

export const part2 = (input: string) => {
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const key = `${i}/${j}`;
      if (basins[i][j] === null && heightMap[i][j] !== 9) {
        basinSizes[key] = 0;
        findBasin(i, j, key);
      }
    }
  }
  // Get maximum
  const res = Object.keys(basinSizes)
    .map((key) => basinSizes[key])
    .sort((a, b) => a - b)
    .reverse();

  // Part 2
  return res[0] * res[1] * res[2];
};

export const cleanup = () => {
  // Cleanup
  heightMap = null;
  basins = null;
  basinSizes = {};
};
