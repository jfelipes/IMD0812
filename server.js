const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");

const MAX_NUMBERS_OF_PLAYERS = process.env.MAX_NUMBERS_OF_PLAYERS || 2;
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

// Static folder setup
app.use(express.static(path.join(__dirname, "public")));

// Initialize connections arrays
const connections = new Array(MAX_NUMBERS_OF_PLAYERS).fill(null);

// Reset players array
function resetPlayers() {
  connections.fill(null);
}

// Starting server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  resetPlayers();
});

// Handling socket connection request from web client
io.on("connection", (socket) => {
  // Find an available player number
  let playerIndex = -1;

  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }

  // Tell the connecting client what player number they are
  socket.emit("player-number", playerIndex);
  if (playerIndex === -1) return;

  console.log(`Player ${playerIndex} has connected`);

  connections[playerIndex] = false;

  // Tell eveyone what player number just connected
  socket.broadcast.emit("player-connection", playerIndex);

  // Handle Diconnect
  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} disconnected`);
    connections[playerIndex] = null;

    //Tell everyone what player numbe just disconnected
    socket.broadcast.emit("player-connection", playerIndex);
  });

  // Check player connections
  // socket.on("check-players", () => {
  //   let playerNotReady = false;
  //   for (const i in connections) {
  //     if (connections[i] === false) {
  //       playerNotReady = true;
  //       break;
  //     }
  //   }
  //   if (playerNotReady) {
  //     return;
  //   }
  //   socket.broadcast.emit("draw-boards");
  // });

  // Player Ready
  socket.on();
});
