import ReactApexChart from "react-apexcharts";
import barChart from "./configs/barChart";
import "../styles/graficas.css"
function BarChart() {

  return (
    <>
      <div className="chart-container">
        <ReactApexChart
          className="full-width"
          options={barChart.options}
          series={barChart.series}
          type="bar"
          height="100%"
          width="100%"
        />
      </div>
    </>
  );
}

export default BarChart;
