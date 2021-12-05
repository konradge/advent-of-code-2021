let calledNumbers: number[];
let boards: Board[];
let round = 0;

export const init = (input: string) => {
  const seperatedInput = input.split("\n\n");
  calledNumbers = seperatedInput[0].split(",").map((n) => Number(n));

  boards = seperatedInput.slice(1).map((board) => new Board(board));
};

export const part1 = (input: string) => {
  for (; round < calledNumbers.length; round++) {
    for (const b of boards) {
      if (b.call(calledNumbers[round])) {
        b.won = true;
        return b.calcScore() * calledNumbers[round];
      }
    }
  }
};

export const part2 = (input: string) => {
  //Reset boards
  let wins = 1;

  for (; round < calledNumbers.length; round++) {
    for (const b of boards) {
      if (b.call(calledNumbers[round]) && !b.won) {
        b.won = true;
        wins++;
        if (wins == boards.length) {
          return b.calcScore() * calledNumbers[round];
        }
      }
    }
  }
  return null;
};

class Board {
  board: { num: number; called: boolean }[][];
  won = false;
  constructor(descriptor: string) {
    this.board = descriptor.split("\n").map((bl) =>
      bl
        .trim()
        .split(/ +/)
        .map((num) => ({ num: Number(num), called: false }))
    );
  }
  call(num: number) {
    for (const bl of this.board) {
      for (const be of bl) {
        if (be.num == num) be.called = true;
      }
    }
    return this.hasWon();
  }
  hasWon() {
    // Chech rows:
    for (let i = 0; i < this.board.length; i++) {
      let hasWonRow = true,
        hasWonColumn = true;
      for (let j = 0; j < this.board[i].length; j++) {
        hasWonRow = hasWonRow && this.board[i][j].called;
        hasWonColumn = hasWonColumn && this.board[j][i].called;
      }
      if (hasWonRow || hasWonColumn) return true;
    }
    return false;
  }
  calcScore() {
    let score = 0;
    for (const bl of this.board) {
      for (const be of bl) {
        score += Number(!be.called) * be.num;
      }
    }
    return score;
  }
}

export const cleanup = () => {
  calledNumbers = null;
  boards = null;
  round = 0;
};
