import express from "express";
import EnderecoModel from "../endereco/enderecoModel.js";
import ClienteModel from "./clienteModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const clientes = await ClienteModel.findAll();
  res.json(clientes);
});

router.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const cliente = await ClienteModel.findById(id, { include: "enderecos" });
  res.json(cliente);
});

router.post("/", async (req, res) => {
  const nome_nomefantasia = req.body._nome_nomefantasia;
  const sobrenome_razaosocial = req.body._sobrenome_razaosocial;
  const rg_ie = req.body._rg_ie;
  const cpf_cnpj = req.body._cpf_cnpj;
  const datanascimento_dataabertura = req.body._datanascimento_dataabertura;
  const enderecos = req.body._enderecos || [];

  try {
    await ClienteModel.create(
      {
        nome_nomefantasia: nome_nomefantasia,
        sobrenome_razaosocial: sobrenome_razaosocial,
        rg_ie: rg_ie,
        cpf_cnpj: cpf_cnpj,
        datanascimento_dataabertura: datanascimento_dataabertura,
        enderecos: enderecos.map((e) => {
          return {
            titulo: e._titulo,
            cep: e._cep,
            ibge: e._ibge,
            uf: e._uf,
            cidade: e._cidade,
            logradouro: e._logradouro,
            bairro: e._bairro,
            numero: e._numero,
          };
        }),
      },
      { include: ["enderecos"] }
    );
    
    res.json({ message: "Cliente criado com sucesso." });

  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = +req.params.id;

  const nome_nomefantasia = req.body._nome_nomefantasia || undefined;
  const sobrenome_razaosocial = req.body._sobrenome_razaosocial || undefined;
  const rg_ie = req.body._rg_ie || undefined;
  const cpf_cnpj = req.body._cpf_cnpj || undefined;
  const datanascimento_dataabertura =
    req.body._datanascimento_dataabertura || undefined;

  let result = 0;
  try {
    result = await ClienteModel.update(
      {
        nome_nomefantasia: nome_nomefantasia,
        sobrenome_razaosocial: sobrenome_razaosocial,
        rg_ie: rg_ie,
        cpf_cnpj: cpf_cnpj,
        datanascimento_dataabertura: datanascimento_dataabertura,
      },
      { where: { id: id }, include: ["enderecos"] }
    );

    if (result == 0) throw new Error(`Cliente ${id} não encontrado`);

    res.json({ message: "Cliente atualizado." });
  } catch (error) {
    console.error(error);
    res.json({ message: "Falha ao atualizar cliente!" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await ClienteModel.destroy({ where: { id: id } });

    if (result == 0) throw new Error(`Cliente ${id} não encontrado`);

    res.json({ message: "Cliente removido." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id/endereco", async (req, res) => {
  const id = +req.params.id;
  const endereco = await EnderecoModel.findAll({ where: { cliente_id: id } });
  res.json(endereco);
});

router.post("/:id/endereco", async (req, res) => {
  const id = req.params.id;

  const titulo = req.body._titulo;
  const cep = req.body._cep;
  const ibge = req.body._ibge;
  const uf = req.body._uf;
  const cidade = req.body._cidade;
  const logradouro = req.body._logradouro;
  const bairro = req.body._bairro;
  const numero = req.body._numero;
  try {
    const result = await EnderecoModel.create({
      titulo: titulo,
      cep: cep,
      ibge: ibge,
      uf: uf,
      cidade: cidade,
      logradouro: logradouro,
      bairro: bairro,
      numero: numero,
      cliente_id: id,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.json({ message: "Falha ao criar endereço!" });
  }
});

router.patch("/endereco/:idendereco", async (req, res) => {
  const id = req.params.id;
  const enderecoId = req.params.idendereco;

  const titulo = req.body.titulo || undefined;
  const cep = req.body.cep || undefined;
  const ibge = req.body.ibge || undefined;
  const uf = req.body.uf || undefined;
  const cidade = req.body.cidade || undefined;
  const logradouro = req.body.logradouro || undefined;
  const bairro = req.body.bairro || undefined;
  const numero = req.body.numero || undefined;

  try {
    const result = await EnderecoModel.update(
      {
        titulo: titulo,
        cep: cep,
        ibge: ibge,
        uf: uf,
        cidade: cidade,
        logradouro: logradouro,
        bairro: bairro,
        numero: numero,
      },
      { where: { cliente_id: id, id: enderecoId } }
    );

    if (result == 0) throw new Error(`Endereço ${e.id} não encontrado`);

    res.json({ message: "Endereço atualizado." });
  } catch (error) {
    console.error(error);
    res.json({ message: "Falha ao atualizar endereço!" });
  }
});

router.delete("/endereco/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await EnderecoModel.destroy({
      where: { id: id},
    });

    if (result == 0) throw new Error(`Endereço ${id} não encontrado`);

    res.json({ message: "Endereço removido." });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error });
  }
});

export default router;
