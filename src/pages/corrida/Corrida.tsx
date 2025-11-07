import { useEffect, useState, type ChangeEvent } from "react";
import { CgArrowsExchangeAlt, CgPoll, CgTimer } from "react-icons/cg";
import type { Corrida } from "../../models/Corrida";
import type { Motorista } from "../../models/Motorista";
import type { Usuario } from "../../models/Usuario";
import { buscar, cadastrar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

const NEW_IMAGE_URL = "https://i.imgur.com/A0vRUcr.png";

interface InputContainerProps {
    placeholder: string;
    markerColor: string;
    value?: string;
    onChange: (value: string) => void;
}

const InputContainer: React.FC<InputContainerProps> = ({
    placeholder,
    markerColor,
    value,
    onChange,
}) => (
    <div className="relative flex items-center rounded-lg border border-slate-700 bg-slate-800/80 p-4 shadow-inner transition-all duration-200 focus-within:border-purple-400 hover:border-indigo-400">
        <div
            className={`mr-4 h-3 w-3 rounded-full ${markerColor} shadow-md shadow-current`}
        />
        <input
            type="text"
            placeholder={placeholder}
            value={value ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value)
            }
            className="w-full bg-transparent text-lg font-medium text-white placeholder-slate-400 outline-none"
        />
    </div>
);

const ImageCorridaIllustration = () => (
    <div className="relative flex h-[450px] w-full items-center justify-center overflow-hidden rounded-xl bg-transparent">
        <img
            src={NEW_IMAGE_URL}
            alt="Ilustração da Corrida Conduzzé"
            className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
        />
    </div>
);

export default function Corrida() {
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [motorista, setMotorista] = useState<string>("");
    const [origem, setOrigem] = useState<string>("");
    const [destino, setDestino] = useState<string>("");
    const [valor, setValor] = useState<number>(0);
    const [corrida, setCorrida] = useState<Corrida>();

    useEffect(() => {
        buscarMotoristas();
    }, []);

    const buscarMotoristas = async () => {
        try {
            await buscar("/motoristas", setMotoristas);
        } catch (error) {
            console.error(error);
        }
    };

    function sortearValor() {
        if (destino && origem) {
            const min = 20;
            const max = 300;
            const novoValor = parseFloat(
                (Math.random() * (max - min) + min).toFixed(2)
            );
            setValor(novoValor);
        } else {
            ToastAlerta("Preencha campos antes de calcular o valor", "erro");
        }
    }

    const cadastrarCorrida = async () => {
        if (!origem || !destino || !motorista || !valor) {
            if (!origem || !destino || !motorista) {
                ToastAlerta(
                    "Preencha todos os campos antes de cadastrar.",
                    "erro"
                );
            } else {
                ToastAlerta("Calcule o valor antes de cadastrar.", "erro");
            }
            return;
        }
        const passageiro: Usuario = {
            id: 1,
            nome: "",
            usuario: "",
            foto: "",
            senha: "",
            corrida: null,
        };
        const motoristaDados: Motorista = {
            id: Number(motorista),
            nome: "",
            foto: "",
            avaliacao: 0,
            corrida: null,
        };

        const novaCorrida: Corrida = {
            id: 0,
            usuario: passageiro,
            origem,
            destino,
            valor,
            motorista: motoristaDados,
            status: "Em andamento",
        };

        try {
            await cadastrar("/corridas", novaCorrida, setCorrida);
            ToastAlerta("Corrida cadastrada com sucesso!", "sucesso");
            setOrigem("");
            setDestino("");
            setValor(0);
            setMotorista("");
        } catch (error) {
            ToastAlerta("Erro ao cadastrar corrida.", "erro");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center gap-12 p-8 md:flex-row md:gap-20 md:p-12">
            <div className="w-full ">
                <h1 className="mb-10 text-5xl font-extrabold text-white sm:text-6xl max-w-lg space-y-8 md:w-1/2">
                    Vá a qualquer lugar com o Condu
                    <span className="text-[#F94147]">zzé</span>
                </h1>
                <div className="flex gap-20">
                    <div className="rounded-2xl bg-slate-900/70 p-6 shadow-2xl backdrop-blur-sm">
                        <h2 className="mb-6 text-xl font-semibold text-white flex items-center gap-2">
                            <CgArrowsExchangeAlt className="text-purple-400" />{" "}
                            Solicitar Corrida
                        </h2>

                        <div className="space-y-5">
                            <InputContainer
                                placeholder="Local de partida"
                                markerColor="bg-red-500"
                                value={origem}
                                onChange={setOrigem}
                            />

                            <InputContainer
                                placeholder="Local de chegada"
                                markerColor="bg-cyan-400"
                                value={destino}
                                onChange={setDestino}
                            />

                            <div className="relative flex items-center rounded-lg border border-slate-700 bg-slate-800/80 p-4 hover:border-indigo-400 transition-all duration-200">
                                <CgTimer className="h-5 w-5 text-purple-400 mr-3" />
                                <select
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>
                                    ) => setMotorista(e.target.value)}
                                    value={motorista}
                                    className="w-full bg-transparent text-lg font-medium text-white outline-none"
                                >
                                    <option
                                        value=""
                                        disabled
                                        className="text-black"
                                    >
                                        Selecione um motorista
                                    </option>
                                    {motoristas.map((m) => (
                                        <option
                                            key={m.id}
                                            value={m.id}
                                            className="text-black"
                                        >
                                            {m.nome} ({m.avaliacao}⭐)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {valor > 0 && (
                                <p className="text-lg font-semibold text-white text-center">
                                    Valor estimado:{" "}
                                    <span className="text-purple-400">
                                        R$ {valor.toFixed(2).replace(".", ",")}
                                    </span>
                                </p>
                            )}

                            <div className="flex flex-col gap-3">
                                <button
                                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02]"
                                    onClick={sortearValor}
                                >
                                    <CgPoll className="h-5 w-5" /> Calcular
                                    valor
                                </button>

                                <button
                                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02]"
                                    onClick={cadastrarCorrida}
                                >
                                    <CgPoll className="h-5 w-5" /> Solicitar
                                    corrida
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <ImageCorridaIllustration />
                    </div>
                </div>
            </div>
        </div>
    );
}
