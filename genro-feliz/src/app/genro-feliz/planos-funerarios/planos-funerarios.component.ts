import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PlanoFunerarioService } from '../shared/services/plano-funerario.service';
import { PlanoFunerario } from '../shared/models/PlanoFunerario.model';

@Component({
  selector: 'app-planos-funerarios',
  standalone: true,
  imports: [TableModule],
  templateUrl: './planos-funerarios.component.html',
  styleUrl: './planos-funerarios.component.css'
})
export class PlanosFunerariosComponent {

  constructor(private planoFunerarioService: PlanoFunerarioService){}

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

}
