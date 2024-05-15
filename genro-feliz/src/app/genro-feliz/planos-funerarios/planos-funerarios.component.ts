import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PlanoFunerarioService } from '../shared/services/plano-funerario.service';
import { PlanoFunerario } from '../shared/models/PlanoFunerario.model';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-planos-funerarios',
  standalone: true,
  imports: [TableModule, DialogModule],
  templateUrl: './planos-funerarios.component.html',
  styleUrl: './planos-funerarios.component.css'
})
export class PlanosFunerariosComponent {

  constructor(private planoFunerarioService: PlanoFunerarioService){}

  public visibleDialogCadastrarPlanoFunerario: boolean = false;

  ngOnInit() {
    this.listarPlanosFunerarios();
  }

  public planosFunerarios: PlanoFunerario[] = [];

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

  public salvarPlanoFunerario(): void {
    console.log('Salvando plano funerário');
  }

}
