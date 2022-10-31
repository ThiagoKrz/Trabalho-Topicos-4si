import Sequelize from "sequelize"

const connection = new Sequelize(
    "anya", "root", "29251806t", {host:"localhost", dialect:"mysql"} 
)
export default connection 

