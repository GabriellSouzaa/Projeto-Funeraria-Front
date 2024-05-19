import { Component } from '@angular/core';
import { PlanoFunerarioAtrasado } from '../shared/models/PlanoFunerarioAtrasado.model';
import { PlanoFunerarioEmAtrasoService } from '../shared/services/plano-funerario-em-atraso.service';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-clientes-atraso',
  standalone: true,
  imports: [TableModule, TooltipModule],
  templateUrl: './clientes-atraso.component.html',
  styleUrl: './clientes-atraso.component.css'
})
export class ClientesAtrasoComponent {

  constructor(private planoFunerarioEmAtrasoService: PlanoFunerarioEmAtrasoService){}

  public planosFunerariosEmAtraso: PlanoFunerarioAtrasado[] = [];

  ngOnInit(): void {
    this.buscarPlanosFunerariosEmAtraso();
  }

  public buscarPlanosFunerariosEmAtraso(): void{
    this.planoFunerarioEmAtrasoService.listarPlanosFunerariosEmAtraso().subscribe((planosFunerariosEmAtraso: PlanoFunerarioAtrasado[])=>{
      this.planosFunerariosEmAtraso = planosFunerariosEmAtraso;
    })
  }
}
