import React from 'react'
import Nav from './Nav'
import '../CSS/Profile.css'
import { logout } from '../api/auth'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './Formik/FormikControl'
import { createRestaurant } from '../api/restaurant'
import { createDish } from '../api/dish'
import { useMutation } from '@tanstack/react-query'
import { getAllRestaurants, deleteRestaurant, editRestaurant } from '../api/restaurant';
import { getAllDishes, deleteDish, editDish } from '../api/dish';
import { getUserInfo } from '../api/user';

const Profile = () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/';
  }

  const dropdownOptions = [
    { key: 'Select cuisine', value: '' },
    { key: 'Kuwaiti', value: 'option1' },
    { key: 'Asia', value: 'option2' },
    { key: 'Indian', value: 'option3' },
    { key: 'Japan', value: 'option4' },
    { key: 'American', value: 'option5' },
  ];

  const initialValues = {
    restaurantName: '',
    cuisine: '',
    description: '',
    branch: '',
    location: '',
    workingHours: '',
    socialMedia: '',
    image: '',
    dishName: '',
    dishDescription: '',
    price: '',
    dishImage: '',
  };

  const { data: restaurantsData } = useQuery({ queryKey: ['restaurants'], queryFn: getAllRestaurants });
  const { data: dishesData } = useQuery({ queryKey: ['dishes'], queryFn: getAllDishes });
  const { data: userInfo } = useQuery({ queryKey: ['user'], queryFn: getUserInfo });

  const addRestaurantMutation = useMutation(createRestaurant);
  const editRestaurantMutation = useMutation(editRestaurant);
  const deleteRestaurantMutation = useMutation(deleteRestaurant);

  const addDishMutation = useMutation(createDish);
  const editDishMutation = useMutation(editDish);
  const deleteDishMutation = useMutation(deleteDish);

  const handleRestaurantSubmit = (formData) => {
    console.log('Submitting Restaurant Form:', formData);
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    addRestaurantMutation.mutate(formDataObj);
  };

  const handleDishSubmit = (formData) => {
    console.log('Submitting Dish Form:', formData);
    addDishMutation.mutate(formData);
  };

  const handleLogout = () => {
    logout().then(() => {
      window.location.href = '/';
    });
  };

  return (
    <div>
      <Nav />

      <h1 style={{ textAlign: 'center' }}>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className='profile'>
        <div className='profile-info'>
          <h2>User Information</h2>
          {userInfo ? (
            <div>
              <p>Name: {userInfo.name}</p>
              <p>Email: {userInfo.email}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className='forms-container'>
          <div className='restaurant-form'>
            <h2>Add Restaurant</h2>
            <Formik initialValues={initialValues} onSubmit={handleRestaurantSubmit}>
              {formik => (
                <Form>
                  <FormikControl control='input' type='text' label='Restaurant Name' name='restaurantName' value={formik.values.restaurantName} onChange={formik.handleChange} />
                  <FormikControl control='select' label='Cuisine' name='cuisine' options={dropdownOptions} value={formik.values.cuisine} onChange={formik.handleChange} />
                  <FormikControl control='input' type='text' label='Description' name='description' value={formik.values.description} onChange={formik.handleChange} />
                  <FormikControl control='input' type='text' label='Branch' name='branch' value={formik.values.branch} onChange={formik.handleChange} />
                  <FormikControl control='input' type='text' label='Location' name='location' value={formik.values.location} onChange={formik.handleChange} />
                  <FormikControl control='input' type='text' label='Working Hours' name='workingHours' value={formik.values.workingHours} onChange={formik.handleChange} />
                  <FormikControl control='input' type='text' label='Social Media' name='socialMedia' value={formik.values.socialMedia} onChange={formik.handleChange} />
                  <FormikControl control='input' type='file' label='Image' name='image' onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])} />
                  <button type='submit'>Add Restaurant</button>
                </Form>
              )}
            </Formik>
          </div>
          <div className='dish-form'>
            <h2>Add Dish</h2>
            <Formik initialValues={initialValues} onSubmit={handleDishSubmit}>
              {formik => (
                <Form>
                  <FormikControl control='input' type='text' label='Dish Name' name='dishName' value={formik.values.dishName} onChange={formik.handleChange} />
                  <FormikControl control='input' type='text' label='Description' name='dishDescription' value={formik.values.dishDescription} onChange={formik.handleChange} />
                  <FormikControl control='input' type='number' label='Price' name='price' value={formik.values.price} onChange={formik.handleChange} />
                  <FormikControl control='input' type='file' label='Image' name='dishImage' onChange={(event) => formik.setFieldValue('dishImage', event.currentTarget.files[0])} />
                  <button type='submit'>Add Dish</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile