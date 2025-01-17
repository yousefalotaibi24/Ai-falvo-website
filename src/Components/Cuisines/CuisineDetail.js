import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCuisineById } from '../../api/cuisine';
import Nav from '../Nav';

const CuisineDetail = () => {
  const { id } = useParams();
  const { data: cuisine, isLoading, isError } = useQuery({
    queryKey: ['cuisine', id],
    queryFn: () => getCuisineById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading cuisine details</div>;
  }

  return (
    <div>
      <Nav />
      <h2>{cuisine.name}</h2>
      <img src={cuisine.image} alt={cuisine.name} />
      <div className='restaurants'>
        {Array.isArray(cuisine.restaurants) ? cuisine.restaurants.map(restaurant => (
          <div key={restaurant._id} className='restaurant'>
            {restaurant.name}
          </div>
        )) : cuisine.restaurants}
      </div>
    </div>
  );
};

export default CuisineDetail; 