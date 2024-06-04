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

@Component({
  selector: 'app-vendedores',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule, BreadcrumbComponent, NgIf, InputIconModule, IconFieldModule, TooltipModule, InputTextModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vendedores.component.html',
  styleUrl: './vendedores.component.css'
})
export class VendedoresComponent {

  constructor(private vendedoresService: VendedoresService){}

  public vendedores: Vendedor[] = [];

  public carregandoVendedores: boolean = false;

  public visibleDialogAdicionarVendedor: boolean = false;

  public carregandoCadastroVendedores: boolean = false;

  public formularioAdicionarVendedor: FormGroup = new FormGroup({});

  ngOnInit(){
    this.listarVendedores();
    this.formularioAdicionarVendedor = VendedorForm;
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

  public cadastrarVendedor(): void{
    this.carregandoCadastroVendedores = true;
    this.vendedoresService.criarVendedor(this.formularioAdicionarVendedor.value).subscribe(() => {
      this.listarVendedores();
      this.visibleDialogAdicionarVendedor = false;
      this.carregandoCadastroVendedores = false;
    });
  }
}
