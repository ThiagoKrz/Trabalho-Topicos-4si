// import { Endereco } from "./enderecoForm";

export class Cliente {
    constructor(
        private _id: number,
        private _nome_nomeFantasia: string,
        private _sobrenome_RazaoSocial: string,
        private _RG_IE: string,
        private _CPF_CNPJ: string,
        private _DataNascimento_DataAbertura: Date | string,
        // private _enderecos?: Endereco[]
    ) { }

    // public get enderecos(): Endereco[] {
    //     return this._enderecos || [];
    // }
    // public set enderecos(value: Endereco[]) {
    //     this._enderecos = value;
    // }
    public get DataNascimento_DataAbertura(): Date | string {
        return this._DataNascimento_DataAbertura;
    }
    public set DataNascimento_DataAbertura(value: Date | string) {
        this._DataNascimento_DataAbertura = value;
    }
    public get CPF_CNPJ(): string {
        return this._CPF_CNPJ;
    }
    public set CPF_CNPJ(value: string) {
        this._CPF_CNPJ = value;
    }
    public get RG_IE(): string {
        return this._RG_IE;
    }
    public set RG_IE(value: string) {
        this._RG_IE = value;
    }
    public get sobrenome_RazaoSocial(): string {
        return this._sobrenome_RazaoSocial;
    }
    public set sobrenome_RazaoSocial(value: string) {
        this._sobrenome_RazaoSocial = value;
    }
    public get nome_nomeFantasia(): string {
        return this._nome_nomeFantasia;
    }
    public set nome_nomeFantasia(value: string) {
        this._nome_nomeFantasia = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}