import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../shared/services/login.service';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { LoginForm } from '../forms/Login.form';
import { LoginResponse } from '../shared/models/LoginResponse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule, MessagesModule],
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({});

  public constructor(private loginService: LoginService, private messageService: MessageService, private router: Router){}

  ngOnInit(): void{
    this.loginForm = LoginForm;
  }

  public login(){
      this.loginService.login(this.loginForm).subscribe({
        error: () =>{
            this.messageService.add({severity: 'error', detail: 'Erro'})
        },
        next:(response: LoginResponse) =>{
          this.messageService.add({severity: 'success', detail: 'Sucesso'})
          localStorage.setItem('token', response.token);
          this.router.navigate(['/pagina-inicial']);
        }
      })

  }




}
