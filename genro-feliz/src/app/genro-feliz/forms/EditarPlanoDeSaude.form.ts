import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PlanoDeSaude } from "../shared/models/PlanoDeSaude.model";

export const EditarPlanoDeSaudeForm = new FormGroup({
    descricao: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
})

export function atribuirFormPlanoDeSaude(form: FormGroup, planoDeSaude: PlanoDeSaude): void {
    form.get('descricao')?.setValue(planoDeSaude.descricao)
    form.get('telefone')?.setValue(planoDeSaude.telefone)
    form.get('valor')?.setValue(planoDeSaude.valor)
    console.log('Atribui o form')
}