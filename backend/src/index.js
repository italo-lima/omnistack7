const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors"); //Permite que qualquer aplicação consuma o back

const app = express();
//Instala o socket.io, para tbm ter acesso ao protocolo http e 'io'
const server = require("http").Server(app);
const io = require("socket.io")(server);

//Conexão com mongoDB
mongoose.connect("mongodb://localhost:27017/omnistack", {
  useNewUrlParser: true
});

//middleware
//agora tds as rotas tem acesso ao 'io'
app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);
app.use(require("./routes"));

server.listen(3333);
