import '../styles/statisticsCards.css';

const StatisticsCards = ({ datos, selectedIndex, setSelectedIndex}) => {

  const handleCardClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className='contenedorStatisticDashboard'>
      <h1>Estadísticas</h1>
      {datos.map((producto, index) => (
        <div
          className={`card ${selectedIndex === index ? 'selected' : ''}`}
          key={index}
          onClick={() => handleCardClick(index)}
        >
          <div className='contenidoCard'>
            <div id='iconoEstadistica'>
              {producto.icon}
            </div>
            <div id='infoPlato'>
              <h3>{producto.number}</h3>
              <div>
                <p className='inline'>{producto.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
