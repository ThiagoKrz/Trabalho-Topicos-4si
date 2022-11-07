import express from "express";
import cors from "cors";
import connection from "./config/database.js";
import ClienteRouter from "./cliente/clienteControler.js";

const app = express();
connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao Banco de Dados.");
  })
  .catch((error) => {
    console.log("Erro ao se conectar ao Banco de Dados. " + error);
  });

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/cliente", ClienteRouter);
app.listen(8000, () => {
  console.log("Servidor iniciado.");
});
