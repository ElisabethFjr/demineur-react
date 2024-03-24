export type Level = {
  value: string;
  rows: number;
  cols: number;
  bombs: number;
};

export type Cell = {
  row: number;
  col: number;
  isBomb: boolean;
  adjacentBombs: number;
  flagged: boolean;
  isRevealed: boolean;
  bombClicked: boolean;
};
