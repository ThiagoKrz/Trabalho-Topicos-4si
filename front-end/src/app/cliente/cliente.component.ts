import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../commons/global-constants';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteDto } from './dto/clienteDto';
import { EnderecoDto } from './dto/enderecoDto';
import { ResponseHttp } from './vo/responseHttp';
import { FormEndereco } from './vo/FormEndereco';

@Component({
  selector: 'app-customer',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  enderecosForm: FormEndereco[] = [];
  clienteForm?: ClienteDto | null;

  clientes: ClienteDto[] = [];
  closeResult: string = "";

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAll();
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
      this.clienteForm = null;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.enderecosForm = [];
      this.clienteForm = null;
      return 'by clicking on a backdrop';
    } else {
      this.enderecosForm = [];
      this.clienteForm = null;
      return `with: ${reason}`;
    }
  }


  //FORM CLIENTE
  onSubmit(f: any) {

    const idCliente = (this.clienteForm) ? this.clienteForm.id : -1;

    const newCliente = new ClienteDto(
      idCliente,
      f.formNomeCliente,
      f.formSobrenomeCliente,
      f.formRgCliente,
      f.formCpfCliente,
      f.formDataCliente,
      this.enderecosForm.map(e => e.endereco)
    );

    if (newCliente.id == -1) {

      this.http.post(GlobalConstants.apiURL + "/cliente", newCliente, { observe: 'response' }).subscribe(response => {
        const responseBody = response.body as ResponseHttp;
        this.getAll();
        this.modalService.dismissAll();
      }, (responseError) => {
        console.log(responseError.error.message);
      })

    } else {
      const updateCliente = ClienteDto.createClienteToUpdate(newCliente, this.clienteForm!);

      this.http.patch(GlobalConstants.apiURL + "/cliente/" + newCliente.id, updateCliente, { observe: 'response' }).subscribe(response => {
        const responseBody = response.body as ResponseHttp;
        this.getAll();
        this.modalService.dismissAll();
      }, (responseError) => {
        console.log(responseError.error.message);
      })

      this.getAll();
    }


  }


  // FORM ENDERECO
  onAddEndereco(f: any) {
    const idForm: number = this.enderecosForm.length > 0 ? this.enderecosForm[this.enderecosForm.length - 1].idForm + 1 : 1;
    const idCliente = (this.clienteForm) ? this.clienteForm.id : -1;

    const newEndereco = new EnderecoDto(
      f.tituloEndereco,
      f.cepEndereco,
      f.ibgeEndereco,
      f.ufEndereco,
      f.cidadeEndereco,
      f.logradouroEndereco,
      f.bairroEndereco,
      f.numeroEndereco
    );

    if (idCliente != -1) {
      this.http.post(GlobalConstants.apiURL + "/cliente/" + idCliente + "/endereco", newEndereco, { observe: 'response' }).subscribe(response => {
        const responseBody = response.body as ResponseHttp;
        this.getAllEnderecos(idCliente);
      }, (responseError) => {
        console.log(responseError.error.message);
      })

    } else {
      this.enderecosForm.push(new FormEndereco(idForm, newEndereco));
    }
  }

  onRemoveEndereco(idForm: number) {
    const enderecoForm: FormEndereco | undefined = this.enderecosForm.find((f) => f.idForm == idForm);
    if (enderecoForm) {
      const index = this.enderecosForm.indexOf(enderecoForm);

      if (enderecoForm?.endereco.id) {
        this.http.delete(GlobalConstants.apiURL + "/cliente/endereco/" + enderecoForm.endereco.id, { observe: 'response' }).subscribe(response => {
          this.enderecosForm.splice(index, 1);
        }, (responseError) => {
          console.log(responseError.error.message);
        })
      } else {
        this.enderecosForm.splice(index, 1);
      }
    }
  }


  //TABELA CLIENTE
  onRemoveCliente(id: number) {
    this.http.delete(GlobalConstants.apiURL + "/cliente/" + id, { observe: 'response' }).subscribe(response => {
      this.getAll();
    }, (responseError) => {
      console.log(responseError.error.message);
    })
  }

  async onEditCliente(content: any, id: number) {
    this.open(content)
    const response = await this.http.get<ClienteDto>(GlobalConstants.apiURL + "/cliente/" + id).toPromise();

    if (response) {
      this.clienteForm = response;
      let idForm: number = 1;
      this.enderecosForm = this.clienteForm.enderecos.map(e => new FormEndereco(idForm++, e));


      (<HTMLInputElement>document.getElementById('formIdCliente')).value = this.clienteForm.id.toString();
      (<HTMLInputElement>document.getElementById('formNomeCliente')).value = this.clienteForm.nome_nomefantasia;
      (<HTMLInputElement>document.getElementById('formSobrenomeCliente')).value = this.clienteForm.sobrenome_razaosocial;
      (<HTMLInputElement>document.getElementById('formRgCliente')).value = this.clienteForm.rg_ie;
      (<HTMLInputElement>document.getElementById('formCpfCliente')).value = this.clienteForm.cpf_cnpj;
      (<HTMLInputElement>document.getElementById('formDataCliente')).value = this.clienteForm.datanascimento_dataabertura.toString();
    }

  }

  getAll() {
    this.http.get<ClienteDto[]>(GlobalConstants.apiURL + "/cliente").subscribe(data => {
      this.clientes = data;
    })
  }

  getAllEnderecos(id: number) {
    this.http.get<EnderecoDto[]>(GlobalConstants.apiURL + "/cliente/" + id + "/endereco").subscribe(data => {
      this.enderecosForm = data.map(e => new FormEndereco(e.id!, e));

      console.log(this.enderecosForm);

    })
  }

}
