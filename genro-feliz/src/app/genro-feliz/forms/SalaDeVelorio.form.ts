import { FormControl, FormGroup } from "@angular/forms";

export const SalaDeVelorioForm = new FormGroup({
  descricao: new FormControl(''),
  valor: new FormControl(''),
})