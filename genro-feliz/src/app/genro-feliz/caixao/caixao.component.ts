import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Caixao } from '../shared/models/Caixao.model';
import { CaixaoService } from '../shared/services/caixao.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import {FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CaixaoForm } from '../forms/Caixao.form';
import { EditarCaixaoForm, atribuirForm } from '../forms/EditarCaixao.form';



@Component({
  selector: 'app-caixao',
  standalone: true,
  imports: [TableModule, TooltipModule, DialogModule, ReactiveFormsModule],
  templateUrl: './caixao.component.html',
  styleUrl: './caixao.component.css'
})
export class CaixaoComponent {

  public caixoes: Caixao[] = [];

  public caixaoParaExcluir: Caixao | undefined;

  public visibleDialogExcluirCaixao: boolean = false;

  public visibleDialogCadastrarCaixao: boolean = false;

  public visibleDialogEditarCaixao: boolean = false;

  public caixaoSelecionadoParaEditar: Caixao = new Caixao();

  public formularioCadastrarCaixao: FormGroup = new FormGroup({});

  public formularioEditarCaixao: FormGroup = new FormGroup({});

  constructor(private caixaoService: CaixaoService) { }

  ngOnInit(): void {
    this.listarCaixoes();
    this.formularioCadastrarCaixao = CaixaoForm;     
    this.formularioEditarCaixao = EditarCaixaoForm; 
  }

  public listarCaixoes(): void {
     this.caixaoService.listarCaixoes().subscribe((caixoes: Caixao[]) => {
      this.caixoes = caixoes;
     });
  }

  public exibirDialogExcluirCaixao(caixao: Caixao): void {
    this.visibleDialogExcluirCaixao = true;
    this.caixaoParaExcluir = caixao;
  }

  public fecharDialogExcluirCaixao(): void {
    this.visibleDialogExcluirCaixao = false;
  }

  public exibirDialogCadastrarCaixao(): void {
    this.visibleDialogCadastrarCaixao = true;
  }

  public fecharDialogCadastrarCaixao(): void {
    this.visibleDialogCadastrarCaixao = false;
    this.formularioCadastrarCaixao.reset();
  }

  public exibirDialogEditarCaixao(caixao: Caixao): void {
    this.caixaoSelecionadoParaEditar = caixao;
    atribuirForm(this.formularioEditarCaixao, caixao);
    this.visibleDialogEditarCaixao = true;
  }

  public fecharDialogEditarCaixao(): void {
    this.visibleDialogEditarCaixao = false;
  }

  public excluirCaixao(): void{
    if(this.caixaoParaExcluir?.id){
      this.caixaoService.excluirCaixao(this.caixaoParaExcluir.id).subscribe(() => {
        this.listarCaixoes();
        this.fecharDialogExcluirCaixao();
      });
    }
  }

  public cadastrarCaixao(): void{
    this.caixaoService.cadastrarCaixao(this.formularioCadastrarCaixao.value).subscribe(() => {
      this.listarCaixoes();
      this.fecharDialogCadastrarCaixao();
    });
  }

  public editarCaixao(): void{
    this.caixaoService.editarCaixao(this.formularioEditarCaixao.value).subscribe(() => {
      this.listarCaixoes();
      this.fecharDialogEditarCaixao();
    });
  }



}
