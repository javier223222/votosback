import { Server } from "socket.io";
import server from "./src/server";
import dotenv from "dotenv";
import { verify } from "./src/middlewares/socket/admin";
import { verifyuser } from "./src/middlewares/socket";
import candidatoHandler from "./src/handlers/candidato.handler";
import votarHandler from "./src/handlers/votar.handler";

dotenv.config();
server.listen(process.env.PORT || 3000, () => {
    console.log("server on port", process.env.PORT || 3000);
})
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});



const onConnection = (socket: any) => {
    console.log("new connection", socket.id);
    candidatoHandler(io, socket);
    votarHandler(io, socket)
}
//namespaces and security
io.of("/votaciones").on("connection", onConnection).use(verify);
io.of("/user/votaciones").on("connection", onConnection).use(verifyuser);
