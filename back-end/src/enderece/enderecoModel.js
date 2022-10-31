import connection from "../config/database.js"
import sequelize from "sequelize"

const EnderecoModel = connection.define("Endereço",{

    titulo:{type:sequelize.STRING,allowNull:false},
    cep:{type:sequelize.STRING,allowNull:false},
    ibge:{type:sequelize.STRING,allowNull:false},
    uf:{type:sequelize.STRING,allowNull:false},
    cidade:{type:sequelize.STRING,allowNull:false},
    logradouro:{type:sequelize.STRING,allowNull:false},
    bairro:{type:sequelize.STRING,allowNull:false},
    numero:{type:sequelize.INTEGER,allowNull:false},
})
// EnderecoModel.sync({
//     force:true
// })
export default EnderecoModel
