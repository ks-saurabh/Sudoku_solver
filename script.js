var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
			 board[i][j] = 0
	}
}

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
	
};
function isSafe(board, row, col, num, N) {
    // Check if 'num' is not in the current row
    for (let x = 0; x < N; x++) {
        if (board[row][x] == num) {
            return false;
        }
    }

    // Check if 'num' is not in the current column
    for (let x = 0; x < N; x++) {
        if (board[x][col] == num) {
            return false;
        }
    }

    // Check if 'num' is not in the current 3x3 box
    let startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }

    return true;
}

function SudokuSolver(board, row, col, N) {
		// If we have reached the last cell, return true
		if (row == N - 1 && col == N) {
			FillBoard(board)
			return true;
		}
	
		// If column value becomes 9, move to the next row and reset column to 0
		if (col == N) {
			return SudokuSolver(board, row + 1, 0, 9);
		}
	
		// If the current cell is already filled, move to the next cell
		if (board[row][col] != 0) {
			return SudokuSolver(board, row, col + 1, 9);
		}
	
		for (let num = 1; num <= N; num++) {
			// Check if it is safe to place the num (1-9) in the given row, col
			if (isSafe(board, row, col, num, N)) {
				board[row][col] = num;
	
				// Move to the next cell
				if (SudokuSolver(board, row, col + 1, 9)) {
					return true;
				}
			}
	
			// Undo the current cell for backtracking
			board[row][col] = 0;
		}
	
		return false;
	
}



