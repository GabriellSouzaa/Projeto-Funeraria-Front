import { FormControl, FormGroup } from "@angular/forms";
import { Cliente } from "../shared/models/Cliente.model";

export const EditarClienteForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    dataNascimento: new FormControl(''),
    cidadeNascimento: new FormControl(''),
    rg: new FormControl(''),
    cpf: new FormControl(''),
    profissao: new FormControl(''),
    religiao: new FormControl(''),
    estado_civil: new FormControl(''),
    telefone: new FormControl('')
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
