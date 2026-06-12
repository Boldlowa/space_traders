import { Card, Typography } from "@mui/material";
import { SystemItem } from "../Api";

type SystemCardProps = {
  system: SystemItem;
};

export function SystemCard({ system }: SystemCardProps) {
  return (
    <Card className="system-card" sx={{ backgroundColor: "#1e293b", color: "#f8f8f8", padding: 2 }}>
      <Typography>{system.name}</Typography>
    </Card>
  );
}

