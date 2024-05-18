const barChart = {
    series: [
      {
        name: '2024',
        data: [45, 48, 47, 52, 53, 61, 75, 70, 80, 85, 88, 92]
      },
      {
        name: '2023',
        data: [30, 34, 32, 35, 37, 42, 46, 50, 54, 58, 60, 64]
      }
    ],
    
    options: {
      chart: {
        width: "100%",
        height: 400,
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
        margin: {
          top: 50,
          right: 20,
          bottom: 20,
          left: 20
        },
        zoom: {
            enabled: true
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
    
      colors: ['#B01818', '#F0693E'], // Cambia los colores según tu preferencia
      
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 3,
          borderRadiusApplication: 'end', // 'around', 'end'
          borderRadiusWhenStacked: 'last', // 'all', 'last'
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '8px',
                fontWeight: 500
              }
            }
          }
        },
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
          text: 'Total Ordenado',
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
            return `$${val}`; // Formato de moneda
          },
        },
      },
    },
  };
  
  export default barChart;
  