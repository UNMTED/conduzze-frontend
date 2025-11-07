import {
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
    XCircle,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { atualizar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface Corrida {
    id: number;
    origem: string;
    destino: string;
    valor: number;
    status: string;
}

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
            ...corridas,
            [e.target.name]: e.target.value,
        });
    }

    async function atualizarCorridas() {
        try {
            await atualizar(`/corridas`, corridas, setCorridas);
            ToastAlerta("A corrida foi atualizada com sucesso!", "sucesso");
            onSuccess();
        } catch (error) {
            ToastAlerta("Falha ao atualizar corrida", "erro");
        }
    }
    async function excluirCorridas() {
        try {
            await deletar(`/corridas/${corrida.id}`);
            ToastAlerta("A corrida foi excluída com sucesso!", "sucesso");
            onSuccess();
        } catch (error) {}
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Em andamento":
                return <Clock className="w-4 h-4 text-purple-400" />;
            case "Finalizada":
                return <CheckCircle className="w-4 h-4 text-cyan-400" />;
            case "Cancelada":
                return <XCircle className="w-4 h-4 text-red-500" />;
            case "Aguardando":
                return <AlertCircle className="w-4 h-4 text-yellow-400" />;
            default:
                return <Clock className="w-4 h-4 text-purple-400" />;
        }
    };

    return (
        <div className="rounded-2xl  p-4 ">
            {/* Info Items */}
            <div className="space-y-3 mb-4">
                {/* Origem */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-red-500 transition-colors">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-xs text-slate-400">De</p>
                        <p className="text-sm font-medium text-white truncate">
                            {corrida.origem}
                        </p>
                    </div>
                </div>

                {/* Destino */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-cyan-400 transition-colors">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-xs text-slate-400">Para</p>
                        <p className="text-sm font-medium text-white truncate">
                            {corrida.destino}
                        </p>
                    </div>
                </div>

                {/* Valor */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-purple-400 transition-colors">
                    <DollarSign className="w-4 h-4 text-purple-400 shrink-0" />
                    <div className="min-w-0">
                        <p className="text-xs text-slate-400">Valor</p>
                        <p className="text-sm font-bold text-white">
                            R${" "}
                            {corrida.valor.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Status Divider */}
            <div className="border-t border-slate-700 my-3" />

            {/* Status Atual */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/80 border border-slate-700 mb-3">
                {getStatusIcon(corridas.status)}
                <div className="min-w-0">
                    <p className="text-xs text-slate-400">Status</p>
                    <p className="text-sm font-medium text-white">
                        {corridas.status}
                    </p>
                </div>
            </div>

            {/* Select */}
            <div className="mb-3">
                <label
                    htmlFor="status"
                    className="block text-xs font-medium text-slate-300 mb-2"
                >
                    Novo Status
                </label>
                <div className="relative flex items-center rounded-lg border border-slate-700 bg-slate-800/80 p-3 transition-all duration-200 hover:border-indigo-400 focus-within:border-purple-400">
                    <Clock className="h-4 w-4 text-purple-400 mr-2 shrink-0" />
                    <select
                        name="status"
                        id="status"
                        value={corridas.status}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            atualizarEstado(e)
                        }
                        className="w-full px-2 bg-transparent text-sm font-medium text-white outline-none appearance-none cursor-pointer"
                    >
                        <option
                            value="Em andamento"
                            className="bg-conduzze-dark text-white"
                        >
                            Em andamento
                        </option>
                        <option
                            value="Finalizada"
                            className="bg-conduzze-dark text-white"
                        >
                            Finalizada
                        </option>
                        <option
                            value="Cancelada"
                            className="bg-conduzze-dark text-white"
                        >
                            Cancelada
                        </option>
                        <option
                            value="Aguardando"
                            className="bg-conduzze-dark text-white"
                        >
                            Aguardando
                        </option>
                    </select>
                    <span className="pointer-events-none absolute right-3 text-slate-400">
                        &#9660;
                    </span>
                </div>
            </div>

            {/* Button */}
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={excluirCorridas}
                    className="w-full rounded-lg bg-linear-to-r from-purple-600 to-pink-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-purple-500/40 active:scale-95"
                >
                    Excluir Corrida
                </button>
                <button
                    type="button"
                    onClick={atualizarCorridas}
                    className="w-full rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-purple-500/40 active:scale-95"
                >
                    Atualizar Corrida
                </button>
            </div>
        </div>
    );
}
