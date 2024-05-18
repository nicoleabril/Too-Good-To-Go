import ReactApexChart from "react-apexcharts";
import eChart from "./configs/eChart";

function EChart() {
  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={eChart.options}
          series={eChart.series}
          type="pie"
          height={400}
          width={400}
        />
      </div>
    </>
  );
}

export default EChart;
