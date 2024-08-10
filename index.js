// Object for game initialization, sign assignment and display to UI
const Gameboard = function () {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }

  // Send data for UI
  const getBoard = () => board;

  // Mark the clicked cell
  const putSign = (row, column, playerSign) => {
    const clickedCell = board[row][column];
    if (clickedCell.getSign() == 0) {
      clickedCell.addSign(playerSign);
    } else {
      return;
    }
    console.log(board[1][2].getSign());
  };

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, putSign, printBoard };
};

// Representation of every cell block individually in the board among 9
function Cell() {
  let sign = " ";

  const addSign = (player) => {
    sign = player;
  };

  const getSign = () => sign;

  return {
    addSign,
    getSign,
  };
}

// Function controlling the flow and state of the game
function GameController(player1Name = "Player1", player2Name = "Player2") {
  const board = Gameboard();

  // Creating Player details and assigning them sign marks
  const players = [
    { name: player1Name, sign: "X" },
    {
      name: player2Name,
      sign: "O",
    },
  ];

  // Starting active player
  let activePlayer = players[0];

  // Switching active player
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
  };

  // Marking of a cell
  const playRound = (row, column) => {
    board.putSign(row, column, getActivePlayer().sign);

    switchPlayerTurn();
    printNewRound();
  };

  // Game initial preview
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".turn");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    board.forEach((row, rowindex) => {
      row.forEach((cell, colindex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = colindex;
        cellButton.dataset.row = rowindex;
        cellButton.textContent = cell.getSign();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandler(e) {
    const selectedCellRow = Number(e.target.dataset.row);
    const selectedCellColumn = Number(e.target.dataset.column);
    const board = game.getBoard();

    if (board[selectedCellRow][selectedCellColumn].getSign() == " ") {
      game.playRound(selectedCellRow, selectedCellColumn);
      updateScreen();
    } else {
      console.log("Cell already taken!!!");
    }
  }
  boardDiv.addEventListener("click", clickHandler);

  updateScreen();
}

ScreenController();
