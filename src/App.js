import React from 'react';
import './CSS/App.css';
import Register from './Components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dishes from './Components/Dishes/Dishes';
import Cuisines from './Components/Cuisines/Cuisines';
import Restaurants from './Components/Restaurants/Restaurants';
import DishDetail from './Components/Dishes/DishDetail';
import CuisineDetail from './Components/Cuisines/CuisineDetail';
import RestaurantDetail from './Components/Restaurants/RestaurantDetail';
import ErrorBoundary from './Components/ErrorBoundary';
import NotFound from './Components/NotFound';

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/dishes' element={<Dishes />} />
          <Route path='/dishes/:id' element={<DishDetail />} />
          <Route path='/cuisines' element={<Cuisines />} />
          <Route path='/cuisines/:id' element={<CuisineDetail />} />
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/restaurants/:id' element={<RestaurantDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
