import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ClienteService } from '../shared/services/cliente.service';
import { Cliente } from '../shared/models/Cliente.model';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ClienteForm } from '../forms/Cliente.form';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, TooltipModule, DialogModule, ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  constructor(private clienteService: ClienteService) { }

  public clientes: Cliente[] = [];

  public clienteSelecionadoParaConsultarInformacoesAdicionais: Cliente = new Cliente();

  public formCadastrarCliente: FormGroup = new FormGroup({});

  public visibleDialogConsultarInformacoesAdicionais: boolean = false;

  public visibleDialogCadastrarCliente: boolean = false;

  ngOnInit(): void {
    this.listarClientes();
    this.formCadastrarCliente = ClienteForm;
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

  public abrirDialogCadastrarCliente(): void{
    this.visibleDialogCadastrarCliente = true;
  }

  public fecharDialogCadastrarCliente(): void{
    this.visibleDialogCadastrarCliente = false;
  }

  public cadastrarCliente(): void{
    this.clienteService.cadastrarCliente(this.formCadastrarCliente.value).subscribe(() => {
      this.fecharDialogCadastrarCliente();
      this.listarClientes();
      this.formCadastrarCliente.reset();
    })
  }

}
