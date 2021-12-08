import parse from "../../aoc/parse";

let positions: number[];
export const init = (input: string) => {
  // Initialization
  positions = parse(input, "number[]", [","]);
};

export const part1 = (input: string) => {
  // Part 1
  return calcMin((dist) => dist);
};

export const part2 = (input: string) => {
  // Part 2
  return calcMin((dist) => (dist * (dist + 1)) / 2);
};

const calcMin = (fuelFunction: (distance: number) => number) => {
  let min = Number.MAX_VALUE;
  let maxDestinationPos = Math.max(...positions);
  for (
    let destinationPos = 0;
    destinationPos <= maxDestinationPos + 1;
    destinationPos++
  ) {
    let fuelSpent = 0;
    for (const pos of positions) {
      let distance = Math.abs(pos - destinationPos);
      fuelSpent += fuelFunction(distance);
    }
    min = Math.min(min, fuelSpent);
  }
  return min;
};

export const cleanup = () => {
  // Cleanup
};
