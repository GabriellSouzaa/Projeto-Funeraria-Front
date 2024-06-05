import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { PlanoDeSaudeService } from '../shared/services/plano-de-saude.service';
import { PlanoDeSaude } from '../shared/models/PlanoDeSaude.model';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanoDeSaudeForm } from '../forms/PlanoDeSaude.form';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { EditarPlanoDeSaudeForm, atribuirFormPlanoDeSaude } from '../forms/EditarPlanoDeSaude.form';

@Component({
  selector: 'app-planos-de-saude',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TableModule,
    ProgressSpinnerModule,
    NgIf,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  templateUrl: './planos-de-saude.component.html',
  styleUrl: './planos-de-saude.component.css',
})
export class PlanosDeSaudeComponent {
  constructor(private planoDeSaudeService: PlanoDeSaudeService) {}

  public planosDeSaude: PlanoDeSaude[] = [];

  public carregandoPlanosDeSaude: boolean = false;

  public visibleDialogAdicionarPlanoDeSaude: boolean = false;

  public visibleDialogEditarPlanoDeSaude: boolean = false;

  public visibleDialogExcluirPlanoDeSaude: boolean = false;

  public formularioAdicionarPlanoDeSaude: FormGroup = new FormGroup({});

  public carregandoAdicaoPlanoDeSaude: boolean = false;

  public carregandoEdicaoPlanoDeSaude: boolean = false;

  public carregandoExclusaoPlanoDeSaude: boolean = false;

  public planoDeSaudeParaEditar: PlanoDeSaude = new PlanoDeSaude();

  public planoDeSaudeParaExcluir: PlanoDeSaude = new PlanoDeSaude();

  public formularioEditarPlanoDeSaude: FormGroup = new FormGroup({}); 

  ngOnInit(): void {
    this.listarPlanosDeSaude();
    this.formularioAdicionarPlanoDeSaude = PlanoDeSaudeForm;
    this.formularioEditarPlanoDeSaude = EditarPlanoDeSaudeForm;
  }

  public listarPlanosDeSaude(): void {
    this.carregandoPlanosDeSaude = true;
    this.planoDeSaudeService
      .listarPlanosDeSaude()
      .subscribe((planosDeSaude: PlanoDeSaude[]) => {
        this.planosDeSaude = planosDeSaude;
        this.carregandoPlanosDeSaude = false;
      });
  }

  public abrirDialogAdicionarPlanoDeSaude(): void {
    this.visibleDialogAdicionarPlanoDeSaude = true;
  }

  public fecharDialogAdicionarPlanoDeSaude(): void {
    this.visibleDialogAdicionarPlanoDeSaude = false;
  }

  public abrirDialogEditarPlanoDeSaude(planoDeSaude: PlanoDeSaude): void{
    this.visibleDialogEditarPlanoDeSaude = true;
    this.planoDeSaudeParaEditar = planoDeSaude;
    atribuirFormPlanoDeSaude(this.formularioEditarPlanoDeSaude, planoDeSaude);
  }

  public fecharDialogEditarPlanoDeSaude(): void{
    this.visibleDialogEditarPlanoDeSaude = false;
  }

  public abrirDialogExcluirPlanoDeSaude(planoDeSaude: PlanoDeSaude): void{
    this.visibleDialogExcluirPlanoDeSaude = true;
    this.planoDeSaudeParaExcluir = planoDeSaude;
  }

  public fecharDialogExcluirPlanoDeSaude(): void{
    this.visibleDialogExcluirPlanoDeSaude = false;
  }

  public adicionarPlanoDeSaude(): void {
    this.carregandoPlanosDeSaude = true;
    this.planoDeSaudeService
      .criarPlanoDeSaude(this.formularioAdicionarPlanoDeSaude.value)
      .subscribe(() => {
        this.listarPlanosDeSaude();
        this.fecharDialogAdicionarPlanoDeSaude();
        this.carregandoPlanosDeSaude = false;
        this.formularioAdicionarPlanoDeSaude.reset();
      });
  }

  public editarPlanoDeSaude(): void{
    this.carregandoPlanosDeSaude = true;
    if(this.planoDeSaudeParaEditar.id){
      this.planoDeSaudeService
        .atualizarPlanoDeSaude(this.formularioEditarPlanoDeSaude.value, this.planoDeSaudeParaEditar.id)
        .subscribe(() => {
          this.listarPlanosDeSaude();
          this.fecharDialogEditarPlanoDeSaude();
          this.carregandoPlanosDeSaude = false;
        });
    }
  }

  public excluirPlanoDeSaude(): void{
    this.carregandoPlanosDeSaude = true;
    if(this.planoDeSaudeParaExcluir.id){
      this.planoDeSaudeService
        .deletarPlanoDeSaude(this.planoDeSaudeParaExcluir.id)
        .subscribe(() => {
          this.listarPlanosDeSaude();
          this.fecharDialogExcluirPlanoDeSaude();
          this.carregandoPlanosDeSaude = false;
        });
    }
  }

  
}
