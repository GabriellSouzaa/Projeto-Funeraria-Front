import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { NgIf } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TooltipModule } from 'primeng/tooltip';
import { VendedoresService } from '../shared/services/vendedores.service';
import { Vendedor } from '../shared/models/Vendedor.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-vendedores',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule, BreadcrumbComponent, NgIf, InputIconModule, IconFieldModule, TooltipModule, InputTextModule],
  templateUrl: './vendedores.component.html',
  styleUrl: './vendedores.component.css'
})
export class VendedoresComponent {

  constructor(private vendedoresService: VendedoresService){}

  public vendedores: Vendedor[] = [];

  public carregandoVendedores: boolean = false;

  ngOnInit(){
    this.listarVendedores();
  }

  public listarVendedores(): void{
    this.carregandoVendedores = true;
    this.vendedoresService.listarVendedores().subscribe(vendedores => {
      this.vendedores = vendedores;
      this.carregandoVendedores = false;
    });
  }
}
