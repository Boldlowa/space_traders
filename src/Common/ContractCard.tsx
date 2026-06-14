import { Button, Card, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Contract } from "../Schema/contractsSchema";
import { acceptContract } from "../Api";

type ContractCardProps = {
  contract: Contract;
};

export function ContractCard({ contract }: ContractCardProps) {
  const { enqueueSnackbar } = useSnackbar();

  const handleAcceptContract = async () => {
    try {
      const success = await acceptContract(contract.id);

      if (success) {
        enqueueSnackbar(`Contrat accepté avec succès ! Premier versement de ${contract.terms.payment.onAccepted} reçu.`, { variant: "success" });
      } else {
        enqueueSnackbar("Impossible d'accepter le contrat.", { variant: "error" });
      }
    } catch (error) {
      console.error("Error accepting contract:", error);
      enqueueSnackbar("Erreur lors de l'acceptation du contrat. Veuillez réessayer.", { variant: "error" });
    } 
  };

  return (
    <Card className="contract-card" sx={{ backgroundColor: "#1e293b", color: "#f8f8f8", padding: 2 }}>
      <div className="contract-card-header">
        <Typography variant="h6" component="h3">
          {contract.type} · {contract.factionSymbol}
        </Typography>
        <div className="contract-status">
          <span className={`contract-badge ${contract.accepted ? "accepted" : "pending"}`}>
            {contract.accepted ? "Accepté" : "À accepter"}
          </span>
          <span className={`contract-badge ${contract.fulfilled ? "fulfilled" : "open"}`}>
            {contract.fulfilled ? "Rempli" : "Ouvert"}
          </span>
        </div>
      </div>

      <Typography className="contract-field">
        <strong>ID :</strong> {contract.id}
      </Typography>
      <Typography className="contract-field">
        <strong>Expiration :</strong> {contract.expiration}
      </Typography>
      <Typography className="contract-field">
        <strong>Deadline acceptation :</strong> {contract.deadlineToAccept}
      </Typography>
      <Typography className="contract-field">
        <strong>Paiement :</strong> {contract.terms.payment.onAccepted} / {contract.terms.payment.onFulfilled}
      </Typography>
      <Typography className="contract-field">
        <strong>Livraisons :</strong>
      </Typography>
      <ul className="contract-deliver-list">
        {contract.terms.deliver.map((item, index) => (
          <li key={index}>
            {item.tradeSymbol} → {item.destinationSymbol} : {item.unitsFulfilled}/{item.unitsRequired}
          </li>
        ))}
      </ul>
      <Button variant="contained" color="primary" disabled={contract.accepted} sx={{ marginTop: 2 }} onClick={handleAcceptContract}>
        {contract.accepted ? "Accepté" : "Accepter"}
      </Button>
    </Card>
  );
}
