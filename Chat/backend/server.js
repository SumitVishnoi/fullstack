import app from "./src/app.js"
import http from "http"
import { Server } from "socket.io"
import { initSocket } from "./src/socket/initSocket.js";

const server = http.createServer(app);

initSocket(server)

server.listen(3000, ()=> {
    console.log("server is running on port 3000")
})