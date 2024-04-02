document.addEventListener("DOMContentLoaded", () => {
  const numberOfPlayers = 2;
  let playerNumber = null;
  let isReady = false;
  const gameStatus = "waiting";
  const gameBoards = [
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  ];

  let playerScore1 = 0;
  let playerScore2 = 0;
  const playerShips1 = [];
  const playerShips2 = [];
  let currentPlayer = 1;
  let gameGrid = [];
  let gamePhase = "setup";
  const usedCoordinates = [];
  const totalShipsPerPlayer = 5;

  // Função para limpar e preencher os tabuleiros
  function initializeBoards() {
    const gameBoard = document.querySelector(".game-board");

    for (var i = 0; i < numberOfPlayers; i++) {
      const board = document.createElement("div");
      board.className = `board player-${i + 1}`;
      gameBoard.appendChild(board);
    }

    const boards = document.querySelectorAll(".board");

    boards.forEach((board, index) => {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          const cell = document.createElement("div");
          cell.className = "cell";
          cell.dataset.row = row;
          cell.dataset.col = col;
          cell.addEventListener("click", (event) =>
            handleTorpedoDrop(event, index + 1)
          );
          board.appendChild(cell);
        }
      }
    });
  }

  // Função para deixar o jogador pronto
  function putPlayerReady(event) {
    console.log(playerNumber);
  }

  // Conexão com o servidor de sockets
  const socket = io();

  // Evento de conexão de jogador
  socket.on("player-connection", (connections) => {
    console.log("player-connection", connections);
  });

  // Pegando número de jogador
  socket.on("player-number", (num) => {
    const playerNumberElement = document.getElementById("player-number");

    if (num === -1) return;

    playerNumber = Number(num) + 1;
    playerNumberElement.innerHTML = `#0${playerNumber}`;

    const readyButtonElement = document.getElementById("ready-button");
    readyButtonElement.classList.remove("disabled");
    // readyButtonElement.addEventListener("click", (event) =>
    //   putPlayerReady(event)
    // );

    const startButtonElement = document.getElementById("start-button");
    // startButtonElement.classList.remove("disabled");

    // Get other player status
    socket.emit("check-players");
  });

  socket.on("draw-boards", () => {});
  initializeBoards();

  // Função para lidar com o soltar dos torpedos
  function handleTorpedoDrop(event, boardIndex) {
    if (boardIndex === playerNumber) console.log("Player board");
    else console.log("Enemy board");
    console.log("Handle Torpedo Drop -", `#0${boardIndex}`);

    // if (gameStatus === "waiting") return;

    // if (boardIndex === 1) {
    //   return;
    // }

    // const { row, col } = event.target.dataset;

    // let cellElement = gameBoards[boardIndex - 1][row][col];
    // if (cellElement === 1) {
    //   alert("Stop wasting your torpedos! You already fired at this location.");
    //   return;
    // }

    // gameBoards[boardIndex - 1][row][col] = 1;

    // socket.emit("torpedo", { row: row, col: col });
  }
});
