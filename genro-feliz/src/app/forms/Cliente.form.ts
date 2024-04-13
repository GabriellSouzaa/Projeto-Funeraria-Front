import { FormControl, FormGroup } from "@angular/forms";

export const ClienteForm = new FormGroup({
  nome: new FormControl(''),
  dataNascimento: new FormControl(''),
  cidadeNascimento: new FormControl(''),
  rg: new FormControl(''),
  cpf: new FormControl(''),
  profissao: new FormControl(''),
  religiao: new FormControl(''),
  estado_civil: new FormControl(''),
  telefone: new FormControl('')
})