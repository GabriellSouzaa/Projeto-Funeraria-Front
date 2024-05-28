import { Component } from '@angular/core';
import { SalaDeVelorio } from '../shared/models/SalaDeVelorio.model';
import { SalasDeVelorioService } from '../shared/services/salas-de-velorio.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-salas-de-velorio',
  standalone: true,
  imports: [TableModule],
  templateUrl: './salas-de-velorio.component.html',
  styleUrl: './salas-de-velorio.component.css'
})
export class SalasDeVelorioComponent {

  constructor(private salaDeVelorioService: SalasDeVelorioService) { }

  public salasDeVelorio: SalaDeVelorio[] = [];

  ngOnInit(): void {
    this.listarSalasDeVelorio();
  }

  public listarSalasDeVelorio(): void{
     this.salaDeVelorioService.listarSalasDeVelorio().subscribe(salasDeVelorio => {
       this.salasDeVelorio = salasDeVelorio;
     }); 
  }

}
