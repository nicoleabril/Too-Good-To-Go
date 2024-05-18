import ReactApexChart from "react-apexcharts";
import eChart from "./configs/eChart";
import "../styles/graficas.css"
function EChart() {
  return (
    <>
      <div className="chart-container">
        <ReactApexChart
            options={eChart.options}
            series={eChart.series}
            type="pie"
            height="100%"
            width="100%"
          />
      </div>
    </>
  );
}

export default EChart;
