import { Caixao } from "../shared/models/Caixao.model";
import { Cliente } from "../shared/models/Cliente.model";
import { Vendedor } from "../shared/models/Vendedor.model";

export class CadastroVendaDeCaixaoNovoForm{
    client: Cliente = new Cliente();
    seller: Vendedor = new Vendedor();
    coffin: Caixao = new Caixao();
    dataVenda: string = '';
}