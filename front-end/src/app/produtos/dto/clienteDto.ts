import { EnderecoDto } from "./enderecoDto";

export class ClienteDto {
    constructor(
        private _id: number,
        private _nome_nomefantasia: string,
        private _sobrenome_razaosocial: string,
        private _rg_ie: string,
        private _cpf_cnpj: string,
        private _datanascimento_dataabertura: Date | string,
        private _enderecos: EnderecoDto[]
    ) { }

    public get enderecos(): EnderecoDto[] {
        return this._enderecos || [];
    }
    public set enderecos(value: EnderecoDto[]) {
        this._enderecos = value;
    }
    public get datanascimento_dataabertura(): Date | string {
        return this._datanascimento_dataabertura;
    }
    public set datanascimento_dataabertura(value: Date | string) {
        this._datanascimento_dataabertura = value;
    }
    public get cpf_cnpj(): string {
        return this._cpf_cnpj;
    }
    public set cpf_cnpj(value: string) {
        this._cpf_cnpj = value;
    }
    public get rg_ie(): string {
        return this._rg_ie;
    }
    public set rg_ie(value: string) {
        this._rg_ie = value;
    }
    public get sobrenome_razaosocial(): string {
        return this._sobrenome_razaosocial;
    }
    public set sobrenome_razaosocial(value: string) {
        this._sobrenome_razaosocial = value;
    }
    public get nome_nomefantasia(): string {
        return this._nome_nomefantasia;
    }
    public set nome_nomefantasia(value: string) {
        this._nome_nomefantasia = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public static createClienteToUpdate(dataToUpdate: ClienteDto, currentData: ClienteDto) {
        return new ClienteDto (
            currentData.id,
            (dataToUpdate.nome_nomefantasia.length == 0) ? currentData.nome_nomefantasia : dataToUpdate.nome_nomefantasia,
            (dataToUpdate.sobrenome_razaosocial.length == 0) ? currentData.sobrenome_razaosocial : dataToUpdate.sobrenome_razaosocial,
            (dataToUpdate.rg_ie.length == 0) ? currentData.rg_ie : dataToUpdate.rg_ie,
            (dataToUpdate.cpf_cnpj.length == 0) ? currentData.cpf_cnpj : dataToUpdate.cpf_cnpj,
            (!dataToUpdate._datanascimento_dataabertura) ? currentData.datanascimento_dataabertura : dataToUpdate.datanascimento_dataabertura,
            []
        );
    }
}