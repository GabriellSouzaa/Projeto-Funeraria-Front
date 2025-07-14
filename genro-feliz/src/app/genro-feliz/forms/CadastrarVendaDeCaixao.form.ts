import { FormControl, FormGroup, Validators } from '@angular/forms';

export const VendaDeCaixaoForm = new FormGroup({
  seller: new FormGroup({
    id: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required),
  }),
  coffin: new FormGroup({
    id: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    cor: new FormControl('', Validators.required),
    comprimento: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
  }),
  dataVenda: new FormControl('', Validators.required),
});
