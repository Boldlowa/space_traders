import { Card } from "@mui/material";
import {Location} from "../Schema/systemSchema";
type location = {
    location: Location;
}

export function CurrentLocationCard({ location }: location) {
  return (
    <Card className="current-location-card" sx={{ backgroundColor: "#1e293b", color: "#f8f8f8", padding: 2 }}>
      <h3>Current Location</h3>
      <p><strong>Symbol:</strong> {location.symbol}</p>
      <p><strong>Type:</strong> {location.type}</p>
      <p><strong>Coordinates:</strong> ({location.x}, {location.y})</p>
    </Card>
  );
}