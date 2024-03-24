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
        bombClicked: false, // Initialize all cells as not clicked bomb
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

// Function to calculate the nb of adjacents Bombs on a specific Cell
// Function to count the number of adjacent bombs for a cell
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

// Function to convert seconds to MIN:SEC format (00:00)
export function formatTime(time: number): string {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}
