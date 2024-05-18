const lineChart = {
    series: [
      {
        name: '2024',
        data: [31, 40, 28, 51, 42, 109, 100, 90, 120, 150, 160, 170]
      },
      {
        name: '2023',
        data: [11, 32, 45, 32, 34, 52, 41, 60, 70, 80, 90, 100]
      }
    ],
    
    options: {
      chart: {
        width: "100%",
        height: 400,
        type: "area",
        toolbar: {
          show: false,
        },
        margin: {
          top: 50,
          right: 20,
          bottom: 20,
          left: 20
        }
      },
    
      grid: {
        padding: {
            top: -20,
          right: 20,
          bottom: 90,
          left: 20
        }
      },
    
      legend: {
        show: true,
        position: 'top',
        offsetY: 5 // Ajusta este valor según sea necesario
      },
    
      dataLabels: {
        enabled: false,
      },
    
      colors: ['#B01818', '#F0693E'],
      
      stroke: {
        curve: "smooth",
      },
    
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
        title: {
          text: 'Clientes Nuevos',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238'
          }
        }
      },
    
      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: [
          "Ene", "Feb", "Mar", "Abr", "May", "Jun",
          "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ],
      },
    
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  
  export default lineChart;
  