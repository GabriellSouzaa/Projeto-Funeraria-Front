import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '../forms/Register.form';
import { RegisterService } from '../shared/services/register.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MessagesModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public constructor(private registerService: RegisterService, private messageService: MessageService){}

  public registerForm: FormGroup = new FormGroup({});

  public ngOnInit(): void{
    this.registerForm = RegisterForm;
  }

  public registrarUsuario(): void{
    this.registerService.register(this.registerForm).subscribe(() => {
      console.log('Usuário registrado com sucesso.');
    }, () => {
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao registrar usuário.'});
    })
  }
}
