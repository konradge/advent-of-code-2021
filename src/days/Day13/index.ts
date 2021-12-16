import parse from "../../aoc/parse";

let paper: boolean[][];
let instructions: { type: string; pos: number }[];

export const init = (input: string) => {
  const coords = input
    .split("\n\n")[0]
    .split("\n")
    .map((line) => {
      const [x, y] = line.split(",").map((n) => Number(n));
      return { x, y };
    });
  const maxX = Math.max(...coords.map((l) => l.x));
  const maxY = Math.max(...coords.map((l) => l.y));

  paper = Array(maxY + 1)
    .fill(false)
    .map(() => Array(maxX + 1).fill(false));

  coords.forEach((c) => (paper[c.y][c.x] = true));

  instructions = input
    .split("\n\n")[1]
    .split("\n")
    .map((ins) => {
      const [type, pos] = ins.split("=");
      return { type: type.split("along ")[1], pos: Number(pos) };
    });

  console.log(instructions);
};

export const part1 = (input: string) => {
  // Part 1
  return run(paper, [instructions[0]])
    .flatMap((x) => x)
    .reduce((acc, x) => acc + Number(x), 0);
};

export const part2 = (input: string) => {
  // Part 2
  return printPaper(run(paper, instructions));
};

const run = (p: boolean[][], instructions: { type: string; pos: number }[]) => {
  let paper = p.map((x) => x.map((y) => y));
  instructions.forEach((i) => {
    if (i.type === "x") {
      paper = foldX(paper, i.pos);
    } else {
      paper = foldY(paper, i.pos);
    }
  });

  return paper;
};

const foldX = (paper: boolean[][], pos: number) => {
  const newPaper = paper.map((line) =>
    Array(line.length - pos - 1).fill(false)
  );
  for (let i = 0; i < paper.length; i++) {
    for (let j = 0; j < paper[i].length; j++) {
      if (j == pos) continue;
      if (j > pos) {
        // Fold left
        newPaper[i][paper[i].length - j - 1] ||= paper[i][j];
      } else {
        // Keep
        newPaper[i][paper[i].length - 1 - pos + (j - pos)] ||= paper[i][j];
      }
    }
  }
  return newPaper;
};

const foldY = (paper: boolean[][], pos: number) => {
  const newPaper = Array(paper.length - pos - 1)
    .fill(false)
    .map(() => Array(paper[0].length).fill(false));

  for (let i = 0; i < paper.length; i++) {
    for (let j = 0; j < paper[i].length; j++) {
      if (i > pos) {
        // Fold left
        newPaper[paper.length - 1 - i][j] ||= paper[i][j];
      } else if (i < pos) {
        const shift = paper.length - 1 - pos - pos;

        // Keep
        newPaper[i + shift][j] ||= paper[i][j];
      }
    }
  }
  return newPaper;
};

const printPaper = (p: boolean[][]) => {
  console.log("---------------");

  console.log(
    p.map((line) => line.map((x) => (x ? "#" : ".")).join("")).join("\n")
  );
  console.log("----------------");
};

export const cleanup = () => {
  // Cleanup
};
