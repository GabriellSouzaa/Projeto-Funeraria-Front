import { BeneficiarioService } from './../shared/services/beneficiario.service';
import { Component } from '@angular/core';
import { EmailService } from '../shared/services/email.service';
import { Beneficiarios } from '../shared/models/Beneficiarios.model';
import { ClienteService } from '../shared/services/cliente.service';
import { Cliente } from '../shared/models/Cliente.model';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-clientes-com-beneficiarios-falecidos',
  standalone: true,
  imports: [ DropdownModule,
              TableModule,
              FormsModule,
              NgIf
  ],
  templateUrl: './clientes-com-beneficiarios-falecidos.component.html',
  styleUrl: './clientes-com-beneficiarios-falecidos.component.css'
})
export class ClientesComBeneficiariosFalecidosComponent {

  beneficiario: Beneficiarios[] = [];

  clientes: Cliente[] = [];

  public clienteParaConsultarBeneficiarios: Cliente = new Cliente();

  constructor( private emailService: EmailService, private beneficiarioService: BeneficiarioService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.buscarClientes()
  }


  public enviarEmailParaCliente(beneficiario: Beneficiarios): void{
    beneficiario.enviandoEmail = true;
    if(this.clienteParaConsultarBeneficiarios.id){
      this.emailService.sendEmailToBeneficiariesDeath(this.clienteParaConsultarBeneficiarios.id).subscribe(()=>{
        beneficiario.enviandoEmail = false;
      }, () => {
        beneficiario.enviandoEmail = false;
      })
    }
  }

  public buscarClientes(): void{
    this.clienteService.listarClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    })
  }

  public buscarBeneficiariosInativos(): void{
    this.beneficiarioService.listarBeneficiariosInativosDoCliente(this.clienteParaConsultarBeneficiarios.id).subscribe((beneficiarios: Beneficiarios[])=>{
      this.beneficiario = beneficiarios;
      console.log(this.beneficiario)
    })
  }

}
