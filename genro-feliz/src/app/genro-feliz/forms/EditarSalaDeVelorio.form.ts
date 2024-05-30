import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SalaDeVelorio } from "../shared/models/SalaDeVelorio.model";

export const EditarSalaDeVelorioForm = new FormGroup({
  descricao: new FormControl('', Validators.required),
  valor: new FormControl('', Validators.required),
})

export function atribuirForm(salaDeVelorio: SalaDeVelorio){
  EditarSalaDeVelorioForm.patchValue({
    descricao: salaDeVelorio.descricao,
    valor: String(salaDeVelorio.valor) 
  })
}