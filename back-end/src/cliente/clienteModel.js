import connection from "../config/database.js";
import sequelize from "sequelize";
import EnderecoModel from "../endereco/EnderecoModel.js";

const ClienteModel = connection.define("Cliente", {
  nome_nomefantasia: { type: sequelize.STRING, allowNull: false },
  sobrenome_razaosocial: { type: sequelize.STRING, allowNull: false },
  rg_ie: { type: sequelize.STRING, allowNull: false },
  cpf_cnpj: { type: sequelize.STRING, allowNull: false },
  datanascimento_dataabertura: { type: sequelize.STRING, allowNull: false },
});

ClienteModel.hasMany(EnderecoModel, {
  foreignKey: { name: "cliente_id" },
  as: "enderecos",
  onDelete: "cascade",
  onUpdate: "cascade",
});

EnderecoModel.belongsTo(ClienteModel, {
  foreignKey: { name: "cliente_id" },
  as: "cliente",
});

// ClienteModel.sync({ force: true });
// EnderecoModel.sync({ force: true });

export default ClienteModel;
