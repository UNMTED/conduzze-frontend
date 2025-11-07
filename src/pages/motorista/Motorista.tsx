import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import type { Motorista } from "../../models/Motorista";
import { atualizar, buscar, cadastrar, deletar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function EmojiRating({ rating }: { rating: number }) {
    const roundedRating = Math.round(rating);
    const stars = "⭐".repeat(roundedRating);
    const emptyStars = "☆".repeat(5 - roundedRating);

    return (
        <div className="flex items-center gap-1 text-lg text-yellow-400">
            {stars}
            {emptyStars}
            <span className="ml-2 text-sm text-gray-300">
                ({rating.toFixed(1)})
            </span>
        </div>
    );
}

export default function Motorista() {
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    useEffect(() => {
        buscar("/motoristas", setMotoristas);
    }, []);
    function gerarAvaliacaoAleatoria(): number {
        return Math.floor(Math.random() * 5) + 1;
    }

    const salvar = async (
        e: any,
        avaliacao?: number,
        motoristaId?: number
    ): Promise<boolean> => {
        e.preventDefault();
        const form = new FormData(e.target);

        const payload: Motorista = {
            id: motoristaId as number,
            nome: form.get("nome") as string,
            foto: form.get("foto") as string,
            avaliacao,
        };

        try {
            if (motoristaId) {
                await atualizar(`/motoristas`, payload, () => {});
                ToastAlerta("Motorista atualizado com sucesso", "sucesso");
            } else {
                payload.avaliacao = gerarAvaliacaoAleatoria();
                await cadastrar("/motoristas", payload, () => {});
                ToastAlerta("Motorista cadastrado com sucesso", "sucesso");
            }

            await buscar("/motoristas", setMotoristas);
            return true;
        } catch (err) {
            ToastAlerta("Algo deu errado! falha na requisição", "erro");
            return false;
        }
    };

    return (
        <div className="p-6">
            {/* Título (igual) */}
            <h1 className=" mt-6 text-3xl font-bold text-center mb-4">
                Motoristas Condu{""}
                <span className="bg-linear-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                    zzé
                </span>
            </h1>

            {/* Botão Adicionar (igual) */}
            <div className="flex justify-center mb-10">
                <Modal
                    trigger={
                        <button className="mt-10 bg-linear-to-r from-orange-500 to-pink-600 hover:from-pink-700 hover:to-orange-600 px-6 py-2 rounded-lg font-semibold text-white">
                            Adicionar
                        </button>
                    }
                >
                    <FormularioMotorista
                        onSubmit={salvar}
                        closeText="Salvar"
                        defaultValues={null}
                    />
                </Modal>
            </div>

            {/* Grid (igual) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 max-w-7xl mx-auto">
                {motoristas.map((m: Motorista) => (
                    // Container do Card Principal
                    <div
                        key={m.id}
                        className="bg-blue-900/40 rounded-lg shadow-md overflow-hidden 
                       flex flex-col relative group
                       hover:shadow-lg hover:shadow-orange-500/30 
                       transition-all duration-300"
                    >
                        {/* Seção da Imagem - lado esquerdo */}
                        <div className="">
                            {m.foto ? (
                                <img
                                    src={m.foto}
                                    alt={m.nome}
                                    className="w-full aspect-video object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-video bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">
                                        Sem Foto
                                    </span>
                                </div>
                            )}
                        </div>{" "}
                        {/* Seção do Conteúdo - lado direito */}
                        <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                            <h2 className="text-xl font-bold text-white truncate mb-1">
                                {m.nome}
                            </h2>
                            <div className="mt-1">
                                <EmojiRating rating={m.avaliacao || 0} />
                            </div>

                            {/* Botões*/}
                            <div
                                className="inset-0 flex gap-2 justify-around items-center  
                          transition-opacity duration-300"
                            >
                                {/* BOTÃO EDITAR */}
                                <Modal
                                    trigger={
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-full px-4 text-sm py-1 cursor-pointer rounded-md font-semibold text-white bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                                        >
                                            Editar
                                        </button>
                                    }
                                >
                                    <FormularioMotorista
                                        onSubmit={salvar}
                                        closeText="Atualizar"
                                        defaultValues={m}
                                    />
                                </Modal>

                                {/* BOTÃO EXCLUIR */}
                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        if (
                                            window.confirm(
                                                `Deseja excluir ${m.nome}?`
                                            )
                                        ) {
                                            await deletar(
                                                `/motoristas/${m.id}`
                                            );
                                            ToastAlerta(
                                                "Motorista excluído com sucesso",
                                                "sucesso"
                                            );
                                            buscar(
                                                "/motoristas",
                                                setMotoristas
                                            );
                                        }
                                    }}
                                    className="w-full px-4 text-sm py-1 cursor-pointer rounded-md font-semibold text-white bg-linear-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface FormularioProps {
    onSubmit: (
        e: any,
        avaliacao: number | undefined,
        motoristaId?: number
    ) => Promise<boolean | void>;
    defaultValues?: Motorista | null;
    closeText: string;
}

interface FormularioProps {
    onSubmit: (
        e: any,
        avaliacao: number | undefined,
        motoristaId?: number
    ) => Promise<boolean | void>;
    defaultValues?: Motorista | null;
    closeText: string;
}

function FormularioMotorista({
    onSubmit,
    defaultValues,
    closeText,
}: FormularioProps) {
    const [totalCorridas, setTotalCorridas] = useState<MotoristaCorridas>();
    interface MotoristaCorridas {
        id: number;
        nome: string;
        foto: string;
        avaliacao: number;
        totalCorridas: number;
    }
    useEffect(() => {
        if (!defaultValues?.id) return;

        // usar buscar mas transformar o resultado em número
        buscar(`/motoristas/${defaultValues.id}/corridas`, setTotalCorridas);
    }, [defaultValues?.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sucesso = await onSubmit(
            e,
            defaultValues?.avaliacao,
            defaultValues?.id
        );

        if (sucesso) {
            try {
                const closeBtn = document.querySelector(
                    ".popup-content button[aria-label='Fechar']"
                ) as HTMLButtonElement;

                if (closeBtn) {
                    closeBtn.click();
                } else {
                    console.warn(
                        "Não foi possível encontrar o botão de fechar da modal."
                    );
                }
            } catch (domErr) {
                console.error(
                    "API salvou, mas falhou ao fechar a modal:",
                    domErr
                );
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-72 mx-auto"
        >
            <h3 className="text-xl font-bold text-center mb-2">
                {defaultValues ? "Atualizar Motorista" : "Novo Motorista"}
            </h3>

            {/* renderiza apenas número ou texto de loading */}
            {defaultValues?.id && (
                <p>
                    {totalCorridas === null
                        ? "Carregando total de corridas..."
                        : `Este motorista já fez ${totalCorridas?.totalCorridas} corrida(s)`}
                </p>
            )}

            <input
                name="nome"
                defaultValue={defaultValues?.nome}
                placeholder="Nome"
                required
                className="p-2 rounded bg-white/10"
            />

            <input
                name="foto"
                defaultValue={defaultValues?.foto || ""}
                placeholder="URL da Foto (opcional)"
                className="p-2 rounded bg-white/10"
            />

            <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 py-2 rounded"
            >
                {closeText}
            </button>
        </form>
    );
}
