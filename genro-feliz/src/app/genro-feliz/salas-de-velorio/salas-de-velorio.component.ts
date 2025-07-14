import { Component } from '@angular/core';
import { SalaDeVelorio } from '../shared/models/SalaDeVelorio.model';
import { SalasDeVelorioService } from '../shared/services/salas-de-velorio.service';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SalaDeVelorioForm } from '../forms/SalaDeVelorio.form';
import { EditarSalaDeVelorioForm, atribuirForm } from '../forms/EditarSalaDeVelorio.form';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';
import { SalasDeVelorioMaisUsadasService } from '../shared/services/salas-de-velorio-mais-usadas.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-salas-de-velorio',
  standalone: true,
  imports: [TableModule, SideNavComponent,TooltipModule, MessagesModule,ToastModule,  DialogModule, ReactiveFormsModule, ProgressSpinnerModule, NgIf, BreadcrumbComponent],
  templateUrl: './salas-de-velorio.component.html',
  providers: [MessageService],
  styleUrl: './salas-de-velorio.component.css'
})
export class SalasDeVelorioComponent {

  constructor(private salaDeVelorioService: SalasDeVelorioService, private messageService: MessageService,  private salasDeVelorioMaisUsadas: SalasDeVelorioMaisUsadasService) { }

  public salasDeVelorio: SalaDeVelorio[] = [];

  public visibleDialogAdicionarSalaDeVelorio: boolean = false;

  public formularioAdicionarSalaDeVelorio: FormGroup = new FormGroup({});

  public visibleDialogEditarSalaDeVelorio: boolean = false;

  public formularioEditarSalaDeVelorio: FormGroup = new FormGroup({});

  public salaDeVelorioParaEditar: SalaDeVelorio = new SalaDeVelorio();

  public salaDeVelorioParaRemover: SalaDeVelorio = new SalaDeVelorio();

  public visibleDialogRemoverSalaDeVelorio: boolean = false;

  public carregandoSalasDeVelorio: boolean = false;

  public carregandoCadastroDeSalasDeVelorio: boolean = false;

  public carregandoEdicaoDeSalasDeVelorio: boolean = false;

  public carregandoExclusaoDeSalasDeVelorio: boolean = false;

  public carregandoRelatorioDasSalasDeVelorioMaisUsadas: boolean = false;

  ngOnInit(): void {
    this.listarSalasDeVelorio();
    this.formularioAdicionarSalaDeVelorio = SalaDeVelorioForm;
    this.formularioEditarSalaDeVelorio = EditarSalaDeVelorioForm;
  }

  public listarSalasDeVelorio(): void{
    this.carregandoSalasDeVelorio = true;
     this.salaDeVelorioService.listarSalasDeVelorio().subscribe(salasDeVelorio => {
       this.salasDeVelorio = salasDeVelorio;
        this.carregandoSalasDeVelorio = false;
     });
  }

  public abrirDialogAdicionarSalaDeVelorio(): void{
    this.visibleDialogAdicionarSalaDeVelorio = true;
  }

  public fecharDialogAdicionarSalaDeVelorio(): void{
    this.visibleDialogAdicionarSalaDeVelorio = false;
  }

  public abrirDialogExcluirSalaDeVelorio(sala: SalaDeVelorio): void{
    this.salaDeVelorioParaRemover = sala;
    this.visibleDialogRemoverSalaDeVelorio = true;
  }

  public fecharDialogExcluirSalaDeVelorio(): void{
    this.visibleDialogRemoverSalaDeVelorio = false;
  }

  public abrirDialogEditarSalaDeVelorio(salaDeVelorio: SalaDeVelorio): void{
    atribuirForm(salaDeVelorio);
    this.visibleDialogEditarSalaDeVelorio = true;
    this.salaDeVelorioParaEditar = salaDeVelorio;
  }

  public fecharDialogEditarSalaDeVelorio(): void{
    this.visibleDialogEditarSalaDeVelorio = false;
  }

  public adicionarSalaDeVelorio(): void{
    this.carregandoCadastroDeSalasDeVelorio = true;
    const salaDeVelorio: SalaDeVelorio = this.formularioAdicionarSalaDeVelorio.value;
    this.salaDeVelorioService.criarSalaDeVelorio(salaDeVelorio).subscribe({
      error: () => {
        this.messageService.add({severity: 'error', detail: 'Erro ao cadastrar Sala de Velorio'})
        this.listarSalasDeVelorio();
      this.fecharDialogAdicionarSalaDeVelorio();
      this.carregandoCadastroDeSalasDeVelorio = false;
      },
      next: () => {
        this.listarSalasDeVelorio();
        this.fecharDialogAdicionarSalaDeVelorio();
        this.carregandoCadastroDeSalasDeVelorio = false;
        this.messageService.add({severity: 'success', detail: 'Sala cadastrada com Sucesso'})
      }
    })

  }

  public editarSalaDeVelorio(): void{
    this.carregandoEdicaoDeSalasDeVelorio = true;
    const salaDeVelorio: SalaDeVelorio = this.formularioEditarSalaDeVelorio.value;
    salaDeVelorio.id = this.salaDeVelorioParaEditar.id;
    if(salaDeVelorio.id){
      this.salaDeVelorioService.editarSalaDeVelorio(salaDeVelorio.id, salaDeVelorio).subscribe({
        error: () => {
          this.messageService.add({severity: 'error', detail: 'Erro ao editar Sala de Velorio'})
          this.fecharDialogEditarSalaDeVelorio();
          this.carregandoEdicaoDeSalasDeVelorio = false;
        },
        next: () => {
          this.listarSalasDeVelorio();
          this.fecharDialogEditarSalaDeVelorio();
          this.carregandoEdicaoDeSalasDeVelorio = false;
          this.messageService.add({severity: 'success', detail: 'Sala editada com Sucesso'})
        }
      })
    }

  }

  public removerSalaDeVelorio(): void{
    this.carregandoExclusaoDeSalasDeVelorio = true;
    if(this.salaDeVelorioParaRemover.id){
      this.salaDeVelorioService.removerSalaDeVelorio(this.salaDeVelorioParaRemover.id).subscribe({
        error: () => {
          this.messageService.add({severity: 'error', detail: 'Erro ao Excluir Sala de Velorio'})
          this.fecharDialogExcluirSalaDeVelorio();
        this.listarSalasDeVelorio();
        this.carregandoExclusaoDeSalasDeVelorio = false;
        },
        next: () => {
          this.listarSalasDeVelorio();
        this.fecharDialogExcluirSalaDeVelorio();
        this.listarSalasDeVelorio();
        this.carregandoExclusaoDeSalasDeVelorio = false;
          this.messageService.add({severity: 'success', detail: 'Sala excluida com Sucesso'})
        }})

    }

  }

  public obterRelatorioDasSalasDeVelorioMaisUsadas(): void{
    this.carregandoRelatorioDasSalasDeVelorioMaisUsadas = true;
    this.salasDeVelorioMaisUsadas.obterRelatorioDasSalasDeVelorioMaisUsadas().subscribe((relatorio: any) => {
      const blob = new Blob([relatorio], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      this.carregandoRelatorioDasSalasDeVelorioMaisUsadas = false;
    });
  }



}
