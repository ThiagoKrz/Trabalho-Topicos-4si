import express from "express"
import ClienteModel from "./clienteModel.js"
import EnderecoModel from "../endereco/enderecoModel.js"

const router = express.Router()

router.get(
    "/", async(req, res)=>{
        const clientes = await ClienteModel.findAll()
        res.json(clientes)
    }
)
router.post(
    "/endereco", async(req, res)=>{
        const titulo = req.body.titulo
        const cep = req.body.cep
        const ibge = req.body.ibge
        const uf = req.body.uf
        const cidade = req.body.cidade
        const logradouro = req.body.logradouro
        const bairro = req.body.bairro
        const numero = req.body.numero

        const cliente = await EnderecoModel.create({
            titulo: titulo,
            cep: cep,
            ibge: ibge,
            uf: uf,
            cidade: cidade,
            logradouro: logradouro,
            bairro: bairro,
            numero: numero,
        })
        res.json(cliente)
    }
)
router.post(
    "/cliente", async(req, res)=>{
        const nome_nomefantasia = req.body.nome_nomefantasia
        const sobrenome_razaosocial = req.body.sobrenome_razaosocial
        const rg_ie = req.body.rg_ie
        const cpf = req.body.cpf
        const cnpj = req.body.cnpj
        const datanascimento_dataabertura = req.body.datanascimento_dataabertura
        const enderecos = req.body.enderecos

        const cliente = await EnderecoModel.create({
            nome_nomefantasia: nome_nomefantasia,
            sobrenome_razaosocial: sobrenome_razaosocial,
            rg_ie: rg_ie,
            cpf: cpf,
            cnpj: cnpj,
            datanascimento_dataabertura: datanascimento_dataabertura,
            enderecos: enderecos
        })
        res.json(cliente)
    }
)

export default router
