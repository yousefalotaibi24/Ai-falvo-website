import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDishById } from '../../api/dish';
import Nav from '../Nav';

const DishDetail = () => {
  const { id } = useParams();
  const { data: dish, isLoading, isError } = useQuery({
    queryKey: ['dish', id],
    queryFn: () => getDishById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading dish details</div>;
  }

  return (
    <div>
      <Nav />
      <h2>{dish.name}</h2>
      <img src={dish.image} alt={dish.name} />
      <p>{dish.description}</p>
      <p>Price: ${dish.price}</p>
      <div className='restaurants'>
        {Array.isArray(dish.restaurants) ? dish.restaurants.map(restaurant => (
          <div key={restaurant._id} className='restaurant'>
            {restaurant.name}
          </div>
        )) : dish.restaurants}
      </div>
    </div>
  );
};

export default DishDetail; 