import { Routes } from '@angular/router';
import { LoginComponent } from './genro-feliz/login/login.component';
import { PaginaInicialComponent } from './genro-feliz/pagina-inicial/pagina-inicial.component';
import { ClientesComponent } from './genro-feliz/clientes/clientes.component';
import { CaixaoComponent } from './genro-feliz/caixao/caixao.component';
import { BeneficiariosComponent } from './genro-feliz/beneficiarios/beneficiarios.component';
import { SalasDeVelorioComponent } from './genro-feliz/salas-de-velorio/salas-de-velorio.component';
import { FalecimentosComponent } from './genro-feliz/falecimentos/falecimentos.component';
import { AuthGuard } from './genro-feliz/shared/guard/authguard';

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'pagina-inicial', component: PaginaInicialComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'caixao', component: CaixaoComponent, canActivate: [AuthGuard]},
  {path: 'beneficiarios', component: BeneficiariosComponent, canActivate: [AuthGuard]},
  {path: 'salas-de-velorio', component: SalasDeVelorioComponent, canActivate: [AuthGuard]},
  {path: 'falecimentos', component: FalecimentosComponent, canActivate: [AuthGuard]}
];
