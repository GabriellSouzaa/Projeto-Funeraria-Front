import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ClientesComponent } from './clientes/clientes.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent},
  { path: 'login', component: LoginComponent},
  {path: 'clientes', component: ClientesComponent}
];
