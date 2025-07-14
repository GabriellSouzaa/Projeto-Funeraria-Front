import { Component, Input } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ClienteService } from '../shared/services/cliente.service';
import { Cliente } from '../shared/models/Cliente.model';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ClienteForm } from '../forms/Cliente.form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesAtrasoComponent } from '../clientes-atraso/clientes-atraso.component';
import { ClientesComBeneficiariosFalecidosComponent } from '../clientes-com-beneficiarios-falecidos/clientes-com-beneficiarios-falecidos.component';
import { EditarClienteForm, atribuirForm } from '../forms/EditarCliente.form';
import { Beneficiarios } from '../shared/models/Beneficiarios.model';
import { InputMaskModule } from 'primeng/inputmask';
import { NgIf } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Desconto } from '../shared/models/Desconto.model';
import { SideNavComponent } from '../side-nav/side-nav.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { RouterOutlet } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastItem, ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [BreadcrumbComponent, SplitButtonModule, MessagesModule, ToastModule, SideNavComponent, TableModule, TooltipModule, DialogModule, ReactiveFormsModule, ClientesAtrasoComponent, ClientesComBeneficiariosFalecidosComponent, InputMaskModule, NgIf, ProgressSpinnerModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  providers: [MessageService]
})
export class ClientesComponent {


  constructor(private clienteService: ClienteService, private messageService: MessageService) { }

  public clientes: Cliente[] = [];

  public clienteSelecionadoParaConsultarInformacoesAdicionais: Cliente = new Cliente();

  public clienteSelecionadoParaExcluir: Cliente = new Cliente();
  private selectedFile: File | null = null;

  public clienteSelecionadoParaEditar: Cliente = new Cliente();

