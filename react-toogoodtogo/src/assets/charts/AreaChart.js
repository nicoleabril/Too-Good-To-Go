import ReactApexChart from "react-apexcharts";
import areaChart from "./configs/areaChart";
import "../styles/graficas.css"

function AreaChart() {
  return (
    <>
      <div className="chart-container">
        <ReactApexChart
          options={areaChart.options}
          series={areaChart.series}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </>
  );
}

export default AreaChart;

