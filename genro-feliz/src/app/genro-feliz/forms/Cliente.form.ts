import { FormControl, FormGroup, Validators } from "@angular/forms";

export const ClienteForm = new FormGroup({
  nome: new FormControl('', Validators.required),
  dataNascimento: new FormControl('', [Validators.required, Validators.pattern(/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/)]),
  cidadeNascimento: new FormControl('', Validators.required),
  rg: new FormControl('', Validators.required),
  cpf: new FormControl('', Validators.required),
  profissao: new FormControl('', Validators.required),
  religiao: new FormControl('', Validators.required),
  estado_civil: new FormControl('', Validators.required),
  telefone: new FormControl('', Validators.required)
})