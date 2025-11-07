import React, { useEffect, useState } from "react";
import { buscar, deletar, cadastrar, atualizar } from "../../services/Service";
import Modal from "../../components/modal/Modal";
import type { Motorista } from "../../models/Motorista";

/**
 * Componente para renderizar estrelas com Emojis (sem instalação).
 */
function EmojiRating({ rating }: { rating: number }) {
  const roundedRating = Math.round(rating);
  const stars = "⭐".repeat(roundedRating);
  const emptyStars = "☆".repeat(5 - roundedRating);

  return (
    <div className="flex items-center gap-1 text-lg text-yellow-400">
      {stars}
      {emptyStars}
      <span className="ml-2 text-sm text-gray-300">({rating.toFixed(1)})</span>
    </div>
  );
}

// ===================================================================
// PÁGINA PRINCIPAL
// ===================================================================
export default function MotoristaPage() {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);

  useEffect(() => {
    buscar("/motoristas", setMotoristas);
  }, []);

  const salvar = async (e: any, motoristaId?: number): Promise<boolean> => {
    e.preventDefault();
    const form = new FormData(e.target);

    const payload = {
      nome: form.get("nome"),
      avaliacao: Number(form.get("avaliacao")),
      fotoUrl: form.get("fotoUrl") as string,
    };

    try {
      if (motoristaId) {
        await atualizar(`/motoristas/${motoristaId}`, payload, () => {});
      } else {
        await cadastrar("/motoristas", payload, () => {});
      }

      buscar("/motoristas", setMotoristas);
      return true; // SUCESSO
    } catch (err: any) {
      console.error("Erro detalhado ao salvar:", err);
      let errorMessage = "Erro ao salvar. Tente novamente.";
      if (
        err.response &&
        err.response.data &&
        (err.response.data.message || err.response.data.error)
      ) {
        errorMessage = `Erro da API: ${
          err.response.data.message || err.response.data.error
        }`;
      } else if (err.message) {
        errorMessage = err.message;
      }

      alert(errorMessage);
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
          textoBtn=""
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
                       flex flex-row relative group cursor-pointer
                       hover:shadow-lg hover:shadow-orange-500/30 
                       transition-all duration-300 h-36"
          >
            {/* Seção da Imagem - lado esquerdo */}
            <div className="w-2/5 md:w-1/3 relative">
              {m.fotoUrl ? (
                <img
                  src={m.fotoUrl}
                  alt={m.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Sem Foto</span>
                </div>
              )}

              {/* Botões de Hover */}
              <div
                className="absolute inset-0 flex flex-col gap-2 justify-center items-center 
                          bg-black/60 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300"
              >
                {/* BOTÃO EDITAR */}
                <Modal
                  trigger={
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 text-sm py-1 rounded-md font-semibold text-white bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    >
                      Editar
                    </button>
                  }
                  textoBtn=""
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
                    if (window.confirm(`Deseja excluir ${m.nome}?`)) {
                      await deletar(`/motoristas/${m.id}`);
                      buscar("/motoristas", setMotoristas);
                    }
                  }}
                  className="px-4 text-sm py-1 rounded-md font-semibold text-white bg-linear-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>{" "}
            {/* Seção do Conteúdo - lado direito */}
            <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
              <h2 className="text-xl font-bold text-white truncate mb-1">
                {m.nome}
              </h2>
              <div className="mt-1">
                <EmojiRating rating={m.avaliacao} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================================================================
// COMPONENTE DO FORMULÁRIO (ALTERAÇÃO FINAL)
// ===================================================================

interface FormularioProps {
  onSubmit: (e: any, motoristaId?: number) => Promise<boolean>;
  defaultValues?: Motorista | null;
  closeText: string;
}

function FormularioMotorista({
  onSubmit,
  defaultValues,
  closeText,
}: FormularioProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sucesso = await onSubmit(e, defaultValues?.id);

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
        console.error("API salvou, mas falhou ao fechar a modal:", domErr);
      }
    }
  };

  return (
    // ✅✅ ALTERAÇÃO FINAL: Adicionado 'mx-auto' para centrar
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72 mx-auto">
      <h3 className="text-xl font-bold text-center mb-2">
        {defaultValues ? "Atualizar Motorista" : "Novo Motorista"}
      </h3>

      <input
        name="nome"
        defaultValue={defaultValues?.nome}
        placeholder="Nome"
        required
        className="p-2 rounded bg-white/10"
      />

      <input
        name="avaliacao"
        type="number"
        min={0}
        max={5}
        step="0.5"
        defaultValue={defaultValues?.avaliacao}
        placeholder="Avaliação (0 a 5)"
        required
        className="p-2 rounded bg-white/10"
      />

      <input
        name="fotoUrl"
        defaultValue={defaultValues?.fotoUrl || ""}
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
