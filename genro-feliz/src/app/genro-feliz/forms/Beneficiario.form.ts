import { Beneficiarios } from "../shared/models/Beneficiarios.model";
import { Cliente } from "../shared/models/Cliente.model";

export class BeneficiarioForm{
  public client: Cliente | undefined;
  public nome: string | undefined;
  public dataNascimento: string | undefined;
  public adicional: number | undefined;
}

