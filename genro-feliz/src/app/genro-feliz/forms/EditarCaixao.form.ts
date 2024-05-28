import { FormControl, FormGroup } from "@angular/forms";
import { Caixao } from "../shared/models/Caixao.model";

export const EditarCaixaoForm = new FormGroup({
    id: new FormControl(''),
    material: new FormControl(''),
    cor: new FormControl(''),
    comprimento: new FormControl(''),
    modelo: new FormControl(''),
    preco: new FormControl('')
});

export function atribuirForm(formGroup: FormGroup, caixao: Caixao) {
    formGroup.get('id')?.setValue(caixao.id);
    formGroup.get('material')?.setValue(caixao.material);
    formGroup.get('cor')?.setValue(caixao.cor);
    formGroup.get('comprimento')?.setValue(caixao.comprimento);
    formGroup.get('modelo')?.setValue(caixao.modelo);
    formGroup.get('preco')?.setValue(caixao.preco);
}