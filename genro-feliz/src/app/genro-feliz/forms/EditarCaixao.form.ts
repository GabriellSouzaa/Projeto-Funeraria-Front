import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Caixao } from "../shared/models/Caixao.model";

export const EditarCaixaoForm = new FormGroup({
    id: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    cor: new FormControl('', Validators.required),
    comprimento: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required)
});

export function atribuirForm(formGroup: FormGroup, caixao: Caixao) {
    formGroup.get('id')?.setValue(caixao.id);
    formGroup.get('material')?.setValue(caixao.material);
    formGroup.get('cor')?.setValue(caixao.cor);
    formGroup.get('comprimento')?.setValue(caixao.comprimento);
    formGroup.get('modelo')?.setValue(caixao.modelo);
    formGroup.get('preco')?.setValue(caixao.preco);
}