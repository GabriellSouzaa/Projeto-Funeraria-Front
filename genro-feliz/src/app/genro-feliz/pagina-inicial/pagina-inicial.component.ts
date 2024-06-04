import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PlanoFunerarioEmAtrasoService } from '../shared/services/plano-funerario-em-atraso.service';
import { PlanoFunerarioAtrasado } from '../shared/models/PlanoFunerarioAtrasado.model';
import { FieldsetModule } from 'primeng/fieldset';
import { RouterModule } from '@angular/router';
import { VendaDeCaixaoService } from '../shared/services/venda-de-caixao.service';
import { VendaDeCaixao } from '../shared/models/VendaDeCaixao.model';
import { MorteDePaciente } from '../shared/models/MorteDePaciente.model';
import { MorteDePacienteService } from '../shared/services/morte-de-paciente.service';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [DashboardComponent, BreadcrumbComponent, DialogModule, TableModule, FieldsetModule, RouterModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {

  constructor(private planoFunerarioEmAtrasoService: PlanoFunerarioEmAtrasoService, private vendaDeCaixaoService: VendaDeCaixaoService, private morteDePacienteService: MorteDePacienteService) { }

  public visibleDialogBoasVindas: boolean = false;

  public planosFunerariosEmAtraso: PlanoFunerarioAtrasado[] = [];	

  public vendasCaixao: VendaDeCaixao[] = [];

  public mortesDePaciente: MorteDePaciente[] = [];

  ngOnInit(): void {
    this.abrirDialogBoasVindas();
    this.buscarPlanosFunerariosEmAtraso();
    this.buscarVendasCaixao();
    this.buscarMortesDePaciente();
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

  public buscarVendasCaixao(): void{
    this.vendaDeCaixaoService.listarVendasDeCaixao().subscribe(
      (response: VendaDeCaixao[]) => {
        this.vendasCaixao = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public buscarMortesDePaciente(): void{
    this.morteDePacienteService.listarMortesDePaciente().subscribe(
      (response: MorteDePaciente[]) => {
        this.mortesDePaciente = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  

}
