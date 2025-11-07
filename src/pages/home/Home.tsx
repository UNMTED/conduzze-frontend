/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CardCorrida from "../../components/cardcorrida/CardCorrida";
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
        <div className="flex  justify-around gap-4 p-8">
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                corridas.map((corrida) => (
                    <CardCorrida
                        key={corrida.id}
                        corrida={corrida}
                    />
                ))
            )}
        </div>
    );
}
export default Home;
