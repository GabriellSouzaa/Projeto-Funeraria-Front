import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Caixao } from '../shared/models/Caixao.model';
import { CaixaoService } from '../shared/services/caixao.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import {FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CaixaoForm } from '../forms/Caixao.form';
import { EditarCaixaoForm, atribuirForm } from '../forms/EditarCaixao.form';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-caixao',
  standalone: true,
  imports: [TableModule, TooltipModule, DialogModule, ReactiveFormsModule, IconFieldModule, InputIconModule, InputTextModule, ProgressSpinnerModule, NgIf],
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

  public carregandoCaixoes: boolean = false;

  public carregandoCadastroCaixoes: boolean = false;
  
  public carregandoEdicaoCaixoes: boolean = false;

  public carregandoExclusaoCaixoes: boolean = false;

  constructor(private caixaoService: CaixaoService) { }

  ngOnInit(): void {
    this.listarCaixoes();
    this.formularioCadastrarCaixao = CaixaoForm;     
    this.formularioEditarCaixao = EditarCaixaoForm; 
  }

  public listarCaixoes(): void {
    this.carregandoCaixoes = true;
     this.caixaoService.listarCaixoes().subscribe((caixoes: Caixao[]) => {
      this.caixoes = caixoes;
      this.carregandoCaixoes = false;
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
    this.carregandoExclusaoCaixoes = true;
    if(this.caixaoParaExcluir?.id){
      this.caixaoService.excluirCaixao(this.caixaoParaExcluir.id).subscribe(() => {
        this.listarCaixoes();
        this.fecharDialogExcluirCaixao();
        this.carregandoExclusaoCaixoes = false;
      });
    }
  }

  public cadastrarCaixao(): void{
    this.carregandoCadastroCaixoes = true;
    this.caixaoService.cadastrarCaixao(this.formularioCadastrarCaixao.value).subscribe(() => {
      this.listarCaixoes();
      this.fecharDialogCadastrarCaixao();
      this.carregandoCadastroCaixoes = false;
    });
  }

  public editarCaixao(): void{
    this.carregandoEdicaoCaixoes = true;
    this.caixaoService.editarCaixao(this.formularioEditarCaixao.value).subscribe(() => {
      this.listarCaixoes();
      this.fecharDialogEditarCaixao();
      this.carregandoEdicaoCaixoes = false;
    });
  }



}
