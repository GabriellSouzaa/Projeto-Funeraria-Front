import { FormControl, FormGroup, Validators } from "@angular/forms";

export const SalaDeVelorioForm = new FormGroup({
  descricao: new FormControl('', Validators.required),
  valor: new FormControl('', Validators.required),
})