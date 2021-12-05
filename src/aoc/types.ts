export type Input =
  | string
  | number
  | string[]
  | number[]
  | string[][]
  | number[][];

export type Output = string | number;

export type Test = {
  example: { part1: Output; part2: Output };
  solution: { part1: Output; part2: Output };
};
