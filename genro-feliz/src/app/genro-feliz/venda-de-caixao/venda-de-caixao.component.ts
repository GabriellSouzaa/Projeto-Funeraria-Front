import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { VendaDeCaixaoService } from '../shared/services/venda-de-caixao.service';
import { VendaDeCaixao } from '../shared/models/VendaDeCaixao.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { NgIf } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendaDeCaixaoForm } from '../forms/CadastrarVendaDeCaixao.form';
import { DropdownModule } from 'primeng/dropdown';
import { VendedoresService } from '../shared/services/vendedores.service';
import { CaixaoService } from '../shared/services/caixao.service';
import { Vendedor } from '../shared/models/Vendedor.model';
import { Caixao } from '../shared/models/Caixao.model';
import {
  EditarVendaDeCaixaoForm,
  atribuirFormVendaDeCaixao,
} from '../forms/EditarVendaDeCaixao.form';
import { CadastroVendaDeCaixaoNovoForm } from '../forms/CadastroVendaDeCaixaoNovo.form';
import { Cliente } from '../shared/models/Cliente.model';
import { ClienteService } from '../shared/services/cliente.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-venda-de-caixao',
  standalone: true,
  imports: [
    TableModule,
    ProgressSpinnerModule,
    BreadcrumbComponent,
    MessagesModule,
    NgIf,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    TooltipModule,
    SideNavComponent,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './venda-de-caixao.component.html',
  styleUrl: './venda-de-caixao.component.css',
})
export class VendaDeCaixaoComponent {
  constructor(
    private vendaDeCaixaoService: VendaDeCaixaoService,
    private vendedoresService: VendedoresService,
    private caixaoService: CaixaoService,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}

  public vendasDeCaixao: VendaDeCaixao[] = [];

  public carregandoListasDeCaixao: boolean = false;

  public carregandoCadastroDeCaixao: boolean = false;

  public formularioEditarCaixao: FormGroup = new FormGroup({});

  public visibleDialogCadastroVendaCaixao: boolean = false;

  public vendedores: Vendedor[] = [];

  public caixoes: Caixao[] = [];

  public vendedorSelecionado: Vendedor = new Vendedor();

  public caixaoSelecionado: Caixao = new Caixao();

  public vendedorSelecionadoPelaEditar: Vendedor = new Vendedor();

  public caixaoSelecionadoPelaEditar: Caixao = new Caixao();

  public visibleDialogEditarVendaCaixao: boolean = false;

  public visibleDialogExcluirVendaCaixao: boolean = false;

  public vendaDeCaixaoSelecionadaPelaEditar: VendaDeCaixao =
    new VendaDeCaixao();

  public vendaDeCaixaoSelecionadaPelaExcluir: VendaDeCaixao =
    new VendaDeCaixao();

  public carregandoEdicaoDeVendaDeCaixao: boolean = false;

  public carregandoExclusaoDeVendaDeCaixao: boolean = false;

  public carregandoRelatorioMensalDeVendasDeCaixao: boolean = false;

  public formularioCadastrarVendaDeCaixao: CadastroVendaDeCaixaoNovoForm =
    new CadastroVendaDeCaixaoNovoForm();

  public clientes: Cliente[] = [];

  ngOnInit() {
    this.listarVendasDeCaixao();
    this.formularioEditarCaixao = EditarVendaDeCaixaoForm;
  }

  public listarVendasDeCaixao(): void {
    this.carregandoListasDeCaixao = true;
    this.vendaDeCaixaoService.listarVendasDeCaixao().subscribe((vendas) => {
      this.vendasDeCaixao = vendas;
      this.carregandoListasDeCaixao = false;
    });
  }

  public listarVendedores(): void {
    this.vendedoresService.listarVendedores().subscribe((vendedores) => {
      this.vendedores = vendedores;
    });
  }

  public listarCaixoes(): void {
    this.caixaoService.listarCaixoes().subscribe((caixoes) => {
      this.caixoes = caixoes;
    });
  }

  public abrirDialogCadastroVendaCaixao(): void {
    this.listarVendedores();
    this.listarCaixoes();
    this.listarClientes();
    this.visibleDialogCadastroVendaCaixao = true;
  }

