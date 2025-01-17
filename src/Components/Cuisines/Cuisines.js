import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCuisines } from '../../api/cuisine';
import Nav from '../Nav';
import '../../CSS/Cuisines.css';
import { useNavigate } from 'react-router-dom';

const Cuisines = () => {
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    window.location.href = '/';
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cuisine'],
    queryFn: getAllCuisines,
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }
  if (isError) {
    return <div className='error'>Error loading cuisines</div>;
  }

  const handleCardClick = (id) => {
    navigate(`/cuisines/${id}`);
  };

  return (
    <>
      <Nav />
      <h2>Cuisines</h2>
      <div className='cuisine-grid'>
        {data?.map((cuisine) => (
          <div key={cuisine._id} className='cuisine-card' onClick={() => handleCardClick(cuisine._id)}>
            <img src={cuisine.image} alt={cuisine.name} className='cuisine-image' />
            <h3>{cuisine.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cuisines; 