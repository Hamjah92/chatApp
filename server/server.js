const { Server, Socket } = require("socket.io");

const io = new Server(5000, {cors: {
  allowedHeaders:"*",
  origin:"*"
}});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipient = recipients.filter((r) => r !== recipient);
      newRecipient.push(id);
      socket.broadcast
        .to(recipient)
        .emit("receive-message", {
          recipients: newRecipient,
          sender: id,
          text,
        });
    });
  });
});