  public abrirDialogEditarVendaCaixao(vendaCaixao: VendaDeCaixao): void {
    this.visibleDialogEditarVendaCaixao = true;
    this.vendaDeCaixaoSelecionadaPelaEditar = vendaCaixao;
    this.listarCaixoes();
    this.listarVendedores();
  }

  public abrirDialogExcluirVendaCaixao(vendaCaixao: VendaDeCaixao): void {
    this.vendaDeCaixaoSelecionadaPelaExcluir = vendaCaixao;
    this.visibleDialogExcluirVendaCaixao = true;
  }

  public fecharDialogEditarVendaCaixao(): void {
    this.visibleDialogEditarVendaCaixao = false;
  }

  public fecharDialogExcluirVendaCaixao(): void {
    this.visibleDialogExcluirVendaCaixao = false;
  }

  public fecharDialogCadastroVendaCaixao(): void {
    this.visibleDialogCadastroVendaCaixao = false;
  }

  public cadastrarVendaDeCaixao(): void {
    this.carregandoCadastroDeCaixao = true;
    console.log(this.formularioCadastrarVendaDeCaixao);
    this.vendaDeCaixaoService
      .cadastrarVendaDeCaixao(this.formularioCadastrarVendaDeCaixao)
      .subscribe({
        error: () => {
          this.carregandoCadastroDeCaixao = false;
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao cadastrar Venda de Urna',
          });
        },
        next: () => {
          this.listarVendasDeCaixao();
          this.carregandoCadastroDeCaixao = false;
          this.fecharDialogCadastroVendaCaixao();
          this.messageService.add({
            severity: 'success',
            detail: 'Venda de Urna cadastrada com Sucesso',
          });
        },
      });
  }

  public editarVendaDeCaixao(): void {
    atribuirFormVendaDeCaixao(
      this.formularioEditarCaixao,
      this.vendaDeCaixaoSelecionadaPelaEditar,
      this.caixaoSelecionadoPelaEditar,
      this.vendedorSelecionadoPelaEditar
    );
    this.carregandoEdicaoDeVendaDeCaixao = true;
    if (this.vendaDeCaixaoSelecionadaPelaEditar.id) {
      this.vendaDeCaixaoService
        .atualizarVendaDeCaixao(
          this.formularioEditarCaixao.value,
          this.vendaDeCaixaoSelecionadaPelaEditar.id
        )
        .subscribe({
          error: () => {
            this.messageService.add({
              severity: 'error',
              detail: 'Erro ao Editar Venda de Urna',
            });
            this.carregandoEdicaoDeVendaDeCaixao = false;
            this.listarVendasDeCaixao();
          },
          next: () => {
            this.listarVendasDeCaixao();
            this.carregandoEdicaoDeVendaDeCaixao = false;
            this.fecharDialogEditarVendaCaixao();
            this.messageService.add({
              severity: 'success',
              detail: 'Urna Editada com Sucesso',
            });
          },
        });
    }
  }

  public deletarVendaDeCaixao(): void {
    this.carregandoExclusaoDeVendaDeCaixao = true;
    if (this.vendaDeCaixaoSelecionadaPelaExcluir.id) {
      this.vendaDeCaixaoService
        .deletarVendaDeCaixao(this.vendaDeCaixaoSelecionadaPelaExcluir.id)
        .subscribe({
          error: () => {
            this.messageService.add({
              severity: 'error',
              detail: 'Erro ao Excluir Venda de Urna',
            });
          },
          next: () => {
            this.listarVendasDeCaixao();
            this.fecharDialogExcluirVendaCaixao();
            this.carregandoExclusaoDeVendaDeCaixao = false;
            this.messageService.add({
              severity: 'success',
              detail: 'Urna Excluida com Sucesso',
            });
          },
        });
    }
  }

  public obterRelatorioDeVendasDeCaixao(): void {
    this.carregandoRelatorioMensalDeVendasDeCaixao = true;
    this.vendaDeCaixaoService
      .obterRelatorioDeVendasDeCaixao()
      .subscribe((relatorio: any) => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
        this.carregandoRelatorioMensalDeVendasDeCaixao = false;
      });
  }

  public listarClientes() {
    this.clienteService.listarClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
}
