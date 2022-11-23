export class EnderecoDto {
    constructor(
        private _titulo: string,
        private _cep: string,
        private _ibge: number,
        private _uf: string,
        private _cidade: string,
        private _logradouro: string,
        private _bairro: string,
        private _numero: number,
        private _id?: number
    ) { }

    public get uf(): string {
        return this._uf;
    }
    public set uf(value: string) {
        this._uf = value;
    }
    public get ibge(): number {
        return this._ibge;
    }
    public set ibge(value: number) {
        this._ibge = value;
    }
    public get cep(): string {
        return this._cep;
    }
    public set cep(value: string) {
        this._cep = value;
    }
    public get numero(): number {
        return this._numero;
    }
    public set numero(value: number) {
        this._numero = value;
    }
    public get bairro(): string {
        return this._bairro;
    }
    public set bairro(value: string) {
        this._bairro = value;
    }
    public get logradouro(): string {
        return this._logradouro;
    }
    public set logradouro(value: string) {
        this._logradouro = value;
    }
    public get cidade(): string {
        return this._cidade;
    }
    public set cidade(value: string) {
        this._cidade = value;
    }
    public get titulo(): string {
        return this._titulo;
    }
    public set titulo(value: string) {
        this._titulo = value;
    }
    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }
}