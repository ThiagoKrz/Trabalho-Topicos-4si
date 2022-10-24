import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../commons/global-constants';
import { Customer } from './dto/customer.dto';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [
    {
      id: 1,
      nome_nomeFantasia: "PicPay",
      sobrenome_RazaoSocial: "PicPay",
      RG_IE: "21313131",
      CPF_CNPJ: "3242434232423",
      DataNascimento_DataAbertura: "01/06/2001"
    },
    {
      id: 1,
      nome_nomeFantasia: "Itau",
      sobrenome_RazaoSocial: "Itau",
      RG_IE: "21313131",
      CPF_CNPJ: "3242434232423",
      DataNascimento_DataAbertura: "01/06/2001"
    },
    {
      id: 1,
      nome_nomeFantasia: "Bradesco",
      sobrenome_RazaoSocial: "Bradesco",
      RG_IE: "21313131",
      CPF_CNPJ: "3242434232423",
      DataNascimento_DataAbertura: "01/06/2001"
    },
  ];
  closeResult: string = "";

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  findAll() {
    this.http.get(`${GlobalConstants.apiURL}/customers`).subscribe((response) => {
      console.log(response);
    }, (err) => {
      this.customers = [] 
    })
  }

  newCustomer() {
    this.http.get(`${GlobalConstants.apiURL}/customers`).subscribe((response) => {
      console.log(response);
    }, (err) => {
      this.customers = [] 
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
