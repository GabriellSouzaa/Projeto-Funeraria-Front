import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { VendaDeCaixaoService } from '../shared/services/venda-de-caixao.service';
import { VendaDeCaixao } from '../shared/models/VendaDeCaixao.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { NgIf } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-venda-de-caixao',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule, BreadcrumbComponent, NgIf, InputIconModule, InputTextModule, IconFieldModule, TooltipModule],
  templateUrl: './venda-de-caixao.component.html',
  styleUrl: './venda-de-caixao.component.css'
})
export class VendaDeCaixaoComponent {

  constructor(private vendaDeCaixaoService: VendaDeCaixaoService) { }

  public vendasDeCaixao: VendaDeCaixao[] = [];

  public carregandoListasDeCaixao: boolean = false;

  ngOnInit() {
    this.listarVendasDeCaixao();
  }

  public listarVendasDeCaixao(): void{
    this.carregandoListasDeCaixao = true;
    this.vendaDeCaixaoService.listarVendasDeCaixao().subscribe(vendas => {
      this.vendasDeCaixao = vendas;
      this.carregandoListasDeCaixao = false;
    });
  }
}
