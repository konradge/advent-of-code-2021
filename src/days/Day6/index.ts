import parse from "../../aoc/parse";

const memory = {};

export const init = (input: string) => {
  // Initialization
};

export const part1 = (input: string) => {
  return parse(input, "number[]", [","]).reduce(
    (acc: number, age: number) => (acc = acc + runSimulation(age, 0, 1, 80)),
    0
  );
};

export const part2 = (input: string) => {
  return parse(input, "number[]", [","]).reduce(
    (acc: number, age: number) => (acc = acc + runSimulation(age, 0, 1, 256)),
    0
  );
};

export const cleanup = () => {
  // Cleanup
};

const runSimulation = (
  age: number,
  tick: number,
  totalFish: number,
  ticksToSimulate: number
) => {
  const key = `${age},${tick},${totalFish},${ticksToSimulate}`;
  if (memory[key]) return memory[key];
  if (tick + age + 1 <= ticksToSimulate) {
    // Create new fish
    totalFish =
      runSimulation(8, tick + age + 1, 1, ticksToSimulate) +
      runSimulation(6, tick + age + 1, totalFish, ticksToSimulate);
  }
  memory[key] = totalFish;
  return totalFish;
};

class Fish {
  ticks = 0;
  age: number;
  constructor(days: number) {
    this.age = days;
    this.ticks += this.age;
  }
  tick(allFish: Fish[]) {
    this.age--;
    if (this.age < 0) {
      this.age = 6;
      allFish.push(new Fish(8));
    }
  }
}
