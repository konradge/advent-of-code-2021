import parse from "../../aoc/parse";

let maxX = -1,
  maxY = -1;

let map1: number[][];
let map2: number[][];
let rawInput: string[];
export const init = (input: string) => {
  // Initialization
  rawInput = parse(input, "string[]");
  const lines = rawInput.map((line: string, index: number) =>
    calcMaxima(line, index)
  );
  map1 = new Array(maxX + 1).fill(0).map((x) => new Array(maxY + 1).fill(0));
  map2 = new Array(maxX + 1).fill(0).map((x) => new Array(maxY + 1).fill(0));
  lines.forEach((line: number[]) => calc(line));
};

export const part1 = (input: string) => {
  return accumulate(map1);
};

export const part2 = (input: string) => {
  // Part 2
  return accumulate(map2);
};

export const cleanup = () => {
  maxX = -1;
  maxY = -1;
  map1 = null;
  map2 = null;
  rawInput = null;
};

const accumulate = (map: number[][]) => {
  return map.reduce(
    (prev, curr, currI, arr) =>
      prev + curr.reduce((pr, cur, curI, a) => pr + Number(cur > 1), 0),
    0
  );
};

const calcMaxima = (line: string, index: number) => {
  let [x1, y1, x2, y2] = line
    .replace(" -> ", ",")
    .split(",")
    .map((c) => Number(c));

  [x1, x2, y1, y2] = [
    Math.min(x1, x2),
    Math.max(x1, x2),
    Math.min(y1, y2),
    Math.max(y1, y2),
  ];
  maxX = Math.max(maxX, x2);
  maxY = Math.max(maxY, y2);
  return [x1, y1, x2, y2, index];
};

const calc = ([x1, y1, x2, y2, index]: number[]) => {
  if (x1 === x2) {
    for (let i = y1; i <= y2; i++) {
      map1[x1][i]++;
      map2[x1][i]++;
    }
  } else if (y1 === y2) {
    for (let i = x1; i <= x2; i++) {
      map1[i][y1]++;
      map2[i][y1]++;
    }
  } else {
    let start = rawInput[index]
      .split(" -> ")[0]
      .split(",")
      .map((p) => Number(p));
    let end = rawInput[index]
      .split(" -> ")[1]
      .split(",")
      .map((p) => Number(p));
    const dist = Math.abs(start[0] - end[0]);
    const vec = [(start[0] - end[0]) / dist, (start[1] - end[1]) / dist];
    for (let i = 0; i <= dist; i++) {
      map2[end[0] + i * vec[0]][end[1] + i * vec[1]]++;
    }
  }
};
