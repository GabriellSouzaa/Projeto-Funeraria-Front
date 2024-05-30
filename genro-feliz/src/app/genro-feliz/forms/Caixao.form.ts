import { FormControl, FormGroup, Validators } from "@angular/forms";

export const CaixaoForm = new FormGroup({
    material: new FormControl('', Validators.required),
    cor: new FormControl('', Validators.required),
    comprimento: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required)
})