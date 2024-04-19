import { Routes } from '@angular/router';
import { LoginComponent } from './genro-feliz/login/login.component';
import { PaginaInicialComponent } from './genro-feliz/pagina-inicial/pagina-inicial.component';
import { ClientesComponent } from './genro-feliz/clientes/clientes.component';
import { CaixaoComponent } from './genro-feliz/caixao/caixao.component';
import { BeneficiariosComponent } from './genro-feliz/beneficiarios/beneficiarios.component';
import { SalasDeVelorioComponent } from './genro-feliz/salas-de-velorio/salas-de-velorio.component';
import { FalecimentosComponent } from './genro-feliz/falecimentos/falecimentos.component';

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'pagina-inicial', component: PaginaInicialComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'caixao', component: CaixaoComponent},
  {path: 'beneficiarios', component: BeneficiariosComponent},
  {path: 'salas-de-velorio', component: SalasDeVelorioComponent},
  {path: 'falecimentos', component: FalecimentosComponent}
];
