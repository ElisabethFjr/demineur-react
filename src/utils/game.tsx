/* eslint-disable no-plusplus */

// Function to initialize the grid with non-bomb cells
export function initializeGrid(rows: number, cols: number): boolean[][] {
  const newGrid: boolean[][] = [];
  for (let row = 0; row < rows; row++) {
    newGrid[row] = [];
    for (let col = 0; col < cols; col++) {
      newGrid[row][col] = false; // Initialize all cells as non-bomb (cell = false)
    }
  }
  return newGrid;
}

// Function to randomly place bombs on the grid
export function placeRandomBombs(
  grid: boolean[][],
  bombs: number,
  row: number,
  col: number,
  rowClicked: number,
  colClicked: number,
  setGrid: React.Dispatch<React.SetStateAction<boolean[][]>>
) {
  const newGrid = [...grid]; // Copy the grid
  let bombsPlaced = 0; // Initialised placed bombs at 0 (no bomb on the grid)
  while (bombsPlaced < bombs) {
    // Generate random row and column indices
    const randomRow = Math.floor(Math.random() * row);
    const randomCol = Math.floor(Math.random() * col);
    // Check if the selected cell is not already a bomb and is not the clicked cell
    if (
      !newGrid[randomRow][randomCol] &&
      !(rowClicked === randomRow && colClicked === randomCol)
    ) {
      // Place a bomb on the cell (cell = true)
      newGrid[randomRow][randomCol] = true;
      // Increment the number of placed bombs
      bombsPlaced++;
    }
  }
  // Update the grid with the placed bombs
  setGrid(newGrid);
}

// Function to convert seconds to MIN:SEC format (00:00)
export function formatTime(time: number): string {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}
