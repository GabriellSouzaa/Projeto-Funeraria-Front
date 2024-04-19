import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './genro-feliz/dashboard/dashboard.component';
import { SideNavComponent } from './genro-feliz/side-nav/side-nav.component';
import { BreadcrumbService } from './genro-feliz/shared/services/breadcrumb.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, DashboardComponent, SideNavComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'genro-feliz';

  ePaginaDeLogin: boolean = false;

  constructor(private router: Router, public breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void{
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        this.ePaginaDeLogin = event.url === '/login';
      }
    });
  }
}
