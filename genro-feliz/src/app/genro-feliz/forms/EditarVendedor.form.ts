import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vendedor } from '../shared/models/Vendedor.model';

export const EditarVendedorForm = new FormGroup({
  nome: new FormControl('', Validators.required),
  cargo: new FormControl('', Validators.required),
});

export function atribuirFormVendedor(formGroup: FormGroup, vendedor: Vendedor) {
  formGroup.get('nome')?.setValue(vendedor.nome);
  formGroup.get('cargo')?.setValue(vendedor.cargo);
}
