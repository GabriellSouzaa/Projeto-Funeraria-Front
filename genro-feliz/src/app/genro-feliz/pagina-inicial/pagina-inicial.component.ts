import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PlanoFunerarioEmAtrasoService } from '../shared/services/plano-funerario-em-atraso.service';
import { PlanoFunerarioAtrasado } from '../shared/models/PlanoFunerarioAtrasado.model';
import { FieldsetModule } from 'primeng/fieldset';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [DashboardComponent, BreadcrumbComponent, DialogModule, TableModule, FieldsetModule, RouterModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {

  constructor(private planoFunerarioEmAtrasoService: PlanoFunerarioEmAtrasoService) { }

  public visibleDialogBoasVindas: boolean = false;

  public planosFunerariosEmAtraso: PlanoFunerarioAtrasado[] = [];	

  ngOnInit(): void {
    this.abrirDialogBoasVindas();
    this.buscarPlanosFunerariosEmAtraso();
  }

  public abrirDialogBoasVindas(): void{
    this.visibleDialogBoasVindas = true;
  }

  public fecharDialogBoasVindas(): void{
    this.visibleDialogBoasVindas = false;
  }

  public buscarPlanosFunerariosEmAtraso(): void{
    this.planoFunerarioEmAtrasoService.listarPlanosFunerariosEmAtraso().subscribe(
      (response: PlanoFunerarioAtrasado[]) => {
        this.planosFunerariosEmAtraso = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  

}
