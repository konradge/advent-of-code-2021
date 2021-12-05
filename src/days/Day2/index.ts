import parse from "../../aoc/parse";

const TYPE = { FORWARD: 0, UP: 1, DOWN: 2 };
type command = { type: number; param: number };

let x = 0;
let y = 0;
let aim = 0;
let commands: command[];

export const init = (input: string) => {
  commands = parse(input, "string[]").map((cmd: string) => ({
    type: TYPE[cmd.split(" ")[0].toUpperCase()],
    param: Number(cmd.split(" ")[1]),
  }));
};

export const part1 = (input: string) => {
  for (let cmd of commands) {
    switch (cmd.type) {
      case TYPE.FORWARD:
        x += cmd.param;
        break;
      case TYPE.UP:
        y -= cmd.param;
        break;
      default:
        y += cmd.param;
        break;
    }
  }

  return x * y;
};

export const part2 = (input: string) => {
  x = 0;
  y = 0;
  for (let cmd of commands) {
    switch (cmd.type) {
      case TYPE.FORWARD:
        x += cmd.param;
        y += cmd.param * aim;
        break;
      case TYPE.UP:
        aim -= cmd.param;
        break;
      default:
        aim += cmd.param;
        break;
    }
  }
  return x * y;
};

export const cleanup = () => {
  x = 0;
  y = 0;
  aim = 0;
  commands = null;
};
