import parse from "../../aoc/parse";

const replacements: {
  [key: string]: string;
} = {};
export const init = (input: string) => {
  input
    .split("\n\n")[1]
    .split("\n")
    .forEach((line) => {
      replacements[line.split(" -> ")[0]] = line.split(" -> ")[1];
    });
  // Initialization
  parse(input);
};

export const part1 = (input: string) => {
  return run(input, 10);
};

export const part2 = (input: string) => {
  // Part 2
  return run(input, 40);
};

export const cleanup = () => {
  // Cleanup
};

const run = (input: string, stepCount: number) => {
  let pairs = {};
  input = input.split("\n")[0];
  for (let i = 0; i < input.length - 1; i++) {
    if (!pairs[input.charAt(i) + input.charAt(i + 1)])
      pairs[input.charAt(i) + input.charAt(i + 1)] = 0;
    pairs[input.charAt(i) + input.charAt(i + 1)]++;
  }
  for (let step = 1; step <= stepCount; step++) {
    let nextPairs = { ...pairs };

    for (let currentPair of Object.keys(pairs)) {
      const repl = replacements[currentPair];
      if (repl) {
        if (!nextPairs[currentPair.charAt(0) + repl])
          nextPairs[currentPair.charAt(0) + repl] = 0;
        nextPairs[currentPair.charAt(0) + repl] += pairs[currentPair];
        if (!nextPairs[repl + currentPair.charAt(1)])
          nextPairs[repl + currentPair.charAt(1)] = 0;
        nextPairs[repl + currentPair.charAt(1)] += pairs[currentPair];

        nextPairs[currentPair] -= pairs[currentPair];
      }
    }

    pairs = nextPairs;
  }
  const occurences = {};
  occurences[input.charAt(input.length - 1)] = 1;
  Object.keys(pairs).forEach((p) => {
    if (!occurences[p.charAt(0)]) occurences[p.charAt(0)] = 0;
    occurences[p.charAt(0)] += pairs[p];
  });

  const sortedChars = Object.keys(occurences).sort(
    (a, b) => occurences[a] - occurences[b]
  );

  // Part 1
  return (
    occurences[sortedChars[sortedChars.length - 1]] - occurences[sortedChars[0]]
  );
};
