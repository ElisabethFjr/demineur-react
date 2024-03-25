/* eslint-disable no-plusplus */
import { Cell } from '../@types';

// Function to initialize the grid with non-bomb cells
export function initializeGrid(rows: number, cols: number): Cell[][] {
  const newGrid: Cell[][] = [];
  for (let row = 0; row < rows; row++) {
    newGrid[row] = [];
    for (let col = 0; col < cols; col++) {
      newGrid[row][col] = {
        row, // Row coordinate of the cell
        col, // Column coordinate of the cell
        isBomb: false, // Initialize all cells as non-bomb
        flagged: false, // Initialize all cells as unflagged
        isRevealed: false, // Initialize all cells as unrevealed
        adjacentBombs: 0, // Initialize the nb of adjacent bombs to 0
      };
    }
  }
  return newGrid;
}

// Function to randomly place bombs on the grid
export function placeRandomBombs(
  grid: Cell[][],
  bombs: number,
  row: number,
  col: number,
  rowClicked: number,
  colClicked: number,
  setGrid: React.Dispatch<React.SetStateAction<Cell[][]>>
) {
  const newGrid = [...grid]; // Copy the grid
  let bombsPlaced = 0; // Initialised placed bombs at 0 (no bomb on the grid)
  while (bombsPlaced < bombs) {
    // Generate random row and column indices
    const randomRow = Math.floor(Math.random() * row);
    const randomCol = Math.floor(Math.random() * col);
    // Check if the selected cell is not already a bomb and is not the clicked cell
    if (
      !newGrid[randomRow][randomCol].isBomb &&
      !(rowClicked === randomRow && colClicked === randomCol)
    ) {
      // Place a bomb on the cell (cell = true)
      newGrid[randomRow][randomCol].isBomb = true;
      // Increment the number of placed bombs
      bombsPlaced++;
    }
  }
  // Update the grid with the placed bombs
  setGrid(newGrid);
}

// Function to calculate the nb of adjacents Bombs for a specific Cell
export function countAdjacentBombs(
  row: number,
  col: number,
  grid: Cell[][],
  rows: number,
  cols: number
): number {
  let count = 0;
  // For every cell around the current cell
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // Check if the adjacent cell is inside the grid and is not the current cell
      if (
        i >= 0 &&
        i < rows &&
        j >= 0 &&
        j < cols &&
        !(i === row && j === col)
      ) {
        // If the adjacent cell contains a bomb (= true), increment the count of adjacent bombs
        if (grid[i][j].isBomb) {
          count++; // Return the count of adjacent bombs for the current cell
        }
      }
    }
  }
  return count;
}

export function revealCells(
  row: number,
  col: number,
  grid: Cell[][],
  rows: number,
  cols: number
) {
  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    grid[row][col].isRevealed
  ) {
    return;
  }

  // Create a deep copy of the grid
  const newGrid = grid.map((rowArray) => [...rowArray]);
  const currentCell = newGrid[row][col];

  // Set the current cell as revealed
  currentCell.isRevealed = true;

  // If the current cell has no adjacent bombs, reveal adjacent cells recursively
  if (currentCell.adjacentBombs === 0) {
    for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, rows - 1); i++) {
      for (
        let j = Math.max(0, col - 1);
        j <= Math.min(col + 1, cols - 1);
        j++
      ) {
        // Recursively call revealCells for each neighboring cell
        revealCells(i, j, newGrid, rows, cols);
      }
    }
  }
}

// Function to reveal All Cells when Game is over (gameStatus === -1)
export function revealAllCells(grid: Cell[][]) {
  // For each cell, reveal it and reset the flag
  const revealedGrid = grid.map((row) =>
    row.map((cell) => {
      return {
        ...cell,
        isRevealed: true,
        flagged: false,
      };
    })
  );
  return revealedGrid;
}

// Function to convert seconds to MIN:SEC format (00:00)
export function formatTime(time: number): string {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}
