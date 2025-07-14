import { FormControl, FormGroup } from '@angular/forms';

export const RegisterForm = new FormGroup({
  login: new FormControl(''),
  password: new FormControl(''),
  role: new FormControl('ADMIN'),
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  cpf: new FormControl(''),
  dataNascimento: new FormControl(''),
});
