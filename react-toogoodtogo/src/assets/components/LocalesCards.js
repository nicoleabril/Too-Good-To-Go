import React from 'react';
import '../styles/localCards.css'
const LocalesCards = () => {
  const restaurants = [
    {
      name: 'Kung Fu Tea',
      rating: 3.8,
      comments: '250+',
      description: 'Batidos y bebidas con un toque especial.',
    },
    {
      name: "Domino's",
      rating: 4.0,
      comments: '78+',
      description: 'Pizza realizada con los mejores ingredientes para su paladar.',
    },
    {
      name: "Victoriano's Pizza",
      rating: 4.1,
      comments: '28+',
      description: 'Pizza como si fuera hecha en casa.',
    },
    {
      name: 'Las Empanadas del Paco',
      rating: 4.7,
      comments: '198+',
      description: 'Empanadas de distintos sabores, todas deliciosas.',
    },
  ];

  return (
    <div className="restaurant-cards-container">
      {restaurants.map((restaurant) => (
        <div key={restaurant.name} className="restaurant-card">
          <div className="restaurant-info">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <div className="rating">
              <span>{restaurant.rating}</span> ★ <span>{restaurant.comments}</span>
            </div>
          </div>
          <button>COMPRAR AHORA</button>
        </div>
      ))}
    </div>
  );
};

export default LocalesCards;