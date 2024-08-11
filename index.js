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
    if (clickedCell.getSign() == " ") {
      clickedCell.addSign(playerSign);
    } else {
      return;
    }
    console.log(board[1][2].getSign());
  };

  return { getBoard, putSign };
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
  const game = Gameboard();

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

  // Marking of a cell
  const playRound = (row, column) => {
    game.putSign(row, column, getActivePlayer().sign);
    const declare = document.querySelector(".declare");

    if (winCheck()) {
      declare.textContent = `${getActivePlayer().name} whose sign is ${getActivePlayer().sign} has won!`;
      console.log(`${getActivePlayer().name} whose sign is ${getActivePlayer().sign} has won!`);
      resetGame();
    } else if (drawCheck()) {
      declare.textContent = "It's a draw!";
      console.log("It's a draw!");
      resetGame();
    } else {
      switchPlayerTurn();
    }
  };

  function winCheck() {
    const board = game.getBoard();

    if (
      board[0][0].getSign() === getActivePlayer().sign &&
      board[1][1].getSign() === getActivePlayer().sign &&
      board[2][2].getSign() === getActivePlayer().sign
    ) {
      return true;
    } else if (
      board[0][2].getSign() === getActivePlayer().sign &&
      board[1][1].getSign() === getActivePlayer().sign &&
      board[2][0].getSign() === getActivePlayer().sign
    ) {
      return true;
    }
    for (let index = 0; index < 3; index++) {
      if (
        board[index][0].getSign() === getActivePlayer().sign &&
        board[index][1].getSign() === getActivePlayer().sign &&
        board[index][2].getSign() === getActivePlayer().sign
      ) {
        return true;
      } else if (
        board[0][index].getSign() === getActivePlayer().sign &&
        board[1][index].getSign() === getActivePlayer().sign &&
        board[2][index].getSign() === getActivePlayer().sign
      ) {
        return true;
      }
    }
    return false;
  }

  function drawCheck() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (game.getBoard()[row][col].getSign() === " ") {
          return false;
        }
      }
    }
    return true;
  }

  function resetGame() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        game.getBoard()[i][j].addSign(" ");
      }
    }

    activePlayer = players[0];
  }

  return {
    playRound,
    getActivePlayer,
    getBoard: game.getBoard,
    winCheck,
    drawCheck,
    resetGame,
  };
}

function ScreenController() {
  const game = GameController();
  const container = document.querySelector(".container");
  const boardDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector(".turn");
  const declare = document.createElement("div");
  declare.classList.add("declare");
  declare.textContent = "Go on play...";
  container.appendChild(declare);

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
