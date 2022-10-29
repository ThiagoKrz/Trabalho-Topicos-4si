import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../commons/global-constants';
import { Cliente } from './dto/cliente';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoForm } from './dto/enderecoForm';

@Component({
  selector: 'app-customer',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  enderecosForm: EnderecoForm[] = [];
  clienteForm?: Cliente;

  clientes: Cliente[] = [
    new Cliente(1, "PicPay", "PicPay", "21313131", "3242434232423", "01/06/2001"),
    new Cliente(2, "Itau", "Itau", "21313131", "3242434232423", "01/06/2001"),
    new Cliente(3, "Bradesco", "Bradesco", "21313131", "3242434232423", "01/06/2001"),
  ];

  closeResult: string = "";

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
  }



  // MODEL FORM
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.enderecosForm = [];
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.enderecosForm = [];
      return 'by clicking on a backdrop';
    } else {
      this.enderecosForm = [];
      return `with: ${reason}`;
    }
  }


  //FORM CLIENTE
  onSubmit(f: any) {
    console.log(f);
    // this.modalService.dismissAll(); //dismiss the modal
  }



  // FORM ENDERECO
  onAddEndereco(f: any) {
    const idForm: number = this.enderecosForm.length > 0 ? this.enderecosForm[this.enderecosForm.length - 1].idForm + 1 : 1;

    const novoEndereco = new EnderecoForm(
      idForm,
      f.tituloEndereco,
      f.cepEndereco,
      f.ibgeEndereco,
      f.ufEndereco,
      f.cidadeEndereco,
      f.logradouroEndereco,
      f.bairroEndereco,
      f.numeroEndereco,
      true,
      f.idEndereco
    );

    console.log(novoEndereco);
    this.enderecosForm.push(novoEndereco);
  }

  onRemoveEndereco(idForm: number) {
    const endereco: EnderecoForm | undefined = this.enderecosForm.find(end => end.idForm = idForm);
    let index;
    if (endereco) {
      index = this.enderecosForm.indexOf(endereco)

      this.enderecosForm.splice(index, 1);

      if (!endereco.isNovo)
        console.log("REMOVIDO DO BANCO");

      console.log(endereco);
    }

  }

  onEditEndereco(targetModal: any, idForm: number) {
    const endereco: EnderecoForm | undefined = this.enderecosForm.find(end => end.idForm = idForm);

    let index;
    if (endereco) {
      // index = this.enderecosForm.indexOf(endereco)

      (<HTMLInputElement>document.getElementById('idEndereco')).value = (endereco.id != undefined ? endereco.id.toString() : "");
      (<HTMLInputElement>document.getElementById('tituloEndereco')).value = endereco.titulo.toString();
      (<HTMLInputElement>document.getElementById('cepEndereco')).value = endereco.CEP.toString();
      (<HTMLInputElement>document.getElementById('ibgeEndereco')).value = endereco.IBGE.toString();
      (<HTMLInputElement>document.getElementById('ufEndereco')).value = endereco.UF.toString();
      (<HTMLInputElement>document.getElementById('cidadeEndereco')).value = endereco.cidade.toString();
      (<HTMLInputElement>document.getElementById('numeroEndereco')).value = endereco.numero.toString();
      (<HTMLInputElement>document.getElementById('logradouroEndereco')).value = endereco.logradouro.toString();
      (<HTMLInputElement>document.getElementById('bairroEndereco')).value = endereco.bairro.toString();

      if (!endereco.isNovo)
        console.log("REMOVIDO DO BANCO");

      console.log(endereco);
    }

  }


  //TABELA CLIENTE
  onRemoveCliente (id: number) {
    const cliente = this.clientes.find(c => c.id = id);
    let index;
    if (cliente) {
      index = this.clientes.indexOf(cliente)
      this.clientes.splice(index, 1);
    }
    
  }
}
