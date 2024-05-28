import { Component } from '@angular/core';
import { BeneficiarioService } from '../shared/services/beneficiario.service';
import { TableModule } from 'primeng/table';
import { Beneficiarios } from '../shared/models/Beneficiarios.model';

@Component({
  selector: 'app-beneficiarios',
  standalone: true,
  imports: [TableModule],
  templateUrl: './beneficiarios.component.html',
  styleUrl: './beneficiarios.component.css'
})
export class BeneficiariosComponent {

  constructor(private beneficiarioService: BeneficiarioService) { }

  public beneficiarios: Beneficiarios[] = [];

  ngOnInit(): void {
    this.listarBeneficiarios();
  }

  public listarBeneficiarios(): void{
    this.beneficiarioService.listarBeneficiarios().subscribe(beneficiarios => {
      this.beneficiarios = beneficiarios;
    }); 
  }

}
