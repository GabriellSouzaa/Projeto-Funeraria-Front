import { Component } from '@angular/core';
import { BeneficiarioService } from '../shared/services/beneficiario.service';
import { TableModule } from 'primeng/table';
import { Beneficiarios } from '../shared/models/Beneficiarios.model';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Cliente } from '../shared/models/Cliente.model';
import { ClienteService } from '../shared/services/cliente.service';
import { FormsModule } from '@angular/forms';
import { BeneficiarioForm } from '../forms/Beneficiario.form';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';





@Component({
  selector: 'app-beneficiarios',
  standalone: true,
  imports: [TableModule, SideNavComponent, TooltipModule, DialogModule, DropdownModule, FormsModule, IconFieldModule, InputIconModule, InputTextModule, ProgressSpinnerModule, NgIf],
  templateUrl: './beneficiarios.component.html',
  styleUrl: './beneficiarios.component.css'
})
export class BeneficiariosComponent {

  constructor(private beneficiarioService: BeneficiarioService, private clienteService: ClienteService) { }

  public beneficiarios: Beneficiarios[] = [];

  public visibleDialogCadastrarBeneficiario: boolean = false;

  public visibleDialogEditarBeneficiario: boolean = false;

  public visibleDialogExcluirBeneficiario: boolean = false;

  public clientes: Cliente[] = [];

  public formularioCadastrarBeneficiario: BeneficiarioForm = new BeneficiarioForm();

  public formularioEditarBeneficiario: BeneficiarioForm = new BeneficiarioForm();

  public beneficiarioParaEditar: Beneficiarios = new Beneficiarios();

  public novoTitularDoBeneficiarioEditado: Cliente = new Cliente();

  public beneficiarioParaExcluir: Beneficiarios = new Beneficiarios();

  public carregandoBeneficiarios: boolean = false;

  public carregandoCadastroDeBeneficiario: boolean = false;

  public carregandoEdicaoDeBeneficiario: boolean = false;

  public carregandoExclusaoDeBeneficiario: boolean = false;

  ngOnInit(): void {
    this.listarBeneficiarios();
  }

  public listarBeneficiarios(): void{
    this.carregandoBeneficiarios = true;
    this.beneficiarioService.listarBeneficiarios().subscribe(beneficiarios => {
      this.beneficiarios = beneficiarios;
      this.carregandoBeneficiarios = false;
    });
  }

  public abrirDialogCadastrarBeneficiario(): void{
    this.visibleDialogCadastrarBeneficiario = true;
    this.listarClientes();
  }

  public fecharDialogCadastrarBeneficiario(): void{
    this.visibleDialogCadastrarBeneficiario = false;
  }

  public abrirDialogEditarBeneficiario(beneficiario: Beneficiarios): void{
    this.listarClientes();
    this.beneficiarioParaEditar = beneficiario;
    this.formularioEditarBeneficiario.client = this.novoTitularDoBeneficiarioEditado;
    this.formularioEditarBeneficiario.nome = beneficiario.nomeBeneficiario;
    this.formularioEditarBeneficiario.dataNascimento = beneficiario.dataNascimento;
    this.formularioEditarBeneficiario.adicional = beneficiario.adicional;
    this.visibleDialogEditarBeneficiario = true;

  }

  public fecharDialogEditarBeneficiario(): void{
    this.visibleDialogEditarBeneficiario = false;
  }

  public abrirDialogExcluirBeneficiario(beneficiario: Beneficiarios): void{
    this.visibleDialogExcluirBeneficiario = true;
    this.beneficiarioParaExcluir = beneficiario;
  }

  public fecharDialogExcluirBeneficiario(): void{
    this.visibleDialogExcluirBeneficiario = false;
  }

  public listarClientes(): void{
    this.clienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  public cadastrarBeneficiario(): void{
    this.carregandoCadastroDeBeneficiario = true;
    this.beneficiarioService.cadastrarBeneficiario(this.formularioCadastrarBeneficiario).subscribe(() => {
      this.listarBeneficiarios();
      this.fecharDialogCadastrarBeneficiario();
      this.carregandoCadastroDeBeneficiario = false;
    });
  }

  public editarBeneficiario(): void{
    this.carregandoEdicaoDeBeneficiario = true;
    if(this.beneficiarioParaEditar.id){
      this.beneficiarioService.editarBeneficiario(this.beneficiarioParaEditar.id, this.formularioEditarBeneficiario).subscribe(() => {
        this.listarBeneficiarios();
        this.fecharDialogEditarBeneficiario();
        this.carregandoEdicaoDeBeneficiario = false;
      });
    }
  }

  public excluirBeneficiario(): void{
    this.carregandoExclusaoDeBeneficiario = true;
    if(this.beneficiarioParaExcluir.id){
      this.beneficiarioService.excluirBeneficiario(this.beneficiarioParaExcluir.id).subscribe(() => {
        this.listarBeneficiarios();
        this.fecharDialogExcluirBeneficiario();
        this.carregandoExclusaoDeBeneficiario = false;
      });
    }
  }

}
