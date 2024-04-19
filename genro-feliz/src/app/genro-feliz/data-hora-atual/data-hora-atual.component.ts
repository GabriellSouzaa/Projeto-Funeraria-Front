import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-data-hora-atual',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './data-hora-atual.component.html',
  styleUrl: './data-hora-atual.component.css'
})
export class DataHoraAtualComponent {
  
    constructor() { }
  
    public dataHoraAtual: Date = new Date();
    public diaSemana: string = '';

    ngOnInit() {
      setInterval(() => {
      this.dataHoraAtual = new Date();
      this.diaSemana = this.obterDiaSemana(this.dataHoraAtual.getDay());
      }, 1000);
    }

    public obterDiaSemana(dia: number): string {
      const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      return diasSemana[dia];
    }
}
