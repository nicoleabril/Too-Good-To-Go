import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Número de Procesos por Dirección</Title>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="bar"
        height={350}
        width={"75%"}
      />
    </>
  );
}

export default LineChart;
