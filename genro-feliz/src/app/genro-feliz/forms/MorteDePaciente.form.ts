import { Caixao } from '../shared/models/Caixao.model';
import { Cliente } from '../shared/models/Cliente.model';
import { PlanoFunerario } from '../shared/models/PlanoFunerario.model';

export class MorteDePacienteForm {
  public funeralParlor: PlanoFunerario = new PlanoFunerario();
  public client: Cliente = new Cliente();
  public coffin: Caixao = new Caixao();
  public chemicalConservation: string = '';
  public descriptionDeath: string = '';
}
