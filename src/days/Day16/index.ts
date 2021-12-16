import COLORS from "../../aoc/colors";
import parse from "../../aoc/parse";

let sumOfVersions = 0;
export const init = (input: string) => {
  /**
  const hex = "D2FE28"; //110100101111111000101000
  console.log(getBits(hex, 0, 0).toString(2)); //1
  console.log(getBits(hex, 0, 4).toString(2)); //11010
  console.log(getBits(hex, 2, 9).toString(2)); //01001011
  **/
};

const parsePacket = (hex: string, start: number) => {
  const version = getBits(hex, start, start + 2);
  sumOfVersions += version;
  const typeID = getBits(hex, start + 3, start + 5);

  // console.log(
  //   (typeID !== 4 ? COLORS.FGGREEN : "") +
  //     "---Start of packet " +
  //     version +
  //     "//" +
  //     typeID +
  //     "------"
  // );

  let res;

  let value = 0;

  if (typeID === 4) {
    for (let i = start + 6; i < hex.length * 4; i += 5) {
      value += getBits(hex, i + 1, i + 4);
      if (getBits(hex, i, i) === 0) {
        res = { value: value, end: i + 4 };

        console.log("Literal packet with value " + res.value);
        break;
      } else {
        value = value << 4;
      }
    }
  } else {
    const lengthTypeID = getBits(hex, start + 6, start + 6);

    console.log("Operator packet");
    console.log("Mode: " + lengthTypeID);
    console.log("Containing:" + COLORS.RESET);

    if (lengthTypeID === 0) {
      const lengthOfPackets = getBits(hex, start + 7, start + 7 + 14);
      console.log("Length: " + lengthOfPackets);

      const startBit = start + 7 + 15;
      let currentBit = startBit;
      const endBit = startBit + lengthOfPackets - 1;

      do {
        const p = parsePacket(hex, currentBit);
        value += p.value;
        currentBit = p.end + 1;
      } while (currentBit < endBit);
      res = { value, end: currentBit };
    } else {
      const numberOfPackets = getBits(hex, start + 7, start + 7 + 10);

      let currentBit = start + 18;

      for (let i = 0; i < numberOfPackets; i++) {
        const p = parsePacket(hex, currentBit);
        value += p.value;
        currentBit = p.end + 1;
      }
      res = { number: value, end: currentBit };
    }
  }

  // console.log(
  //   (typeID !== 4 ? COLORS.FGGREEN : "") +
  //     "---End of packet " +
  //     version +
  //     "//" +
  //     typeID +
  //     "------\n" +
  //     (typeID !== 4 ? "\n" : "") +
  //     COLORS.RESET
  // );

  return res;
};

export const part1 = (input: string) => {
  parsePacket(input, 0);
  // Part 1
  return sumOfVersions;
};

export const part2 = (input: string) => {
  // Part 2
  return null;
};

export const cleanup = () => {
  // Cleanup
};

const zeroPad = (str: string, count: number) => str.padStart(count, "0");

const getBits = (hex: string, start: number, end: number) => {
  let res = parseInt(
    hex.substring(Math.floor(start / 4), Math.floor(end / 4) + 1),
    16
  );
  res = res >> (3 - (end % 4));
  res = res & parseInt("".padStart(end - start + 1, "1"), 2);
  return res;
};
