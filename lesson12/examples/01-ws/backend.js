const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({
  port: 5000,
});

const clients = [];

wss.on("connection", (ws) => {
  console.log("new user connected");

  clients.push(ws);

  for (const client of clients) {
    if (client === ws) {
      client.send("Welcome to chat!");
    } else {
      client.send("New user connected!");
    }
  }

  ws.on("message", (message) => {
    console.log("got message from frontend", message.toString());
  });

  // setInterval(() => {
  //   ws.send("ping from backend!");
  // }, 2000);
});

console.log("Server is listening on port 5000");
