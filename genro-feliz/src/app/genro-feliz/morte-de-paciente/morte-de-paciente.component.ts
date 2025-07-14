import { Component } from '@angular/core';
import { MorteDePaciente } from '../shared/models/MorteDePaciente.model';
import { MorteDePacienteService } from '../shared/services/morte-de-paciente.service';
import { TableModule } from 'primeng/table';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { DialogModule } from 'primeng/dialog';
import { MorteDePacienteForm } from '../forms/MorteDePaciente.form';
import { DropdownModule } from 'primeng/dropdown';
import { SalaDeVelorio } from '../shared/models/SalaDeVelorio.model';
import { Cliente } from '../shared/models/Cliente.model';
import { Caixao } from '../shared/models/Caixao.model';
import { SalasDeVelorioService } from '../shared/services/salas-de-velorio.service';
import { ClienteService } from '../shared/services/cliente.service';
import { CaixaoService } from '../shared/services/caixao.service';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-morte-de-paciente',
  standalone: true,
  imports: [TableModule,SideNavComponent,ToastModule,  MessagesModule,  BreadcrumbComponent, ProgressSpinnerModule, NgIf, InputIconModule, InputTextModule, TooltipModule, IconFieldModule, DialogModule, DropdownModule, FormsModule, InputTextareaModule],
  templateUrl: './morte-de-paciente.component.html',
  styleUrl: './morte-de-paciente.component.css',
  providers: [MessageService]
})
export class MorteDePacienteComponent {

  constructor(private morteDePacienteService: MorteDePacienteService,  private messageService: MessageService,  private salaDeVelorioService: SalasDeVelorioService, private clienteService: ClienteService, private caixaoService: CaixaoService) { }

  public mortesDePaciente: MorteDePaciente[] = [];

  public carregandoMortesDePaciente: boolean = false;

  public visibleDialogAdicionarMorteDePaciente: boolean = false;

  public formParaCadastrarMorteDePaciente: MorteDePacienteForm = new MorteDePacienteForm();

  public salasDeVelorio: SalaDeVelorio[] = [];

  public clientes: Cliente[] = [];

  public caixoes: Caixao[] = [];

  public morteDePacienteSelecionadaParaExcluir: MorteDePaciente = new MorteDePaciente();

  public carregandoCadastroDeMorteDePaciente: boolean = false;

  public visibleDialogExcluirMorteDePaciente: boolean = false;

  public carregandoExclusaoMorteDePaciente: boolean = false;

  public morteDePacienteSelecionadaParaEditar: MorteDePaciente = new MorteDePaciente();

  public visibleDialogEditarMorteDePaciente: boolean = false;

  public carregandoEdicaoMorteDePaciente: boolean = false;

  ngOnInit() {
    this.listarMortesDePaciente();
  }

  public listarMortesDePaciente(): void{
    this.carregandoMortesDePaciente = true;
    this.morteDePacienteService.listarMortesDePaciente().subscribe((data) => {
      this.mortesDePaciente = data;
      this.carregandoMortesDePaciente = false;
    });
  }

  public cadastrarMorteDePaciente(): void{
    this.carregandoCadastroDeMorteDePaciente = true;
    console.log(this.formParaCadastrarMorteDePaciente)
    this.morteDePacienteService.cadastrarMorteDePaciente(this.formParaCadastrarMorteDePaciente).subscribe(
      {
        error: () => {
          this.messageService.add({severity: 'error', detail: 'Erro ao cadastrar Falecimento'})
          this.listarMortesDePaciente();
      this.fecharDialogAdicionarMorteDePaciente();
      this.carregandoCadastroDeMorteDePaciente = false;
        },
        next: () => {
          this.listarMortesDePaciente();
      this.fecharDialogAdicionarMorteDePaciente();
      this.carregandoCadastroDeMorteDePaciente = false;
          this.messageService.add({severity: 'success', detail: 'Falecimento cadastrado com Sucesso'})
        }
      }
      );
  }

  public buscarCaixoes(): void{
    this.caixaoService.listarCaixoes().subscribe((data) => {
      this.caixoes = data;
    });
  }

  public buscarClientes(): void{
    this.clienteService.listarClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  public buscarSalasDeVelorio(): void{
    this.salaDeVelorioService.listarSalasDeVelorio().subscribe((data) => {
      this.salasDeVelorio = data;
    });
  }

  public abrirDialogAdicionarMorteDePaciente(): void{
    this.visibleDialogAdicionarMorteDePaciente = true;
    this.buscarCaixoes();
    this.buscarClientes();
    this.buscarSalasDeVelorio();
  }

  public fecharDialogAdicionarMorteDePaciente(): void{
    this.visibleDialogAdicionarMorteDePaciente = false;
  }

  public abrirDialogExcluirMorteDePaciente(morteSelecionada: MorteDePaciente): void{
    this.visibleDialogExcluirMorteDePaciente = true;
    this.morteDePacienteSelecionadaParaExcluir = morteSelecionada;
  }

  public fecharDialogExcluirMorteDePaciente(): void{
    this.visibleDialogExcluirMorteDePaciente = false;
  }

  public excluirMorteDePaciente(): void{
    this.carregandoExclusaoMorteDePaciente = true;
    if(this.morteDePacienteSelecionadaParaExcluir.id){
      this.morteDePacienteService.deletarMorteDePaciente(this.morteDePacienteSelecionadaParaExcluir.id).subscribe(
        {
          error: () => {
            this.messageService.add({severity: 'error', detail: 'Erro ao excluir Falecimento'})
            this.listarMortesDePaciente();
            this.fecharDialogExcluirMorteDePaciente();
            this.carregandoExclusaoMorteDePaciente = false;
          },
          next: () => {
            this.listarMortesDePaciente();
        this.fecharDialogExcluirMorteDePaciente();
        this.carregandoExclusaoMorteDePaciente = false;
            this.messageService.add({severity: 'success', detail: 'Falecimento excluido com Sucesso'})
          }
        }
        );
    }
  }

  public abrirDialogEditarMorteDePaciente(morteSelecionada: MorteDePaciente): void{
    this.buscarCaixoes();
    this.buscarClientes();
    this.buscarSalasDeVelorio();
    this.morteDePacienteSelecionadaParaEditar = morteSelecionada;
    this.visibleDialogEditarMorteDePaciente = true;

  }

  public fecharDialogEditarMorteDePaciente(): void{
    this.visibleDialogEditarMorteDePaciente = false;
  }

  public editarMorteDePaciente(): void{
    this.carregandoEdicaoMorteDePaciente = true;
    if(this.morteDePacienteSelecionadaParaEditar.id){
      this.morteDePacienteService.editarMorteDePaciente(this.morteDePacienteSelecionadaParaEditar.id, this.morteDePacienteSelecionadaParaEditar).subscribe(
        {
          error: () => {
            this.messageService.add({severity: 'error', detail: 'Erro ao editar Falecimento'})
            this.listarMortesDePaciente();
        this.fecharDialogEditarMorteDePaciente();
        this.carregandoEdicaoMorteDePaciente = false;
          },
          next: () => {
            this.listarMortesDePaciente();
        this.fecharDialogEditarMorteDePaciente();
        this.carregandoEdicaoMorteDePaciente = false;
            this.messageService.add({severity: 'success', detail: 'Falecimento editado com Sucesso'})
          }
        }
        );
    }
  }



}
