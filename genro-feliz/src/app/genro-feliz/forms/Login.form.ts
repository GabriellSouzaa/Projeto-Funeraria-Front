import { FormControl, FormGroup } from "@angular/forms";

export const LoginForm = new FormGroup({
  login: new FormControl(''),
  password: new FormControl('')
});