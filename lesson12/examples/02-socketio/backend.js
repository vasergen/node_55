const http = require("http");
const { Server } = require("socket.io");

const httpServer = new http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (ws) => {
  console.log("new client connected");

  ws.emit("chatInfo", "Welcome to chat!");
  ws.broadcast.emit("chatInfo", "New client connected!");

  ws.on("chatMessage", (message) => {
    // console.log("got message from frontend:", message);
    ws.broadcast.emit("chatMessage", message);
  });
});

httpServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
