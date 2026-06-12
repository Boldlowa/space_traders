import { ScatterChart } from "@mui/x-charts";

export default function XYDataChart() {
  // Example X/Y dataset
  const dataset = [
    { x: 1, y: 3 },
    { x: 2, y: 7 },
    { x: 3, y: 4 },
    { x: 4, y: 9 },
    { x: 5, y: 6 },
  ];

  return (
    <div style={{ width: 500, height: 400 }}>
      <ScatterChart
        xAxis={[{ label: "X Axis" }]}
        yAxis={[{ label: "Y Axis" }]}
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
