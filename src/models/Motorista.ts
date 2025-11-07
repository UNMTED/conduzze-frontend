import type { Corrida } from "./Corrida";

export interface Motorista {
    id: number;
    nome: string;
    foto?: string;
    avaliacao?: number;
    corridas?: Corrida[] | null;
}
