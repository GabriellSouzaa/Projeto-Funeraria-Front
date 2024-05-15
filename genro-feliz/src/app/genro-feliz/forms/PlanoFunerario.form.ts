import { FormControl, FormGroup } from "@angular/forms";

export const PlanoFunerarioForm = new FormGroup({
  valor: new FormControl(''),
  dataPagamento: new FormControl(''),
  nomeCliente: new FormControl('')
})