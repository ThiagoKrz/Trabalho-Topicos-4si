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
  console.log(req.body);
  const nome_nomefantasia = req.body.nome_nomefantasia;
  const sobrenome_razaosocial = req.body.sobrenome_razaosocial;
  const rg_ie = req.body.rg_ie;
  const cpf_cnpj = req.body.cpf_cnpj;
  const datanascimento_dataabertura = req.body.datanascimento_dataabertura;
  const enderecos = req.body.enderecos;

  const cliente = await ClienteModel.create(
    {
      nome_nomefantasia: nome_nomefantasia,
      sobrenome_razaosocial: sobrenome_razaosocial,
      rg_ie: rg_ie,
      cpf_cnpj: cpf_cnpj,
      datanascimento_dataabertura: datanascimento_dataabertura,
      enderecos: enderecos.map((e) => {
        return {
          titulo: e.titulo,
          cep: e.cep,
          ibge: e.ibge,
          uf: e.uf,
          cidade: e.cidade,
          logradouro: e.logradouro,
          bairro: e.bairro,
          numero: e.numero,
        };
      }),
    },
    { include: ["enderecos"] }
  );
  res.json(cliente);
});

router.patch("/:id", async (req, res) => {
  const id = +req.params.id;

  const nome_nomefantasia = req.body.nome_nomefantasia || undefined;
  const sobrenome_razaosocial = req.body.sobrenome_razaosocial || undefined;
  const rg_ie = req.body.rg_ie || undefined;
  const cpf_cnpj = req.body.cpf_cnpj || undefined;
  const datanascimento_dataabertura = req.body.datanascimento_dataabertura || undefined;
  const enderecos = req.body.enderecos || undefined;

  try {
    const result = await ClienteModel.update(
      {
        nome_nomefantasia: nome_nomefantasia,
        sobrenome_razaosocial: sobrenome_razaosocial,
        rg_ie: rg_ie,
        cpf_cnpj: cpf_cnpj,
        datanascimento_dataabertura: datanascimento_dataabertura,
      },
      { where: { id: id } }
    );

    if (result == 0) throw new Error(`Cliente ${id} não encontrado`);

    if (Array.isArray(enderecos)) {
      for (const e of enderecos) {
        const result = await EnderecoModel.update(
          {
            titulo: e.titulo,
            cep: e.cep,
            ibge: e.ibge,
            uf: e.uf,
            cidade: e.cidade,
            logradouro: e.logradouro,
            bairro: e.bairro,
            numero: e.numero,
          },
          { where: { id: e.id } }
        );

        if (result == 0) throw new Error(`Endereço ${e.id} não encontrado`);
      }
    }

    res.json({ message: "Cliente atualizado." });
  } catch (error) {
    console.error(error);
    res.json({ message: "Falha ao atualizar cliente!" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = +req.params.id;
  try {
    const result = await ClienteModel.destroy({ where: { id: id } });

    if (result == 0) throw new Error(`Cliente ${id} não encontrado`);

    res.json({ message: "Cliente removido." });
  } catch (error) {
    console.error(error);
    res.json({ message: "Falha ao remover cliente!" });
  }
});

export default router;
