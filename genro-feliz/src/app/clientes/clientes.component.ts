import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/Cliente.model';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';



@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, TooltipModule, DialogModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  constructor(private clienteService: ClienteService) { }

  public clientes: Cliente[] = [];

  public clienteSelecionadoParaConsultarInformacoesAdicionais: Cliente = new Cliente();

  public visibleDialogConsultarInformacoesAdicionais: boolean = false;

  ngOnInit(): void {
    this.listarClientes();
  }

  public listarClientes(): void {
    this.clienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  public abrirDialogConsultarInformacoesAdicionais(cliente: Cliente): void{
    this.clienteSelecionadoParaConsultarInformacoesAdicionais = cliente;
    this.visibleDialogConsultarInformacoesAdicionais = true;
  }

  public fecharDialogConsultarInformacoesAdicionais(): void{
    this.visibleDialogConsultarInformacoesAdicionais = false;
  }

}
