import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../shared/services/login.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule, MessagesModule],
  templateUrl: './login.component.html',
  providers: [MessageService],
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  })

  public constructor(private loginService: LoginService, private messageService: MessageService){}

  public login(){
      this.loginService.login(this.loginForm).subscribe({
        error: (httpErroResponse: HttpErrorResponse) =>{
          console.log(httpErroResponse);
            this.messageService.add({severity: 'error', detail: 'Erro'})
        },
        next:() =>{
          this.messageService.add({severity: 'success', detail: 'Sucesso'})
        }
      })

  }




}
