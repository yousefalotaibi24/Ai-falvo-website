import React from 'react'
import { Formik,Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './Formik/FormikControl'
import { useNavigate,NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import { register } from '../api/auth'
import '../CSS/Register.css';





const initialValues = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  
}
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required')
  .min(8, 'Password must be at least 8 characters')
  .max(15, 'Password must be less than 15 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
})





function Register  () {

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: () => {
        alert("Registered")
        navigate("/login")
    },
})

  const onSubmit = (formData) => {
    mutation.mutate(formData)
    console.log(formData)
}


  return (
    <div className='register-container'>
      <header className='header'>
        <h1 className='logo'>Flavo</h1>
      </header>
      <h2>Register to your account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='register-form'>
            <FormikControl control='input' type='text' label='Name' name='name' placeholder='Enter your name' />
            <FormikControl control='input' type='text' label='Username' name='username' placeholder='Enter your username' />
            <FormikControl control='input' type='email' label='Email' name='email' placeholder='Enter your email' />
            <FormikControl control='input' type='password' label='Password' name='password' placeholder='Password' />
            <FormikControl control='input' type='password' label='Confirm Password' name='confirmPassword' placeholder='Confirm Password' />
            <button type='submit' disabled={!formik.isValid}>Register</button>
          </Form>
        )}
      </Formik>
      <p>Already registered? <NavLink to='/login'>Click Here</NavLink></p>
    </div>
    
  )}

export default Register

