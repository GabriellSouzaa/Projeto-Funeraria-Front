import { FormControl, FormGroup } from "@angular/forms";

export const RegisterForm = new FormGroup({
  login: new FormControl(''),
  password: new FormControl(''),
  role: new FormControl('ADMIN')
});