const eChart = {
  series: [1500, 1200, 9000, 6780, 3000], // Ventas totales inventadas para cada año
  options: {
    chart: {
      width: '100%',
      type: 'pie',
    },
    labels: [
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
    ],
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        return `${'$' + opts.w.globals.series[opts.seriesIndex].toLocaleString()}`; // Formato de moneda con comas
      }
    },
    title: {
      text: 'Total Ingreso',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#263238'
      }
    },
    colors: ['#CD5C5C', '#F08080', '#FA8072', '#E9967A', '#FFA07A'], // Paleta de colores personalizada
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },
};

export default eChart;
