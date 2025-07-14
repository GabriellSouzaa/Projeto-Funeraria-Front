import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '../forms/Register.form';
import { RegisterService } from '../shared/services/register.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MessagesModule, ToastModule, InputMaskModule],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public constructor(
    private registerService: RegisterService,
    private messageService: MessageService
  ) {}

  public registerForm: FormGroup = new FormGroup({});

  showPassword: boolean = false;
  showPassword2: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }

  public ngOnInit(): void {
    this.registerForm = RegisterForm;
  }

  public registrarUsuario(): void {
    this.registerService.register(this.registerForm).subscribe(
      () => {
        window.location.reload();
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário registrado com sucesso.',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao registrar usuário.',
        });
      }
    );
  }
}
