import type { Status } from "../types/Status";
import type { Motorista } from "./Motorista";
import type { Usuario } from "./Usuario";

export interface Corrida {
    id?: number;
    origem: string;
    destino: string;
    valor: number;
    status: Status;
    motorista: Motorista | null;
    usuario: Usuario | null;
}
