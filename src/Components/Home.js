import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { getAllCuisines } from '../api/cuisine'
import { getAllRestaurants } from '../api/restaurant'
import { getAllDishes } from '../api/dish'
import '../CSS/Home.css';

const Home = () => {
  const [cuisines, setCuisines] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    // Fetch data from APIs
    getAllCuisines().then(data => setCuisines(data));
    getAllRestaurants().then(data => setRestaurants(data));
    getAllDishes().then(data => setDishes(data));
  }, []);

  useEffect(() => {
    const scrollContainers = document.querySelectorAll('.scroll-container');
    scrollContainers.forEach(container => {
      container.addEventListener('wheel', (event) => {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      scrollContainers.forEach(container => {
        container.removeEventListener('wheel', (event) => {
          container.scrollLeft += event.deltaY;
        });
      });
    };
  }, []);

  const handleCuisineClick = (cuisineId) => {
    console.log('Cuisine clicked:', cuisineId);
    const filtered = restaurants.filter(restaurant => {
      console.log('Checking restaurant:', restaurant);
      return restaurant.cuisineId === cuisineId;
    });
    console.log('Filtered restaurants:', filtered);
    setFilteredRestaurants(filtered);
  };

  return (
    <div>
      <Nav />
      <div className='container'>
        <h2>Cuisines</h2>
        <div className='scroll-container'>
          {cuisines.map(cuisine => (
            <div key={cuisine._id} className='card' onClick={() => handleCuisineClick(cuisine._id)}>
              <img src={cuisine.image} alt={cuisine.name} className='card-image'/>
              <h3>{cuisine.name}</h3>
            </div>
          ))}
        </div>
        <h2>Restaurants</h2>
        <div className='scroll-container'>
          {(filteredRestaurants.length > 0 ? filteredRestaurants : restaurants).map(restaurant => (
            <div key={restaurant.id} className='card'>
              <img src={restaurant.image} alt={restaurant.name} className='card-image'/>
              <h3>{restaurant.name}</h3>
            </div>
          ))}
        </div>
        <h2>Dishes</h2>
        <div className='scroll-container'>
          {dishes.map(dish => (
            <div key={dish.id} className='card'>
              <img src={dish.image} alt={dish.name} className='card-image'/>
              <h3>{dish.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home