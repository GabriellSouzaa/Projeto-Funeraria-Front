import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ClienteService } from '../shared/services/cliente.service';
import { Cliente } from '../shared/models/Cliente.model';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ClienteForm } from '../forms/Cliente.form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientesAtrasoComponent } from '../clientes-atraso/clientes-atraso.component';
import { ClientesComBeneficiariosFalecidosComponent } from '../clientes-com-beneficiarios-falecidos/clientes-com-beneficiarios-falecidos.component';



@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, TooltipModule, DialogModule, ReactiveFormsModule, ClientesAtrasoComponent, ClientesComBeneficiariosFalecidosComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  constructor(private clienteService: ClienteService) { }

  public clientes: Cliente[] = [];

  public clienteSelecionadoParaConsultarInformacoesAdicionais: Cliente = new Cliente();

  public clienteSelecionadoParaExcluir: Cliente = new Cliente();

  public formCadastrarCliente: FormGroup = new FormGroup({});

  public visibleDialogConsultarInformacoesAdicionais: boolean = false;

  public visibleDialogCadastrarCliente: boolean = false;

  public visibleDialogClientesAtraso: boolean = false;

  public visibleDialogExcluirCliente: boolean = false;

  public visibleDialogClientesComBeneficiariosFalecidos: boolean = false;

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

  public abrirDialogClientesAtraso(): void{
    this.visibleDialogClientesAtraso = true;
  }

  public fecharDialogClientesAtraso(): void{
    this.visibleDialogClientesAtraso = false;
  }

  public abrirDialogExcluirCliente(cliente: Cliente): void{
    this.clienteSelecionadoParaExcluir = cliente;
    this.visibleDialogExcluirCliente = true;
  }

  public fecharDialogExcluirCliente(): void{
    this.visibleDialogExcluirCliente = false;
  }

  public cadastrarCliente(): void{
    this.clienteService.cadastrarCliente(this.formCadastrarCliente.value).subscribe(() => {
      this.fecharDialogCadastrarCliente();
      this.listarClientes();
      this.formCadastrarCliente.reset();
    })
  }

  public excluirCliente(): void{
    this.clienteService.deleteClient(this.clienteSelecionadoParaExcluir).subscribe(() => {
      this.fecharDialogExcluirCliente();
      this.listarClientes();
      this.clienteSelecionadoParaExcluir = new Cliente();
    });
  }

  public abrirDialogClientesComBeneficiariosFalecidos(): void{
    this.visibleDialogClientesComBeneficiariosFalecidos = true;
  }

  public fecharDialogClientesComBeneficiariosFalecidos(): void{
    this.visibleDialogClientesComBeneficiariosFalecidos = false;
  }

}
