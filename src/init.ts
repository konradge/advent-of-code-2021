import { dayDirectory } from "./aoc/io";

import axios from "axios";
import * as fs from "fs";
let cookie: { default: string };
try {
  cookie = require("./cookie");
} catch (err) {
  throw new Error(
    "No session-cookie defined. Create a file cookie.ts in src-Folder containing 'export default \"<session-cookie\"'"
  );
}

const inputURL = (day: string | number) =>
  `https://adventofcode.com/2021/day/${day}/input`;

const day = process.argv[2];
const init = async () => {
  // Create folder
  if (!fs.existsSync(`${dayDirectory}/Day${day}`)) {
    fs.mkdirSync(`${dayDirectory}/Day${day}`);
  }
  // **************************
  // Initialize input file
  if (!fs.existsSync(`${dayDirectory}/Day${day}/input`)) {
    // Get input from AoC-Website
    const input = await axios.get(inputURL(day), {
      headers: {
        Cookie: `session=${cookie.default}`,
      },
    });
    // Write input to file
    fs.writeFileSync(`${dayDirectory}/Day${day}/input`, input.data);
  }

  // *************************************
  // Initialize expected result file
  writeIfAbsent(
    `${dayDirectory}/Day${day}/test.ts`,
    `${dayDirectory}/Day/test.ts`
  );
  // ******************************
  // Initialize example-input file (empty)
  if (!fs.existsSync(`${dayDirectory}/Day${day}/example`)) {
    // Write input to file
    fs.writeFileSync(`${dayDirectory}/Day${day}/example`, "");
  }

  // Initialize index-file (where the code goes)
  writeIfAbsent(
    `${dayDirectory}/Day${day}/index.ts`,
    `${dayDirectory}/Day/index.ts`,
    (boilerplate) => boilerplate.replace("DayX", `Day${day}`)
  );
};

const writeIfAbsent = (
  fileName: string,
  fileToCopy: string,
  editBoilerplate: (text: string) => string = (boilerplate) => boilerplate
) => {
  if (!fs.existsSync(fileName)) {
    // Get boilerplate-code
    const boilerplate = fs.readFileSync(fileToCopy, "utf8");
    // And write it into the current day's index-file
    fs.writeFileSync(fileName, editBoilerplate(boilerplate));
  }
};

init();
