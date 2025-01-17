import React from 'react'
import { Formik,Form } from 'formik'
import * as Yup from 'yup'
import { login } from '../api/auth'
import FormikControl from './Formik/FormikControl'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, NavLink } from "react-router-dom";
import "../CSS/App.css"
import '../CSS/Login.css';
const initialValues = {
  username: '',
  // email: '',
  password: '',
}
const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  // email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string().required('Required'),
})





function Login() {

const navigate = useNavigate();

// const [invalidPass, setInvalidPass] = useState(false)

const mutation = useMutation({
        mutationFn: (formData) => login(formData),
        onSuccess: () => {
            alert("Logged In")
            navigate("/home")
        },
        // onError: () => setInvalidPass(true)
    })

  const onSubmit = (fromData) => {
    mutation.mutate(fromData)
    // navigate('/home')
    console.log('Form data', fromData)
  }




  return (
    <div className='login-container'>
      <header className='header'>
        <h1 className='logo'>Flavo</h1>
      </header>
      <h2 className='heading'>Login to your account</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {formik => (
          <Form className='login-form'>
            <FormikControl control='input' type='text' label='Username' name='username' />
            <FormikControl control='input' type='password' label='Password' name='password' />
            <button type='submit' disabled={!formik.isValid}>Submit</button>
          </Form>
        )}
      </Formik>
      <p className='msg'>Not yet registered? <NavLink to='/'>Click Here</NavLink></p>
    </div>
  )
  



}

export default Login

