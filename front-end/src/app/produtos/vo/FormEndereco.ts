import { EnderecoDto } from "../dto/enderecoDto";

export class FormEndereco {
    constructor(
        public idForm: number,
        public endereco: EnderecoDto
    ) { }
}