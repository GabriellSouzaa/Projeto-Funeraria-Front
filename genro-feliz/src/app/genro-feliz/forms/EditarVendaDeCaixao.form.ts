import { FormControl, FormGroup, Validators } from "@angular/forms";
import { VendaDeCaixao } from "../shared/models/VendaDeCaixao.model";
import { Caixao } from "../shared/models/Caixao.model";
import { Vendedor } from "../shared/models/Vendedor.model";

export const EditarVendaDeCaixaoForm = new FormGroup({
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
        preco: new FormControl('', Validators.required)
    }),
    dataVenda: new FormControl('', Validators.required)
});


export function atribuirFormVendaDeCaixao(formGroup: FormGroup, vendaDeCaixao: VendaDeCaixao, caixao: Caixao, vendedor: Vendedor){
    formGroup.get('seller.id')?.setValue(vendedor.id);
    formGroup.get('seller.nome')?.setValue(vendedor.nome);
    formGroup.get('seller.cargo')?.setValue(vendedor.cargo);
    formGroup.get('coffin.id')?.setValue(caixao.id);
    formGroup.get('coffin.material')?.setValue(caixao.material);
    formGroup.get('coffin.cor')?.setValue(caixao.cor);
    formGroup.get('coffin.comprimento')?.setValue(caixao.comprimento);
    formGroup.get('coffin.modelo')?.setValue(caixao.modelo);
    formGroup.get('coffin.preco')?.setValue(caixao.preco);
}

