import { Caixao } from "./Caixao.model";
import { Cliente } from "./Cliente.model";
import { SalaDeVelorio } from "./SalaDeVelorio.model";

export class MorteDePaciente{
    public id: number | undefined;
    public funeralParlor: SalaDeVelorio | undefined;
    public client: Cliente | undefined;
    public caixao: Caixao | undefined;
    public chemicalConservation: string | undefined;
    public descriptionDeath: string | undefined;
}
