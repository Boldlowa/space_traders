import { useEffect, useState } from "react";
import { Button, Card, Divider, Typography } from "@mui/material";
import "./Fleet.css";
import type { Location } from "../../Schema/systemSchema";
import type { Ship } from "../../Schema/fleetSchema";
import { findShipyardwithLocation, getMyFleet } from "../../Api";
import ShipyardModal from "../../Common/shipyardModal";
import { useAgent } from "../../AgentContext";

function Fleet() {
  const { refreshAgent } = useAgent();
  const [fleet, setFleet] = useState<Ship[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipyardLocations, setShipyardLocations] = useState<Location[]>([]);
  const [selectedShipyard, setSelectedShipyard] = useState<Location | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadFleet = async () => {
    setIsLoading(true);
    setError("");
    try {
      const ships = await getMyFleet();
      setFleet(ships);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement de la flotte.");
      setFleet([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleModalClose = async () => {
    setIsModalOpen(false);
    // Rafraîchir l'agent et la flotte quand on ferme le modal
    await refreshAgent();
    await loadFleet();
  };

  useEffect(() => {
    loadFleet();
  }, []);

  return (
    <>
      <section className="fleet-page">
        <div className="fleet-header">
          <div>
            <h2>Flotte</h2>
            <p>Vos vaisseaux et leur statut actuel.</p>
          </div>
          <span className="fleet-count">{fleet.length} vaisseau{fleet.length > 1 ? "x" : ""}</span>
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
<Divider sx={{ margin: "24px 0", borderColor: "#334155" }} />
        {isLoading ? (
          <p className="fleet-loading">Chargement de la flotte...</p>
        ) : error ? (
          <p className="fleet-error">{error}</p>
        ) : fleet.length > 0 ? (
          <div className="fleet-grid">
            {fleet.map((ship) => (
              <Card key={ship.symbol} className="ship-card" sx={{ backgroundColor: "#1e293b", color: "#f8fafc", padding: 2 }}>
                <div className="ship-card-header">
                  <Typography variant="h6" className="ship-name">{ship.registration.name}</Typography>
                  <span className={`ship-status ${ship.nav.status.toLowerCase()}`}>{ship.nav.status}</span>
                </div>
                
                <div className="ship-info-grid">
                  <div className="ship-info-item">
                    <span className="ship-label">Rôle</span>
                    <span className="ship-value">{ship.registration.role}</span>
                  </div>
                  <div className="ship-info-item">
                    <span className="ship-label">Type</span>
                    <span className="ship-value">{ship.frame.name}</span>
                  </div>
                  <div className="ship-info-item">
                    <span className="ship-label">Localisation</span>
                    <span className="ship-value">{ship.nav.waypointSymbol}</span>
                  </div>
                  <div className="ship-info-item">
                    <span className="ship-label">Mode vol</span>
                    <span className="ship-value">{ship.nav.flightMode}</span>
                  </div>
                </div>

                <div className="ship-resources">
                  <div className="resource-bar">
                    <span className="resource-label">Carburant</span>
                    <div className="resource-progress">
                      <div 
                        className="resource-fill fuel" 
                        style={{ width: `${(ship.fuel.current / ship.fuel.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="resource-value">{ship.fuel.current}/{ship.fuel.capacity}</span>
                  </div>
                  
                  <div className="resource-bar">
                    <span className="resource-label">Cargo</span>
                    <div className="resource-progress">
                      <div 
                        className="resource-fill cargo" 
                        style={{ width: `${(ship.cargo.units / ship.cargo.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="resource-value">{ship.cargo.units}/{ship.cargo.capacity}</span>
                  </div>
                </div>

                <div className="ship-crew-morale">
                  <div className="crew-info">
                    <span>👥 Équipage: {ship.crew.current}/{ship.crew.capacity}</span>
                  </div>
                  <div className="morale-info">
                    <span>😊 Moral: {ship.crew.morale}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="fleet-empty">Aucun vaisseau disponible. Achetez un vaisseau dans un chantier spatial!</p>
        )}
      </section>
      <ShipyardModal open={isModalOpen} onClose={handleModalClose} selectedShipyard={selectedShipyard} />
    </>
  );
}

export default Fleet;
