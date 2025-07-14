import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '../forms/Register.form';
import { MessageService } from 'primeng/api';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ ReactiveFormsModule, MessagesModule, ToastModule, SideNavComponent, InputMaskModule],
  providers: [MessageService],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  public registerForm: FormGroup = new FormGroup({});

  public ngOnInit(): void{
    this.registerForm = RegisterForm;
  }
  public constructor(private registerService: RegisterService, private messageService: MessageService){}

  public registrarUsuario(): void{
    this.registerService.register(this.registerForm).subscribe(() => {
      window.location.reload();
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Usuário registrado com sucesso.'});
    }, () => {
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao registrar usuário.'});
    })
  }
}
