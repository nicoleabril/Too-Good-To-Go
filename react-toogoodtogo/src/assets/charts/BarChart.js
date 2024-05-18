import ReactApexChart from "react-apexcharts";
import barChart from "./configs/barChart";

function BarChart() {

  return (
    <>
      <ReactApexChart
        className="full-width"
        options={barChart.options}
        series={barChart.series}
        type="bar"
        height={400}
        width={400}
      />
    </>
  );
}

export default BarChart;