  public formCadastrarCliente: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    cidadeNascimento: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    profissao: new FormControl(''),
    religiao: new FormControl(''),
    estado_civil: new FormControl(''),
    telefone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    image: new FormControl('')
  });

  public formEditarCliente: FormGroup = new FormGroup({});

  public visibleDialogConsultarInformacoesAdicionais: boolean = false;

  public visibleDialogCadastrarCliente: boolean = false;

  public visibleDialogClientesAtraso: boolean = false;

  public visibleDialogExcluirCliente: boolean = false;

  public visibleDialogClientesComBeneficiariosFalecidos: boolean = false;

  public visibleDialogEditarCliente: boolean = false;

  public visibleDialogBeneficiariosDoCliente: boolean = false;

  public clienteParaConsultarBeneficiarios: Cliente = new Cliente();

  public clienteParaConsultarDesconto: Cliente = new Cliente();

  public beneficiariosDoCliente: Beneficiarios[] = [];

  public descontos: Desconto = new Desconto();

  public carregandoCadastroCliente: boolean = false;

  public buscarDescontos: boolean = false;

  public carregandoEditarCliente: boolean = false;

  public carregandoExcluirCliente: boolean = false;

  public carregandoClientes: boolean = false;

  public carregandoRelatorioBeneficiariosDoCliente: boolean = false;

  ngOnInit(): void {
    console.log(this.formCadastrarCliente)
    this.listarClientes();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  public listarClientes(): void {
    this.carregandoClientes = true;
    this.clienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.carregandoClientes = false;
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

  public abrirDialogDesconto(): void{
    this.buscarDescontos = true;
    this.listarDescontos()

  }

  public fecharDialogCadastrarCliente(): void{
    this.visibleDialogCadastrarCliente = false;
    this.formCadastrarCliente.reset();
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

  public cadastrarCliente(): void {
    this.carregandoCadastroCliente = true;
  const formData: FormData = new FormData();
  Object.keys(this.formCadastrarCliente.value).forEach(key => {
    formData.append(key, this.formCadastrarCliente.value[key]);
  });

  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name); // Enviando o arquivo
  }


    this.clienteService.cadastrarCliente(formData).subscribe({
      error: () => {
        this.messageService.add({
          severity: 'error',
          detail: 'Dados Incorretos ou já Existentes'
        });
        this.carregandoCadastroCliente = false;
        this.fecharDialogCadastrarCliente();
      },
      next: () => {
        this.fecharDialogCadastrarCliente();
        this.listarClientes();
        this.carregandoCadastroCliente = false;
        this.messageService.add({
          severity: 'success',
          detail: 'Cliente cadastrado com Sucesso'
        });
      }
    });
  }

  public editarCliente(): void{
    this.carregandoEditarCliente = true;
    this.clienteService.editarCliente(this.formEditarCliente.value).subscribe({
      error: () => {
        this.messageService.add({severity: 'error', detail: 'Erro ao editar Cliente'})
        this.fecharDialogEditarCliente();
      },
      next: () => {
        this.fecharDialogEditarCliente();
        this.listarClientes();
        this.formEditarCliente.reset();
        this.carregandoEditarCliente = false;
        this.messageService.add({severity: 'success', detail: 'Cliente Editado com Sucesso'})
      }

    })
  }

  public excluirCliente(): void{
    this.carregandoExcluirCliente = true;
    this.clienteService.deleteClient(this.clienteSelecionadoParaExcluir).subscribe( {
      error: () => {
        this.messageService.add({severity: 'error', detail: 'Erro ao Deletar o Cliente'})
        this.fecharDialogExcluirCliente();
        this.carregandoExcluirCliente = false;
      },
      next: () => {
        this.fecharDialogExcluirCliente();
        this.listarClientes();
        this.clienteSelecionadoParaExcluir = new Cliente();
        this.carregandoExcluirCliente = false;
        this.messageService.add({severity: 'success', detail: 'Cliente excluido com Sucesso'})
      }

    });
  }

  public abrirDialogClientesComBeneficiariosFalecidos(): void{
    this.visibleDialogClientesComBeneficiariosFalecidos = true;
  }

  public fecharDialogClientesComBeneficiariosFalecidos(): void{
    this.visibleDialogClientesComBeneficiariosFalecidos = false;
  }

  public abrirDialogEditarCliente(cliente: Cliente): void{
    this.clienteSelecionadoParaEditar = cliente;
    atribuirForm(this.formEditarCliente, this.clienteSelecionadoParaEditar);
    this.visibleDialogEditarCliente = true;
  }

  public fecharDialogEditarCliente(): void{
    this.visibleDialogEditarCliente = false;
  }

  public abrirDialogBeneficiariosDoCliente(cliente: Cliente): void{
    this.clienteParaConsultarBeneficiarios = cliente;
    this.visibleDialogBeneficiariosDoCliente = true;
    this.listarBeneficiariosDoCliente();
  }

  public fecharDialogBeneficiariosDoCliente(): void{
    this.visibleDialogBeneficiariosDoCliente = false;
    this.beneficiariosDoCliente = [];
    this.clienteParaConsultarBeneficiarios = new Cliente();
  }

  public fecharDialogDesconto(): void {
    this.buscarDescontos = false;
  }

  public listarBeneficiariosDoCliente(){

    this.clienteService.listarBeneficiariosDoCliente(this.clienteParaConsultarBeneficiarios).subscribe(beneficiarios => {
      this.beneficiariosDoCliente = beneficiarios;
    });
  }

  public listarDescontos(){
    this.clienteService.listarDescontos(1).subscribe(descontos => {
      this.descontos = descontos;

    });
  }

  public gerarRelatorioBeneficiariosDoCliente(): void{
    this.carregandoRelatorioBeneficiariosDoCliente = true;
    this.clienteService.gerarRelatorioBeneficiariosDoCliente(this.clienteParaConsultarBeneficiarios).subscribe((relatorio: any)=>{
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
      this.carregandoRelatorioBeneficiariosDoCliente = false;
    })
  }

}
