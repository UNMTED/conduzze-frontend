/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CardCorrida from "../../components/corrida/cardcorrida/CardCorrida";
import type { Corrida } from "../../models/Corrida";
import { buscar } from "../../services/Service";

function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [corridas, setCorridas] = useState<Corrida[]>([]);

    useEffect(() => {
        buscarCorridas();
    }, [corridas.length]);

    async function buscarCorridas() {
        try {
            setIsLoading(true);

            await buscar("/corridas", setCorridas);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mt-20 p-8">
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
                    {corridas
                        .slice()
                        .reverse()
                        .map((corrida) => (
                            <CardCorrida
                                onSuccess={buscarCorridas}
                                key={corrida.id}
                                corrida={corrida}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}

export default Home;
