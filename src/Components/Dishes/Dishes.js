import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllDishes } from '../../api/dish';
import Nav from '../Nav';
import '../../CSS/Dishes.css';
import { useNavigate } from 'react-router-dom';

const Dishes = () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/';
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dish'],
    queryFn: getAllDishes,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/dishes/${id}`);
  };

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (isError) {
    return <div className='error'>Error loading dishes</div>;
  }

  return (
    <div>
      <Nav />
      <h2>Dishes</h2>
      <div className='dish-grid'>
        {data?.map((dish) => (
          <div key={dish._id} className='dish-card' onClick={() => handleCardClick(dish._id)}>
            <img src={dish.image} alt={dish.name} className='dish-image' />
            <h3>{dish.name}</h3>
            <p>Owner: {dish.owner}</p>
            <div className='restaurants'>
              {Array.isArray(dish.restaurants) ? dish.restaurants.map(restaurant => (
                <div key={restaurant._id} className='restaurant'>
                  {restaurant.name}
                </div>
              )) : dish.restaurants}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dishes; 