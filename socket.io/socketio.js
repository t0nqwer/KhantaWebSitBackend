import { Server } from "socket.io";

const PORT = process.env.PORT || 5050;
export let io = new Server(PORT);

io.close();

io.on("connection", (socket) => {
  socket.on("connectname", (data) => {
    // updateConnectionId(data, socket.id);
    console.log(data);
  });

  //   socket.on("disconnect", () => {
  //     deleteConnectionId(socket.id);
  //   });
});
