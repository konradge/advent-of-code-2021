import parse from "../../aoc/parse";

export const init = (input: string) => {
  // Initialization
  parse(input);
};

export const part1 = (input: string) => {
  return input.split("\n").reduce((acc, line) => {
    const stack: string[] = [];
    return (
      acc +
      points[
        line.split("").find((bracket) => {
          if (isOpeningBracket(bracket)) {
            stack.push(bracket);
          } else {
            if (!bracketsMatch(stack.pop(), bracket)) {
              return true;
            }
          }
        })
      ]
    );
  }, 0);
};

const points = {
  // For part 1
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
  undefined: 0,
  // For part 2
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const isOpeningBracket = (br: string) => br.match(/[([{<]/);

const bracketsMatch = (open: string, close: string) =>
  `${open}${close}`.match(/(\(\)|\[\]|\{\}|\<\>)/);

export const part2 = (input: string) => {
  const scores = input
    .split("\n")
    .map((line) => {
      let valid = true;
      const stack: string[] = [];
      line.split("").forEach((bracket) => {
        if (isOpeningBracket(bracket)) {
          stack.push(bracket);
        } else {
          if (!bracketsMatch(stack.pop(), bracket)) {
            valid = false;
          }
        }
      });

      let score = 0;
      if (valid) {
        while (stack.length !== 0) {
          score *= 5;
          score += points[stack.pop()];
        }
      }
      return score;
    })
    .filter((score) => score !== 0)
    .sort((a, b) => a - b);

  return scores[(scores.length - 1) / 2];
};

export const cleanup = () => {
  // Cleanup
};
