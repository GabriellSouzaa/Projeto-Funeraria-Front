import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [DashboardComponent, BreadcrumbComponent, DialogModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css',
})
export class PaginaInicialComponent {

  constructor() { }

  public visibleDialogBoasVindas: boolean = false;

  ngOnInit(): void {
    this.abrirDialogBoasVindas();
  }

  public abrirDialogBoasVindas(): void{
    this.visibleDialogBoasVindas = true;
  }

  public fecharDialogBoasVindas(): void{
    this.visibleDialogBoasVindas = false;
  }

}
