import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent},
  { path: 'login', component: LoginComponent}
];
