import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRestaurantById } from '../../api/restaurant';
import Nav from '../Nav';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { data: restaurant, isLoading, isError } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading restaurant details</div>;
  }

  return (
    <div>
      <Nav />
      <h2>{restaurant.name}</h2>
      <img src={restaurant.logo} alt={restaurant.name} />
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
  );
};

export default RestaurantDetail; 