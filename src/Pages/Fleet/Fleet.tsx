import { useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import "./Fleet.css";
import type { Location } from "../../Schema/systemSchema";
import { findShipyardwithLocation } from "../../Api";
import ShipyardModal from "../../Common/shipyardModal";

function Fleet() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipyardLocations, setShipyardLocations] = useState<Location[]>([]);
  const [selectedShipyard, setSelectedShipyard] = useState<Location | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const findShipyard = async (): Promise<void> => {
    setIsLoading(true);
    setError("");
    setSelectedShipyard(undefined);

    try {
      const locations = await findShipyardwithLocation();
      setShipyardLocations(locations);
    } catch (err) {
      console.error(err);
      setError("Impossible de trouver un chantier spatial.");
      setShipyardLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <><section className="fleet-page">
      <div className="fleet-header">
        <div>
          <h2>Flotte</h2>
          <p>Vos vaisseaux et leur statut actuel.</p>
        </div>
        
      </div>
      <Button variant="contained" color="primary" onClick={findShipyard} className="find-shipyard-btn">
        Trouver un chantier spatial
      </Button>

      {shipyardLocations.length > 0 ? (
        <div className="shipyard-list">
          {shipyardLocations.map((location: Location) => (
            <Card key={location.symbol} className="shipyard-card" sx={{ backgroundColor: "#1e293b", color: "#f8f8f8", padding: 2 }}>
              <div className="shipyard-card-header">
                <Typography variant="subtitle1">{location.symbol}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSelectedShipyard(location);
                    setIsModalOpen(true);
                  }}
                >
                  Détails
                </Button>
              </div>
              <Typography className="fleet-field"><strong>Type :</strong> {location.type}</Typography>
              <Typography className="fleet-field"><strong>Faction :</strong> {location.faction?.symbol ?? "Aucun"}</Typography>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
    <ShipyardModal open={isModalOpen} onClose={() => setIsModalOpen(false)} selectedShipyard={selectedShipyard} />
    </>
    
  );
}

export default Fleet;
