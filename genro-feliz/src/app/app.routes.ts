import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CaixaoComponent } from './caixao/caixao.component';
import { BeneficiariosComponent } from './beneficiarios/beneficiarios.component';
import { SalasDeVelorioComponent } from './salas-de-velorio/salas-de-velorio.component';
import { FalecimentosComponent } from './falecimentos/falecimentos.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent},
  { path: 'login', component: LoginComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'caixao', component: CaixaoComponent},
  {path: 'beneficiarios', component: BeneficiariosComponent},
  {path: 'salas-de-velorio', component: SalasDeVelorioComponent},
  {path: 'falecimentos', component: FalecimentosComponent}
];
