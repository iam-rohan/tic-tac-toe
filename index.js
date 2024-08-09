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
  const putSign = (row, column, player) => {
    const clickedCell = board[row][column];
    if (clickedCell.getSign() == 0) {
      clickedCell.addSign(player);
    } else {
      return;
    }
  };

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, putSign, printBoard };
};

// Representation of every cell block individually in the board among 9
function Cell() {
  let sign = 0;

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
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  // Marking of a cell
  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} marks board[${row}][${column}] cell...`);

    board.putSign(row, column, getActivePlayer().sign);

    switchPlayerTurn();
    printNewRound();
  };

  // Game initial preview
  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
