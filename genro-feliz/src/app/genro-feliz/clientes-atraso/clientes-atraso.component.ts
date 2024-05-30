import { Component } from '@angular/core';
import { PlanoFunerarioAtrasado } from '../shared/models/PlanoFunerarioAtrasado.model';
import { PlanoFunerarioEmAtrasoService } from '../shared/services/plano-funerario-em-atraso.service';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { EmailService } from '../shared/services/email.service';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-clientes-atraso',
  standalone: true,
  imports: [TableModule, TooltipModule, NgIf, ToastModule, IconFieldModule, InputIconModule, InputTextModule, ProgressSpinnerModule],
  templateUrl: './clientes-atraso.component.html',
  styleUrl: './clientes-atraso.component.css',
  providers: [MessageService]
})
export class ClientesAtrasoComponent {

  constructor(private planoFunerarioEmAtrasoService: PlanoFunerarioEmAtrasoService, private emailService: EmailService, private messageService: MessageService){}

  public planosFunerariosEmAtraso: PlanoFunerarioAtrasado[] = [];

  public planoFunerarioParaEnviarEmail: PlanoFunerarioAtrasado = new PlanoFunerarioAtrasado();

  public carregandoRelatorioPlanosAtrasados: boolean = false;



  ngOnInit(): void {
    this.buscarPlanosFunerariosEmAtraso();
  }

  public buscarPlanosFunerariosEmAtraso(): void{
    this.planoFunerarioEmAtrasoService.listarPlanosFunerariosEmAtraso().subscribe((planosFunerariosEmAtraso: PlanoFunerarioAtrasado[])=>{
      this.planosFunerariosEmAtraso = planosFunerariosEmAtraso;
    })
  }

  public enviarEmailParaClienteAtrasado(planoFunerario: PlanoFunerarioAtrasado): void{
    planoFunerario.enviandoEmail = true;
    this.planoFunerarioParaEnviarEmail = planoFunerario;
    if(this.planoFunerarioParaEnviarEmail.nomeCliente && this.planoFunerarioParaEnviarEmail.id){
      this.emailService.sendEmailToDelayedFuneralPlan(this.planoFunerarioParaEnviarEmail.nomeCliente, this.planoFunerarioParaEnviarEmail.id).subscribe(()=>{
        this.messageService.add({severity: 'success', detail: 'Email enviado com sucesso!'})
        this.planoFunerarioParaEnviarEmail = new PlanoFunerarioAtrasado();
        planoFunerario.enviandoEmail = false;
      }, () => {
        this.messageService.add({severity: 'error', detail: 'Erro ao enviar email!'})
        planoFunerario.enviandoEmail = false;
      })
    }
  }

  public gerarRelatorioPlanosFunerariosEmAtraso(): void{
    this.carregandoRelatorioPlanosAtrasados = true;
    this.planoFunerarioEmAtrasoService.gerarRelatorioPlanosFunerariosEmAtraso().subscribe((relatorio: any)=>{
      const url = window.URL.createObjectURL(relatorio);
      window.open(url);
      this.carregandoRelatorioPlanosAtrasados = false;
    })
  }
}
