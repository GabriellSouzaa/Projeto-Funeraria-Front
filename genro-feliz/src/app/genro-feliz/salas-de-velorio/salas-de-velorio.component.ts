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


@Component({
  selector: 'app-salas-de-velorio',
  standalone: true,
  imports: [TableModule, TooltipModule, DialogModule, ReactiveFormsModule, ProgressSpinnerModule, NgIf],
  templateUrl: './salas-de-velorio.component.html',
  styleUrl: './salas-de-velorio.component.css'
})
export class SalasDeVelorioComponent {

  constructor(private salaDeVelorioService: SalasDeVelorioService) { }

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
    this.salaDeVelorioService.criarSalaDeVelorio(salaDeVelorio).subscribe(() => {
      this.listarSalasDeVelorio();
      this.fecharDialogAdicionarSalaDeVelorio();
      this.carregandoCadastroDeSalasDeVelorio = false;
    });
  }

  public editarSalaDeVelorio(): void{
    this.carregandoEdicaoDeSalasDeVelorio = true;
    const salaDeVelorio: SalaDeVelorio = this.formularioEditarSalaDeVelorio.value;
    salaDeVelorio.id = this.salaDeVelorioParaEditar.id;
    if(salaDeVelorio.id){
      this.salaDeVelorioService.editarSalaDeVelorio(salaDeVelorio.id, salaDeVelorio).subscribe(() => {
        this.listarSalasDeVelorio();
        this.fecharDialogEditarSalaDeVelorio();
        this.carregandoEdicaoDeSalasDeVelorio = false;
      });
    }
    
  }

  public removerSalaDeVelorio(): void{
    this.carregandoExclusaoDeSalasDeVelorio = true;
    if(this.salaDeVelorioParaRemover.id){
      this.salaDeVelorioService.removerSalaDeVelorio(this.salaDeVelorioParaRemover.id).subscribe(() => {
        this.listarSalasDeVelorio();
        this.fecharDialogExcluirSalaDeVelorio();
        this.listarSalasDeVelorio();  
        this.carregandoExclusaoDeSalasDeVelorio = false;
      });
    }
    
  }



}
