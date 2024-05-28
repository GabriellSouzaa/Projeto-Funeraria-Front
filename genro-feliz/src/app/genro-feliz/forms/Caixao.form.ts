import { FormControl, FormGroup } from "@angular/forms";

export const CaixaoForm = new FormGroup({
    material: new FormControl(''),
    cor: new FormControl(''),
    comprimento: new FormControl(''),
    modelo: new FormControl(''),
    preco: new FormControl('')
})