import CardCorrida from "../../components/cardcorrida/CardCorrida";

function Home() {

  return (
    
    <div className="min-h-screen"> 
      
      <div className="pt-24 pb-8 px-4 md:px-8">
        
        <h2 className="text-3xl font-bold text-white text-center mb-10">
            Histórico de Corridas
        </h2>

        <div 
          
          className="flex flex-wrap justify-center gap-8" 
        >
          
          <CardCorrida driverName="João Silva" fare={18.5} status="Em andamento" />

          <CardCorrida
            driverName="Maria Antunes"
            fare={0}
            status="Cancelada"
            userName="Mano"
          />

          <CardCorrida driverName="Pedro Santos" fare={45.99} status="Finalizada" />
          
          <CardCorrida driverName="Aguardando Motorista..." fare={22.0} status="Aguardando" />

        </div>
      </div>
    </div>
  );
}

export default Home;