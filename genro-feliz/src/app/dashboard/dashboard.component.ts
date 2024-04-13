import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavComponent, BreadcrumbComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor() { }

  estaAbertaSideNav: boolean = false;

  ngOnInit() {
  } 

  public abrirSideNav(): void {
    this.estaAbertaSideNav = !this.estaAbertaSideNav;
  }

}
