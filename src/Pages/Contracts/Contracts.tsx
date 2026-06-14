import { useEffect, useState } from "react";
import { getMyContracts } from "../../Api";
import { Contract } from "../../Schema/contractsSchema";
import { ContractCard } from "../../Common/ContractCard";
import { useAgent } from "../../AgentContext";
import "./Contracts.css";

function Contracts() {
  const { refreshAgent } = useAgent();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isContractsLoading, setIsContractsLoading] = useState(false);
  const [contractsError, setContractsError] = useState("");

  const loadMyContracts = async () => {
    setIsContractsLoading(true);
    setContractsError("");

    try {
      const result = await getMyContracts();
      setContracts(result.data ?? []);
    } catch {
      setContractsError("Impossible de charger les contrats");
      setContracts([]);
    } finally {
      setIsContractsLoading(false);
    }
  };

  const handleContractAccepted = async () => {
    // Rafraîchir l'agent et recharger les contrats après acceptation
    await refreshAgent();
    await loadMyContracts();
  };

  useEffect(() => {
    loadMyContracts();
  }, []);

  return (
    <section className="contracts-page">
      <div className="contracts-header">
        <div>
          <h2>Contrats</h2>
          <p>Vos missions actives affichées avec le schéma de contrat.</p>
        </div>
        <span className="contracts-count">{contracts.length} contrat{contracts.length > 1 ? "s" : ""}</span>
      </div>

      {isContractsLoading ? (
        <p className="contracts-loading">Chargement des contrats...</p>
      ) : contractsError ? (
        <p className="contracts-error">{contractsError}</p>
      ) : (
        <div className="contracts-grid">
          {contracts.length > 0 ? (
            contracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} onAcceptSuccess={handleContractAccepted} />
            ))
          ) : (
            <p className="contracts-empty">Aucun contrat disponible.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Contracts;
