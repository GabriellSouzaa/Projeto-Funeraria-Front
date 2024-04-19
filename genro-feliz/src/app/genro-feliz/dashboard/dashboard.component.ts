import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';
import { DataHoraAtualComponent } from '../data-hora-atual/data-hora-atual.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavComponent, BreadcrumbComponent, DataHoraAtualComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private breadcrumbService: BreadcrumbService) { }

  estaAbertaSideNav: boolean = false;

  ngOnInit() {
  }

  public abrirSideNav(): void {
    this.estaAbertaSideNav = !this.estaAbertaSideNav;
    this.breadcrumbService.sideBarAberta = this.estaAbertaSideNav;

  }

}
