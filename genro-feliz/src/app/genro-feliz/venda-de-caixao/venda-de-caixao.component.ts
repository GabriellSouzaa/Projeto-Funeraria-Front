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
import { EditarVendaDeCaixaoForm, atribuirFormVendaDeCaixao } from '../forms/EditarVendaDeCaixao.form';

@Component({
  selector: 'app-venda-de-caixao',
  standalone: true,
  imports: [
    TableModule,
    ProgressSpinnerModule,
    BreadcrumbComponent,
    NgIf,
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    TooltipModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './venda-de-caixao.component.html',
  styleUrl: './venda-de-caixao.component.css',
})
export class VendaDeCaixaoComponent {
  constructor(
    private vendaDeCaixaoService: VendaDeCaixaoService,
    private vendedoresService: VendedoresService,
    private caixaoService: CaixaoService
  ) {}

  public vendasDeCaixao: VendaDeCaixao[] = [];

  public carregandoListasDeCaixao: boolean = false;

  public carregandoCadastroDeCaixao: boolean = false;

  public formularioCadastrarCaixao: FormGroup = new FormGroup({});

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

  public vendaDeCaixaoSelecionadaPelaEditar: VendaDeCaixao = new VendaDeCaixao();

  public vendaDeCaixaoSelecionadaPelaExcluir: VendaDeCaixao = new VendaDeCaixao();

  public carregandoEdicaoDeVendaDeCaixao: boolean = false;

  public carregandoExclusaoDeVendaDeCaixao: boolean = false;

  ngOnInit() {
    this.listarVendasDeCaixao();
    this.formularioCadastrarCaixao = VendaDeCaixaoForm;
    this.formularioEditarCaixao = EditarVendaDeCaixaoForm;
  }

  public listarVendasDeCaixao(): void {
    this.carregandoListasDeCaixao = true;
    this.vendaDeCaixaoService.listarVendasDeCaixao().subscribe((vendas) => {
      this.vendasDeCaixao = vendas;
      this.carregandoListasDeCaixao = false;
    });
  }

  public listarVendedores(): void{
    this.vendedoresService.listarVendedores().subscribe(vendedores => {
      this.vendedores = vendedores;
    })
  }

  public listarCaixoes(): void{
    this.caixaoService.listarCaixoes().subscribe(caixoes => {
      this.caixoes = caixoes;
    })
  }

  public abrirDialogCadastroVendaCaixao(): void {
    this.listarVendedores();
    this.listarCaixoes();
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
    this.formularioCadastrarCaixao.reset();
  }

  public cadastrarVendaDeCaixao(): void {
    this.carregandoCadastroDeCaixao = true;
    this.vendaDeCaixaoService
      .cadastrarVendaDeCaixao(this.formularioCadastrarCaixao.value)
      .subscribe(() => {
        this.listarVendasDeCaixao();
        this.carregandoCadastroDeCaixao = false;
        this.fecharDialogCadastroVendaCaixao();
      });
  }

  public selecionaVendedor(){
    this.formularioCadastrarCaixao.get('seller.id')?.setValue(this.vendedorSelecionado.id);
    this.formularioCadastrarCaixao.get('seller.nome')?.setValue(this.vendedorSelecionado.nome);
    this.formularioCadastrarCaixao.get('seller.cargo')?.setValue(this.vendedorSelecionado.cargo);
  }

  public selecionaCaixao(){
    this.formularioCadastrarCaixao.get('coffin.id')?.setValue(this.caixaoSelecionado.id);
    this.formularioCadastrarCaixao.get('coffin.material')?.setValue(this.caixaoSelecionado.material);
    this.formularioCadastrarCaixao.get('coffin.cor')?.setValue(this.caixaoSelecionado.cor);
    this.formularioCadastrarCaixao.get('coffin.comprimento')?.setValue(this.caixaoSelecionado.comprimento);
    this.formularioCadastrarCaixao.get('coffin.modelo')?.setValue(this.caixaoSelecionado.modelo);
    this.formularioCadastrarCaixao.get('coffin.preco')?.setValue(this.caixaoSelecionado.preco);
  }

  public editarVendaDeCaixao(): void {
    atribuirFormVendaDeCaixao(this.formularioEditarCaixao, this.vendaDeCaixaoSelecionadaPelaEditar, this.caixaoSelecionadoPelaEditar, this.vendedorSelecionadoPelaEditar);
    this.carregandoEdicaoDeVendaDeCaixao = true;
    if(this.vendaDeCaixaoSelecionadaPelaEditar.id){
      this.vendaDeCaixaoService
      .atualizarVendaDeCaixao(this.formularioEditarCaixao.value, this.vendaDeCaixaoSelecionadaPelaEditar.id)
      .subscribe(() => {
        this.listarVendasDeCaixao();
        this.carregandoEdicaoDeVendaDeCaixao = false;
        this.fecharDialogEditarVendaCaixao();
      });
    }else{
      console.error('Erro ao editar venda de caixão, id não encontrado');
    }
  }

  public deletarVendaDeCaixao(): void {
    this.carregandoExclusaoDeVendaDeCaixao = true;
    if(this.vendaDeCaixaoSelecionadaPelaExcluir.id){
      this.vendaDeCaixaoService
      .deletarVendaDeCaixao(this.vendaDeCaixaoSelecionadaPelaExcluir.id)
      .subscribe(() => {
        this.listarVendasDeCaixao();
        this.fecharDialogExcluirVendaCaixao();
        this.carregandoExclusaoDeVendaDeCaixao = false;
      });
    }
  }

 
}
