import { Caixao } from "./Caixao.model";
import { Cliente } from "./Cliente.model";
import { SalaDeVelorio } from "./SalaDeVelorio.model";

export class MorteDePaciente{
    public id: number | undefined;
    public funeralParlor: string | undefined;
    public client: string | undefined;
    public coffin: string | undefined;
    public chemicalConservation: string | undefined;
    public descriptionDeath: string | undefined;
}
