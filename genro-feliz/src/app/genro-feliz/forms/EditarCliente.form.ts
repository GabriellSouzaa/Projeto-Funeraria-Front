import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Cliente } from "../shared/models/Cliente.model";

export const EditarClienteForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    cidadeNascimento: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    profissao: new FormControl('', Validators.required),
    religiao: new FormControl('', Validators.required),
    estado_civil: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required)
});

export function atribuirForm(formGroup: FormGroup, cliente: Cliente) {
    formGroup.get('id')?.setValue(cliente.id);
    formGroup.get('nome')?.setValue(cliente.nome);
    formGroup.get('dataNascimento')?.setValue(cliente.dataNascimento);
    formGroup.get('cidadeNascimento')?.setValue(cliente.cidadeNascimento);
    formGroup.get('rg')?.setValue(cliente.rg);
    formGroup.get('cpf')?.setValue(cliente.cpf);
    formGroup.get('profissao')?.setValue(cliente.profissao);
    formGroup.get('religiao')?.setValue(cliente.religiao);
    formGroup.get('estado_civil')?.setValue(cliente.estadoCivil);
    formGroup.get('telefone')?.setValue(cliente.telefone);
}
