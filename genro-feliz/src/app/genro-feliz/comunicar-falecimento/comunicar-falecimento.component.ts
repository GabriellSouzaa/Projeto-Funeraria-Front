import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { ClienteService } from '../shared/services/cliente.service';
import { Cliente } from '../shared/models/Cliente.model';

@Component({
  selector: 'app-comunicar-falecimento',
  standalone: true,
  imports: [
    RadioButtonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    NgIf,
  ],
  templateUrl: './comunicar-falecimento.component.html',
  styleUrl: './comunicar-falecimento.component.css',
})
export class ComunicarFalecimentoComponent {
  public tipoDeBeneficiarioSelecionado: string = '';

  public conservacaoQuimica: string = '';

  public listaClientes: Cliente[] = [];

  public clienteFalecido: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {}

  public verificaTipoDeBeneficiario(event: any): void {
    if (this.tipoDeBeneficiarioSelecionado === 'Titular') {
      this.geraListaDeClientes();
    } else {
      if (this.tipoDeBeneficiarioSelecionado === 'Beneficiário') {
        this.listaClientes = [];
      }
    }
  }

  public geraListaDeClientes(): void {
    this.clienteService.listarClientes().subscribe(
      (clientes: Cliente[]) => {
        this.listaClientes = clientes;
      },
      (error: any) => console.log(error)
    );
  }
}
