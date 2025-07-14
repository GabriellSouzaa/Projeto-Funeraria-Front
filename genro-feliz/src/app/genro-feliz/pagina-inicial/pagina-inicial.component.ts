import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { PlanoFunerarioEmAtrasoService } from '../shared/services/plano-funerario-em-atraso.service';
import { PlanoFunerarioAtrasado } from '../shared/models/PlanoFunerarioAtrasado.model';
import { FieldsetModule } from 'primeng/fieldset';
import { Router, RouterModule } from '@angular/router';
import { VendaDeCaixaoService } from '../shared/services/venda-de-caixao.service';
import { VendaDeCaixao } from '../shared/models/VendaDeCaixao.model';
import { MorteDePaciente } from '../shared/models/MorteDePaciente.model';
import { MorteDePacienteService } from '../shared/services/morte-de-paciente.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [ SideNavComponent,ChartModule,MessagesModule, ToastModule, BreadcrumbComponent, DialogModule, TableModule, FieldsetModule, RouterModule],
  templateUrl: './pagina-inicial.component.html',
  providers: [MessageService],
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {
  dayNumber: number;
  year: number;
  dayName: string;
  monthName: string;
  planosVendidos: number = 40;

  constructor(private planoFunerarioEmAtrasoService: PlanoFunerarioEmAtrasoService, private messageService: MessageService, private vendaDeCaixaoService: VendaDeCaixaoService, private morteDePacienteService: MorteDePacienteService,private breadcrumbService: BreadcrumbService, private router: Router) {
    const now = new Date();
    this.dayNumber = now.getDate();
    this.year = now.getFullYear();
    this.dayName = now.toLocaleString('default', { weekday: 'long' }).toUpperCase();
    this.monthName = now.toLocaleString('default', { month: 'long' }).toUpperCase();
  }


  data: any;

  options: any;

  public planosFunerariosEmAtraso: PlanoFunerarioAtrasado[] = [];

  public vendasCaixao: VendaDeCaixao[] = [];

  public mortesDePaciente: MorteDePaciente[] = [];



  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.data = {
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [
              {
                  label: 'Planos Vendidos',
                  data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40 ],
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  tension: 0.4
              },
              {
                  label: 'Planos Desligados',
                  data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--pink-500'),
                  tension: 0.4
              }
          ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    this.buscarPlanosFunerariosEmAtraso();
    this.buscarVendasCaixao();
    this.buscarMortesDePaciente();
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
