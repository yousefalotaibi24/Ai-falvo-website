import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllRestaurants } from '../../api/restaurant';
import Nav from '../Nav';
import '../../CSS/Restaurants.css';
import { useNavigate } from 'react-router-dom';

const Restaurants = () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/';
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getAllRestaurants,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  });

  const [expandedRestaurant, setExpandedRestaurant] = useState(null);

  const toggleRestaurantInfo = (id) => {
    setExpandedRestaurant(expandedRestaurant === id ? null : id);
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }
  if (isError) {
    return <div className='error'>Error: {error.message}</div>;
  }

  return (
    <div>
      <Nav />
      <h2>Restaurants</h2>
      <div className='restaurant-grid'>
        {data?.map((restaurant) => (
          <div key={restaurant._id} className='restaurant-card' onClick={() => handleCardClick(restaurant._id)}>
            <img src={restaurant.logo} alt={restaurant.name} className='restaurant-logo' />
            <h3>{restaurant.name}</h3>
            <button onClick={() => toggleRestaurantInfo(restaurant._id)} className='toggle-info-btn'>
              {expandedRestaurant === restaurant._id ? 'Hide Details' : 'Show Details'}
            </button>
            {expandedRestaurant === restaurant._id && (
              <div className='restaurant-info'>
                <p>{restaurant.info}</p>
                <p>Phone: {restaurant.phone}</p>
                <p>Link: <a href={restaurant.link} target='_blank' rel='noopener noreferrer'>{restaurant.link}</a></p>
                <p>Working Hours: {typeof restaurant.workingHours === 'object' ? JSON.stringify(restaurant.workingHours) : restaurant.workingHours}</p>
                <p>Cuisine: {typeof restaurant.cuisine === 'object' ? JSON.stringify(restaurant.cuisine) : restaurant.cuisine}</p>
                <div className='dishes'>
                  {Array.isArray(restaurant.dishes) ? restaurant.dishes.map(dish => (
                    <div key={dish._id} className='dish'>
                      {dish.name}
                    </div>
                  )) : restaurant.dishes}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants; 