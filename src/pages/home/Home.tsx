import CardCorrida from "../../components/cardcorrida/CardCorrida";

function Home() {
  return (
    <div className="flex  justify-around gap-4 p-8">
      <CardCorrida driverName="João Silva" fare={18.5} status="Em andamento" />

      <CardCorrida
        driverName="Maria Antunes"
        fare={0}
        status="Cancelada"
        userName="Mano"
      />

      <CardCorrida driverName="Pedro Santos" fare={45.99} status="Finalizada" />
    </div>
  );
}
export default Home;
