export class Customer {
    constructor(
        public id: number,
        public nome_nomeFantasia: string,
        public sobrenome_RazaoSocial: string,
        public RG_IE: string,
        public CPF_CNPJ: string,
        public DataNascimento_DataAbertura: Date | string
    ) { }
}