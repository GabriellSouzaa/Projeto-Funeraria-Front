import { FormControl, FormGroup } from "@angular/forms";
import { SalaDeVelorio } from "../shared/models/SalaDeVelorio.model";

export const EditarSalaDeVelorioForm = new FormGroup({
  descricao: new FormControl(''),
  valor: new FormControl(''),
})

export function atribuirForm(salaDeVelorio: SalaDeVelorio){
  EditarSalaDeVelorioForm.patchValue({
    descricao: salaDeVelorio.descricao,
    valor: String(salaDeVelorio.valor) 
  })
}