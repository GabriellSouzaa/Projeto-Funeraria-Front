import { FormControl, FormGroup, Validators } from '@angular/forms';

export const PlanoDeSaudeForm = new FormGroup({
  descricao: new FormControl('', Validators.required),
  telefone: new FormControl('', Validators.required),
  valor: new FormControl('', Validators.required),
});
