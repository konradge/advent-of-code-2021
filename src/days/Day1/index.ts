import parse from "../../aoc/parse";

let nums: number[];

export const init = (input: string) => {
  nums = parse(input, "number[]");
};

export const part1 = (input: string) => {
  let increases = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) increases++;
  }
  return increases;
};

export const part2 = (input: string) => {
  let increases = 0;
  for (let i = 0; i < nums.length - 3; i++) {
    let sum1 = 0,
      sum2 = 0;
    for (let j = 0; j < 3; j++) {
      sum1 += nums[i + j];
      sum2 += nums[i + j + 1];
    }

    if (sum1 < sum2) increases++;
  }
  return increases;
};

export const cleanup = () => {
  nums = null;
};
