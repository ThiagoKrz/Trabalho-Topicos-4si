export class EnderecoForm {
    constructor(
        private _idForm: number,
        private _titulo: string,
        private _CEP: string,
        private _IBGE: number,
        private _UF: string,
        private _cidade: string,
        private _logradouro: string,
        private _bairro: string,
        private _numero: string,
        private _isNovo: boolean = false,
        private _id?: number
    ) { }

    public get UF(): string {
        return this._UF;
    }
    public set UF(value: string) {
        this._UF = value;
    }
    public get IBGE(): number {
        return this._IBGE;
    }
    public set IBGE(value: number) {
        this._IBGE = value;
    }
    public get CEP(): string {
        return this._CEP;
    }
    public set CEP(value: string) {
        this._CEP = value;
    }
    public get numero(): string {
        return this._numero;
    }
    public set numero(value: string) {
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

    public get idForm(): number {
        return this._idForm;
    }
    public set idForm(value: number) {
        this._idForm = value;
    }

    public get isNovo(): boolean {
        return this._isNovo;
    }
    public set isNovo(value: boolean) {
        this._isNovo = value;
    }
}