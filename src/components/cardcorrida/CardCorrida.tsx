const CardCorrida = ({
  driverName = "Aguardando Motorista...",
  userName = "Passageiro Desconhecido",
  fare = 0,
  status = "Em andamento",
}) => {
  const statusConfig = {
    "Em andamento": { text: "text-emerald-500", bg: "bg-emerald-500/10" },
    Finalizada: { text: "text-indigo-400", bg: "bg-indigo-400/10" },
    Cancelada: { text: "text-red-500", bg: "bg-red-500/10" },
    Aguardando: { text: "text-yellow-500", bg: "bg-yellow-500/10" },
  }[status] || { text: "text-gray-400", bg: "bg-gray-400/10" };

  const formattedFare = fare.toFixed(2).replace(".", ",");

  return (
    <div className="group relative flex w-80 flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
      <div className="absolute inset-0 rounded-xl from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-all duration-300 group-hover:opacity-30" />
      <div className="absolute inset-px rounded-[11px] bg-slate-950" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg from-indigo-500 to-purple-500">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white">
              Detalhes da Corrida
            </h3>
          </div>
          <span
            className={`flex items-center gap-1 rounded-full ${statusConfig.bg} px-2 py-1 text-xs font-medium ${statusConfig.text}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                statusConfig.text
              } ${statusConfig.bg.replace("/10", "")}`}
            />
            {status}
          </span>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-3">
          <div className="rounded-lg bg-slate-900/50 p-3">
            <p className="text-xs font-medium text-slate-400">Motorista</p>
            <p className="text-lg font-semibold text-white">{driverName}</p>
          </div>
          <div className="rounded-lg bg-slate-900/50 p-3">
            <p className="text-xs font-medium text-slate-400">Passageiro</p>
            <p className="text-lg font-semibold text-white">{userName}</p>
          </div>
          <div className="rounded-lg bg-slate-900/50 p-3">
            <p className="text-xs font-medium text-slate-400">Valor</p>
            <p className="text-lg font-semibold text-white">
              R$ {formattedFare}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">
              Corrida em tempo real
            </span>
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <button className="flex items-center gap-1 rounded-lg from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600">
            Ver mais detalhes
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCorrida;
