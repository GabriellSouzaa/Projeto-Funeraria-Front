import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { NgIf } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TooltipModule } from 'primeng/tooltip';
import { VendedoresService } from '../shared/services/vendedores.service';
import { Vendedor } from '../shared/models/Vendedor.model';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendedorForm } from '../forms/Vendedor.form';
import { atribuirFormVendedor } from '../forms/EditarVendedor.form';
import { VendasDeVendedorService } from '../shared/services/vendas-de-vendedor.service';

@Component({
  selector: 'app-vendedores',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule, BreadcrumbComponent, NgIf, InputIconModule, IconFieldModule, TooltipModule, InputTextModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vendedores.component.html',
  styleUrl: './vendedores.component.css'
})
export class VendedoresComponent {

  constructor(private vendedoresService: VendedoresService, private vendasDeVendedorService: VendasDeVendedorService){}

  public vendedores: Vendedor[] = [];

  public carregandoVendedores: boolean = false;

  public visibleDialogAdicionarVendedor: boolean = false;

  public visibleDialogEditarVendedor: boolean = false;

  public visibleDialogExcluirVendedor: boolean = false;

  public carregandoCadastroVendedores: boolean = false;

  public formularioAdicionarVendedor: FormGroup = new FormGroup({});

  public formularioEditarVendedor: FormGroup = new FormGroup({});

  public carregandoEdicaoVendedores: boolean = false;

  public vendedorSelecionadoParaEditar: Vendedor = new Vendedor();

  public vendedorSelecionadoParaExcluir: Vendedor = new Vendedor();

  public carregandoExclusaoVendedores: boolean = false;

  public carregandoRelatorioMensalDeVendasPorVendedor: boolean = false;

  ngOnInit(){
    this.listarVendedores();
    this.formularioAdicionarVendedor = VendedorForm;
    this.formularioEditarVendedor = VendedorForm;
  }

  public listarVendedores(): void{
    this.carregandoVendedores = true;
    this.vendedoresService.listarVendedores().subscribe(vendedores => {
      this.vendedores = vendedores;
      this.carregandoVendedores = false;
    });
  }

  public abrirDialogAdicionarVendedor(): void{
    this.visibleDialogAdicionarVendedor = true;
  }

  public fecharDialogAdicionarVendedor(): void{
    this.visibleDialogAdicionarVendedor = false;
  }

  public abrirDialogEditarVendedor(vendedor: Vendedor): void{
    this.visibleDialogEditarVendedor = true;
    this.vendedorSelecionadoParaEditar = vendedor;
    atribuirFormVendedor(this.formularioEditarVendedor, vendedor);
  }	

  public fecharDialogEditarVendedor(): void{
    this.visibleDialogEditarVendedor = false;
  }

  public abrirDialogExcluirVendedor(vendedor: Vendedor): void{
    this.visibleDialogExcluirVendedor = true;
    this.vendedorSelecionadoParaExcluir = vendedor;
  }

  public fecharDialogExcluirVendedor(): void{
    this.visibleDialogExcluirVendedor = false;
  }

  public cadastrarVendedor(): void{
    this.carregandoCadastroVendedores = true;
    this.vendedoresService.criarVendedor(this.formularioAdicionarVendedor.value).subscribe(() => {
      this.listarVendedores();
      this.visibleDialogAdicionarVendedor = false;
      this.carregandoCadastroVendedores = false;
    });
  }

  public editarVendedor(): void{
    this.carregandoEdicaoVendedores = true;
    if(this.vendedorSelecionadoParaEditar.id){
      this.vendedoresService.atualizarVendedor(this.formularioEditarVendedor.value, this.vendedorSelecionadoParaEditar.id).subscribe(() => {
        this.listarVendedores();
        this.visibleDialogEditarVendedor = false;
        this.carregandoEdicaoVendedores = false;
      });
    }
  }

  public excluirVendedor(): void{
    this.carregandoExclusaoVendedores = true;
    if(this.vendedorSelecionadoParaExcluir.id){
      this.vendedoresService.deletarVendedor(this.vendedorSelecionadoParaExcluir.id).subscribe(() => {
        this.listarVendedores();
        this.visibleDialogExcluirVendedor = false;
        this.carregandoExclusaoVendedores = false;
      }, 
    () => {
      this.listarVendedores();
      this.carregandoExclusaoVendedores = false;
    }
    );
    }
  }

  public obterRelatorioMensalDeVendasPorVendedor(): void{
    this.carregandoRelatorioMensalDeVendasPorVendedor = true;
    this.vendasDeVendedorService.obterRelatorioMensalDeVendasPorVendedor().subscribe((relatorio: any) => {
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
      this.carregandoRelatorioMensalDeVendasPorVendedor = false;
    });
  }
}
