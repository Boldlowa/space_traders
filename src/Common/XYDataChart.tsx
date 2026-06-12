import { ScatterChart } from "@mui/x-charts";

export default function XYDataChart() {
  // Example X/Y dataset
  const dataset = [
    { x: 10, y: 30 },
    { x: 20, y: 7 },
    { x: 30, y: 4 },
    { x: 40, y: 9 },
    { x: 50, y: 6 },
  ];

  return (
    <div style={{ width: 500, height: 400 }}>
      <ScatterChart
        series={[
          {
            label: "Sample Data",
            data: dataset,
            
          },
        ]}
      />
    </div>
  );
}
