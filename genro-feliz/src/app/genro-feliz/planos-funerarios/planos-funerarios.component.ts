import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PlanoFunerarioService } from '../shared/services/plano-funerario.service';
import { PlanoFunerario } from '../shared/models/PlanoFunerario.model';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanoFunerarioForm } from '../forms/PlanoFunerario.form';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-planos-funerarios',
  standalone: true,
  imports: [TableModule, DialogModule, ReactiveFormsModule, TooltipModule, FormsModule],
  templateUrl: './planos-funerarios.component.html',
  styleUrl: './planos-funerarios.component.css'
})
export class PlanosFunerariosComponent {

  constructor(private planoFunerarioService: PlanoFunerarioService){}

  public visibleDialogCadastrarPlanoFunerario: boolean = false;

  public visibleDialogExcluirPlanoFunerario: boolean = false;

  public visibleDialogCadastrarPlanoFunerarioParaClienteComBeneficiarios: boolean = false;

  public planoFunerarioParaRemover: PlanoFunerario = new PlanoFunerario();

  public planosFunerarios: PlanoFunerario[] = [];

  public planoFunerarioParaCadastrarForm: FormGroup  = PlanoFunerarioForm;

  public planoFunerarioParaEditar: PlanoFunerario = new PlanoFunerario();

  public visibleDialogEditarPlanoFunerario: boolean = false;  

  ngOnInit() {
    this.listarPlanosFunerarios();
  }

  
  public listarPlanosFunerarios(): void {
    this.planoFunerarioService.listarPlanosFunerarios().subscribe(
      (planosFunerarios: PlanoFunerario[]) => {
        this.planosFunerarios = planosFunerarios;
      },
      (error) => {
        console.log('Erro ao listar planos funerários')
      }
    );
  }

  public abrirDialogCadastrarPlanoFunerario(): void {
    this.visibleDialogCadastrarPlanoFunerario = true;
  }

  public fecharDialogCadastrarPlanoFunerario(): void{
    this.visibleDialogCadastrarPlanoFunerario = false;
  }

  public abrirDialogEditarPlanoFunerario(planoFunerario: PlanoFunerario): void {
    this.visibleDialogEditarPlanoFunerario = true;
    this.planoFunerarioParaEditar = planoFunerario;
  }

  public fecharDialogEditarPlanoFunerario(): void {
    this.visibleDialogEditarPlanoFunerario = false;
  }

  public abrirDialogExcluirPlanoFunerario(planoFunerario: PlanoFunerario): void {
    this.planoFunerarioParaRemover = planoFunerario;
    this.visibleDialogExcluirPlanoFunerario = true;
  }

  public abrirDialogCadastrarPlanoFunerarioParaClientesComBeneficiarios(): void{
    this.visibleDialogCadastrarPlanoFunerarioParaClienteComBeneficiarios = true;
  }

  public fecharDialogCadastrarPlanoFunerarioParaClientesComBeneficiarios(): void{
    this.visibleDialogCadastrarPlanoFunerarioParaClienteComBeneficiarios = false;
  }

  public fecharDialogExcluirPlanoFunerario(): void {
    this.visibleDialogExcluirPlanoFunerario = false;
  }

  public salvarPlanoFunerario(): void {
    console.log(this.planoFunerarioParaCadastrarForm.value)
    this.planoFunerarioService.criarPlanoFunerario(this.planoFunerarioParaCadastrarForm.value).subscribe(() => {
      this.listarPlanosFunerarios();
      this.fecharDialogCadastrarPlanoFunerario();
    })
  }

  public excluirPlanoFunerario(): void{
    if(this.planoFunerarioParaRemover.id){
      this.planoFunerarioService.removerPlanoFunerario(this.planoFunerarioParaRemover.id).subscribe(() => {
        this.listarPlanosFunerarios();
        this.fecharDialogExcluirPlanoFunerario();
      })
    }
    
  }

  public editarPlanoFunerario(): void {
    if(this.planoFunerarioParaEditar.id){
      this.planoFunerarioService.atualizarPlanoFunerario(this.planoFunerarioParaEditar, this.planoFunerarioParaEditar.id).subscribe(() => {
        this.listarPlanosFunerarios();
        this.fecharDialogEditarPlanoFunerario();
      })
    }
  }



}
