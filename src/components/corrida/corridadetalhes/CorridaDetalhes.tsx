import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Corrida } from "../../../models/Corrida";
import { atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface CorridaDetalhesProps {
    corrida: Corrida;
    onSuccess: () => void;
}
export default function CorridaDetalhes({
    corrida,
    onSuccess,
}: CorridaDetalhesProps) {
    const [corridas, setCorridas] = useState<Corrida>(corrida);

    function atualizarEstado(
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) {
        setCorridas({
            ...corrida,
            [e.target.name]: e.target.value,
        });
    }

    async function atualizarCorridas(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await atualizar(`/corridas`, corridas, setCorridas);
            ToastAlerta("A corrida foi atualizada com sucesso!", "sucesso");
            onSuccess();
        } catch (error) {}
    }

    return (
        <>
            <div>
                <h1>Detalhes da Viagem</h1>
                <div>Local de partida: {corrida.origem}</div>
                <div>Local de chegada: {corrida.destino}</div>
                <div>
                    Valor da viagem:{" "}
                    {corrida.valor.toLocaleString().replace(".", ",")}
                </div>
                <div>{corrida.status}</div>
                <form onSubmit={atualizarCorridas}>
                    <select
                        name="status"
                        id="status"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            atualizarEstado(e)
                        }
                    >
                        <option
                            className="bg-conduzze-dark"
                            value="Em andamento"
                        >
                            Em andamento
                        </option>
                        <option
                            className="bg-conduzze-dark"
                            value="Finalizada"
                        >
                            Finalizada
                        </option>
                        <option
                            className="bg-conduzze-dark"
                            value="Cancelada"
                        >
                            Cancelada
                        </option>
                        <option
                            className="bg-conduzze-dark"
                            value="Aguardando"
                        >
                            Aguardando
                        </option>
                    </select>
                    <button
                        className="rounded text-slate-100 bg-[#0B57E3] px-10 my-5 
                               hover:bg-[#0942ac] py-2 mx-auto flex justify-center"
                        type="submit"
                    >
                        Atualizar corrida
                    </button>
                    {/*  "Em andamento" | "Finalizada" | "Cancelada" | "Aguardando" */}
                </form>
            </div>
        </>
    );
}
