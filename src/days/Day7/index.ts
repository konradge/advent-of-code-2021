import parse from "../../aoc/parse";

let positions: number[];
export const init = (input: string) => {
  // Initialization
  positions = parse(input, "number[]", [","]);
};

export const part1 = (input: string) => {
  // Part 1
  let min = Number.MAX_VALUE;
  let maxPos = Math.max(...positions);
  for (let destinationPos = 0; destinationPos <= maxPos; destinationPos++) {
    let fuelSpent = 0;
    for (const pos of positions) {
      fuelSpent += Math.abs(pos - destinationPos);
    }
    min = Math.min(min, fuelSpent);
  }
  return min;
};

export const part2 = (input: string) => {
  // Part 2
  let min = Number.MAX_VALUE;
  let maxPos = Math.max(...positions);
  for (let destinationPos = 0; destinationPos <= maxPos; destinationPos++) {
    let fuelSpent = 0;
    for (const pos of positions) {
      let steps = Math.abs(pos - destinationPos);
      fuelSpent += (steps * (steps + 1)) / 2;
    }
    min = Math.min(min, fuelSpent);
  }
  return min;
};

export const cleanup = () => {
  // Cleanup
};
