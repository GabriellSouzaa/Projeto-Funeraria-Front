import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Caixao } from '../shared/models/Caixao.model';
import { CaixaoService } from '../shared/services/caixao.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-caixao',
  standalone: true,
  imports: [TableModule, TooltipModule, DialogModule],
  templateUrl: './caixao.component.html',
  styleUrl: './caixao.component.css'
})
export class CaixaoComponent {

  public caixoes: Caixao[] = [];

  public caixaoParaExcluir: Caixao | undefined;

  public visibleDialogExcluirCaixao: boolean = false;

  constructor(private caixaoService: CaixaoService) { }

  ngOnInit(): void {
    this.listarCaixoes();
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

  public excluirCaixao(): void{
    if(this.caixaoParaExcluir?.id){
      this.caixaoService.excluirCaixao(this.caixaoParaExcluir.id).subscribe(() => {
        this.listarCaixoes();
        this.fecharDialogExcluirCaixao();
      });
    }
  }

}
