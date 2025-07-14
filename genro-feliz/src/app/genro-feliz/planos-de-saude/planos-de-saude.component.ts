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
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { OpenAiService } from '../shared/services/open-ai.service';

@Component({
  selector: 'app-planos-de-saude',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    TableModule,
    ToastModule,
    MessagesModule,
    ProgressSpinnerModule,
    NgIf,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    SideNavComponent
  ],
  templateUrl: './planos-de-saude.component.html',
  styleUrl: './planos-de-saude.component.css',
  providers: [MessageService]
})
export class PlanosDeSaudeComponent {
  constructor(private planoDeSaudeService: PlanoDeSaudeService, private openAiService: OpenAiService, private messageService: MessageService) {}

  public message: string = '';
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
      .subscribe({
        error: () => {
          this.messageService.add({severity: 'error', detail: 'Erro ao cadastrar o Plano de Saude'})
          this.listarPlanosDeSaude();
        this.fecharDialogAdicionarPlanoDeSaude();
        this.carregandoPlanosDeSaude = false;
        },
        next: () => {
          this.listarPlanosDeSaude();
        this.fecharDialogAdicionarPlanoDeSaude();
        this.carregandoPlanosDeSaude = false;
        this.formularioAdicionarPlanoDeSaude.reset();
          this.messageService.add({severity: 'success', detail: 'Plano de Saude adicionado com Sucesso'})
        }
      });
  }

  public chat(message: string){
    this.openAiService.chat(message).subscribe({
      error: () => {
        this.messageService.add({severity: 'error', detail: 'Erro ao gerar mensagem'})
      },

      next: () => {
        this.messageService.add({severity: 'success', detail: 'Mensagem gerada com sucesso'})
      }
    })
  }

  public editarPlanoDeSaude(): void{
    this.carregandoPlanosDeSaude = true;
    if(this.planoDeSaudeParaEditar.id){
      this.planoDeSaudeService
        .atualizarPlanoDeSaude(this.formularioEditarPlanoDeSaude.value, this.planoDeSaudeParaEditar.id)
        .subscribe(
          {
            error: () => {
              this.messageService.add({severity: 'error', detail: 'Erro ao editar Plano de Saude'})
              this.listarPlanosDeSaude();
          this.fecharDialogEditarPlanoDeSaude();
          this.carregandoPlanosDeSaude = false;
            },
            next: () => {
              this.listarPlanosDeSaude();
              this.fecharDialogEditarPlanoDeSaude();
              this.carregandoPlanosDeSaude = false;
              this.messageService.add({severity: 'success', detail: 'Plano de Saude editado com Sucesso'})
            }
          }
          );
    }
  }

  public excluirPlanoDeSaude(): void{
    this.carregandoPlanosDeSaude = true;
    if(this.planoDeSaudeParaExcluir.id){
      this.planoDeSaudeService
        .deletarPlanoDeSaude(this.planoDeSaudeParaExcluir.id)
        .subscribe(
          {
            error: () => {
              this.messageService.add({severity: 'error', detail: 'Erro ao excluir Plano de Saude'})
              this.listarPlanosDeSaude();
          this.fecharDialogExcluirPlanoDeSaude();
          this.carregandoPlanosDeSaude = false;
            },
            next: () => {
              this.listarPlanosDeSaude();
          this.fecharDialogExcluirPlanoDeSaude();
          this.carregandoPlanosDeSaude = false;
              this.messageService.add({severity: 'success', detail: 'Plano de Saude excluido com Sucesso'})
            }
          }
         );
    }
  }


}
