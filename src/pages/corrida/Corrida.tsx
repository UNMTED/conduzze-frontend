import { CgTimer, CgPoll } from "react-icons/cg";
import { useState } from "react";

const NEW_IMAGE_URL = "https://i.imgur.com/A0vRUcr.png";

interface InputContainerProps {
  placeholder: string;
  markerColor: string;
}

const InputContainer: React.FC<InputContainerProps> = ({
  placeholder,
  markerColor,
}) => (

  <div
    className="relative flex items-center rounded-lg border border-slate-700 bg-slate-800/80 p-4 shadow-inner transition-all duration-200 focus-within:border-purple-400 hover:border-indigo-400"
  >

    <div className={`mr-4 h-3 w-3 rounded-full ${markerColor} shadow-md shadow-current`} />

    <input
      type="text"
      placeholder={placeholder}
      className="w-full bg-transparent text-lg font-medium text-white placeholder-slate-400 outline-none"
    />

    <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-10 focus-within:opacity-20 pointer-events-none" />
  </div>
);

const ImageCorridaIllustration = () => {
  return (
    <div
      className="relative flex h-[450px] w-full items-center justify-center overflow-hidden rounded-xl bg-transparent shadow-2xl shadow-conduzze-light/30"
    >

      <img
        src={NEW_IMAGE_URL} 
        alt="Ilustração da Corrida Conduzzé"
        className="h-full w-full object-fill opacity-70 transition-opacity duration-300 hover:opacity-100"
      />
    
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
    </div>
  );
};

export default function Corrida() {
  const [motorista, setMotorista] = useState("Selecione um motorista");

  const motoristasDisponiveis = [
    { name: "João Silva", rating: 4.8 },
    { name: "Maria Antunes", rating: 4.9 },
    { name: "Pedro Santos", rating: 4.7 },
  ];

  return (
    <div
      className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center gap-12 p-8 md:flex-row md:items-center md:justify-center md:gap-20 md:p-12"
    >
      <div className="w-full max-w-lg space-y-8 md:w-1/2 md:space-y-10">
        
        <h1
          className="text-5xl font-extrabold text-white sm:text-6xl"
        >
          Vá a qualquer lugar com o{" "}
          Condu<span className="text-[#F94147]">zzé</span> 
        </h1>

        <div
          className="rounded-2xl bg-slate-900/70 p-6 shadow-2xl backdrop-blur-sm"
        >
          <h2 className="mb-6 text-xl font-semibold text-white">
            Solicitar Corrida
          </h2>
          <div className="space-y-5">
            
            <InputContainer
              placeholder="Local de partida"
              markerColor="bg-red-500" 
            />

            <InputContainer
              placeholder="Local de chegada"
              markerColor="bg-cyan-400" 
            />

            <div className="relative">
              <div className="relative flex w-full cursor-pointer items-center rounded-lg border border-slate-700 bg-slate-800/80 p-4 text-white transition-all duration-200 hover:border-indigo-400">
                <CgTimer className="h-5 w-5 text-purple-400 ml-0.5 mr-3" /> 
                <select
                  value={motorista}
                  onChange={(e) => setMotorista(e.target.value)}
                  className="absolute inset-0 appearance-none pl-12 text-lg font-medium text-white mb-auto"
                >
                  <option disabled className="text-black">Selecione um motorista</option>
                  {motoristasDisponiveis.map((d) => (
                    <option key={d.name} value={d.name} className="text-black">
                      {d.name} ({d.rating} Estrelas)
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 text-slate-400">
                  &#9660; 
                </span>
              </div>
            </div>

            <div>
              <button
                className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-500/30"
                onClick={() =>
                  alert(`Solicitação para: ${motorista} (Simulação)`)
                }
              >
                Ver valores e solicitar
                <CgPoll className="ml-2 inline-block h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <ImageCorridaIllustration />
      </div>
    </div>
  );
}