import type { Corrida } from "./Corrida";

export interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    corrida: Corrida[] | null;
}
