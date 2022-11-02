import Sequelize from "sequelize"
import * as dotenv from "dotenv"

dotenv.config()

const connection = new Sequelize(
    process.env.DATABASE,process.env.USER,process.env.PASSWORD,{host:"localhost", dialect:"mysql"} 
)
export default connection 

