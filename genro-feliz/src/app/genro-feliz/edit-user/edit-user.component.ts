import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '../forms/Register.form';
import { MessageService } from 'primeng/api';
import { RegisterService } from '../shared/services/register.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    SideNavComponent,
    InputMaskModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  public registerForm: FormGroup = new FormGroup({});

  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = RegisterForm;

   
  this.loginService.userInfo().subscribe({
    next: (user) => {
      this.registerForm.patchValue({
        firstName: user.primeiroNome,
        lastName: user.sobreNome,
        cpf: user.cpf,
        dataNascimento: user.dataDeNascimento,
        login: user.login
      });
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao carregar informações do usuário.',
      });
    }
  });
  }

  public registrarUsuario(): void {
    this.registerService.register(this.registerForm).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário atualizado com sucesso.',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar usuário.',
        });
      },
    });
  }
}
