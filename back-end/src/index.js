import express from "express"
import connection from "./config/database.js"
import EnderecoModel from "./enderece/EnderecoModel.js"
import ClienteModel from "./enderece/clienteModel.js"


const app = express()
connection.authenticate().then(()=>{
    console.log("Conectado ao Banco de Dados.")
}).catch((error)=>{
    console.log("Erro ao se conectar ao Banco de Dados. "+error)
})

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.listen(4200,()=>{console.log("Servidor iniciado.")})

