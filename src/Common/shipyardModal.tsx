import React, { useEffect, useState } from 'react';
import { Location } from "../Schema/systemSchema";
import { buyShip, findAvailableShipsAtShipyard } from '../Api';
import { ShipyardShip } from '../Schema/fleetSchema';
import { useSnackbar } from 'notistack';


type Ship = ShipyardShip;



type Props = {
  open: boolean;
  onClose: () => void;
  selectedShipyard?: Location;
  availableShips?: Ship[];
  onPurchase?: (shipId: string) => void;
};

const formatBool = (value: boolean) => (value ? "Oui" : "Non");

const ShipyardModal: React.FC<Props> = ({ open, onClose, selectedShipyard, onPurchase }) => {
    const [availableShips, setAvailableShips] = useState<Ship[]>([]);
    const [selectedShip, setSelectedShip] = useState<ShipyardShip | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    
    const getShipsAvailableAtShipyard = async () => {
      if (!selectedShipyard) return;
      setIsLoading(true);
      try {
        const shipList = await findAvailableShipsAtShipyard(selectedShipyard);
        setAvailableShips(Array.isArray(shipList) ? shipList : []);
      } catch (error) {
        console.error("Error fetching available ships:", error);
        setAvailableShips([]);
        enqueueSnackbar('Erreur lors du chargement des vaisseaux', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    }

    const buySelectedShip = async (ship: ShipyardShip) => {
      if (!selectedShipyard) return;
      setIsPurchasing(true);
      try {
        await buyShip(ship, selectedShipyard);
        enqueueSnackbar(`Vaisseau ${ship.name} acheté avec succès!`, { variant: 'success' });
        setSelectedShip(null);
       
        await getShipsAvailableAtShipyard();
      } catch (error: any) {
        console.error("Error buying ship:", error);
        const errorMsg = error?.response?.data?.error?.message || 'Erreur lors de l\'achat du vaisseau';
        enqueueSnackbar(errorMsg, { variant: 'error' });
      } finally {
        setIsPurchasing(false);
      }
    }

    useEffect(() => {
      if (selectedShipyard) {
        getShipsAvailableAtShipyard();
      }
    }, [selectedShipyard]);
    
    if (!open) return null;

  

  

  return (
    <div className="shipyard-backdrop" onClick={onClose}>
      <div className="shipyard-modal" onClick={(e) => e.stopPropagation()}>
        <header className="shipyard-header">
          <h2>Détails du chantier spatial: {selectedShipyard?.symbol}</h2>
          <button onClick={onClose} className="shipyard-close-button" aria-label="Fermer">×</button>
        </header>
        <section className="shipyard-section">
          <h3>Détails du chantier spatial</h3>
          {selectedShipyard ? (
            <div className="shipyard-info-grid">
              <div className="shipyard-info-item">
                <span className="shipyard-info-label">Symbole</span>
                <span className="shipyard-info-value">{selectedShipyard.symbol}</span>
              </div>
              <div className="shipyard-info-item">
                <span className="shipyard-info-label">Système</span>
                <span className="shipyard-info-value">{selectedShipyard.systemSymbol}</span>
              </div>
              <div className="shipyard-info-item">
                <span className="shipyard-info-label">Type</span>
                <span className="shipyard-info-value">{selectedShipyard.type}</span>
              </div>
              <div className="shipyard-info-item">
                <span className="shipyard-info-label">Faction</span>
                <span className="shipyard-info-value">{selectedShipyard.faction?.symbol ?? "Aucune"}</span>
              </div>
              <div className="shipyard-info-item">
                <span className="shipyard-info-label">Coordonnées</span>
                <span className="shipyard-info-value">{selectedShipyard.x}, {selectedShipyard.y}</span>
              </div>
              <div className="shipyard-info-item">
                <span className="shipyard-info-label">En construction</span>
                <span className="shipyard-info-value">{formatBool(selectedShipyard.isUnderConstruction)}</span>
              </div>
            </div>
          ) : (
            <p>Aucun chantier sélectionné.</p>
          )}
        </section>

        <section className="shipyard-section">
          <div className="shipyard-section-header">
            <h3>Vaisseaux disponibles à l'achat</h3>
            {!isLoading && availableShips.length > 0 && (
              <span className="shipyard-count">{availableShips.length} vaisseau{availableShips.length > 1 ? "x" : ""}</span>
            )}
          </div>
          {isLoading ? (
            <div className="shipyard-loading">
              <p>Chargement des vaisseaux disponibles...</p>
            </div>
          ) : availableShips.length === 0 ? (
            <p className="shipyard-no-ships">Aucun vaisseau disponible à ce chantier.</p>
          ) : (
            <div className="shipyard-ships-list">
              {availableShips.map((s) => (
                <div key={s.type} className="shipyard-ship-card">
                  <div className="shipyard-ship-info">
                    <h4 className="shipyard-ship-name">{s.name ?? s.type}</h4>
                    <p className="shipyard-ship-type">Type: {s.type.replace('SHIP_', '')}</p>
                    {s.description && <p className="shipyard-ship-description">{s.description}</p>}
                    {s.purchasePrice && (
                      <p className="shipyard-ship-price">💰 {s.purchasePrice.toLocaleString()} credits</p>
                    )}
                  </div>
                  <button 
                    onClick={() => buySelectedShip(s)} 
                    disabled={isPurchasing}
                    className="shipyard-buy-button"
                  >
                    {isPurchasing ? 'Achat...' : 'Acheter'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="shipyard-footer">
          <button onClick={onClose} className="shipyard-secondary-button">Fermer</button>
        </footer>
      </div>
    </div>
  );
};

export default ShipyardModal;
