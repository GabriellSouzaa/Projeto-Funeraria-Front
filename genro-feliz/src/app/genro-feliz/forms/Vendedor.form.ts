import { FormControl, FormGroup, Validators } from "@angular/forms";

export const VendedorForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cargo: new FormControl('', Validators.required)
})