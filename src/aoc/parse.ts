import { Input } from "./types";

const parse = (str: string, mode?: string, args: string[] = []) => {
  let result: Input;
  switch (mode) {
    case "number":
      result = Number(str);
      break;
    case "number[]":
      result = parse(str, "string[]", args).map((e: string) => Number(e));
      break;
    case "number[][]":
      result = parse(str, "string[][]", args).map((l: string[]) =>
        l.map((e) => Number(e))
      );
      break;
    case "string[]":
      result = str.split(args[0] || "\n");
      break;
    case "string[][]":
      result = str.split(args[0] || "\n").map((e) => e.split(args[1] || ""));
      break;
    default:
      result = str;
      break;
  }
  return result;
};

export default parse;
