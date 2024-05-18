import ReactApexChart from "react-apexcharts";
import areaChart from "./configs/areaChart";
import "../styles/graficas.css"

function AreaChart() {

  return (
    <>
      <ReactApexChart
        className="full-width"
        options={areaChart.options}
        series={areaChart.series}
        type="area"
        height={400}
        width={400}
      />
    </>
  );
}

export default AreaChart;
