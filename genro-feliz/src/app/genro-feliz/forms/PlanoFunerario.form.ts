import { FormControl, FormGroup, Validators } from "@angular/forms";

export const PlanoFunerarioForm = new FormGroup({
  valor: new FormControl('', Validators.required),
  dataPagamento: new FormControl('', [Validators.required, Validators.pattern(/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/)]),
  nomeCliente: new FormControl('', Validators.required)
})