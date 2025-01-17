import React from 'react'
import { Formik,Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

// THIS FILE IS RFC FORMIK Function Component
function FormikContainer() {
    const dropdownOptions = [
        { key: 'Select an option', value: '' },
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' }
    ]
    const radioOptions = [
        { key: 'Option 1', value: 'rOption1' },
        { key: 'Option 2', value: 'rOption2' },
        { key: 'Option 3', value: 'rOption3' }
    ]
    const checkboxOptions = [
        { key: 'Option 1', value: 'cOption1' },
        { key: 'Option 2', value: 'cOption2' },
        { key: 'Option 3', value: 'cOption3' }
    ]
    const initialValues = {
        email: '',
        description: '',
        selectOption: '',
        radioOptions: '',
        checkboxOptions: [],
        birthDate: null
        
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        description: Yup.string().required('Required'),
        selectOption: Yup.string().required('Required'),
        radioOptions: Yup.string().required('Required'),
        checkboxOptions: Yup.array().required('Required'),
        birthDate: Yup.date().required('Required').nullable()
    })
    const onSubmit = values => {
        console.log('Form data', values)
        console.log('Saved data', JSON.parse(JSON.stringify(values)))
    }
    
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnBlur={true}>
            {
                Formik => ( 
                <Form>
                    <FormikControl control='input' type='email' label='Email' name='email'  /><br/>
                    <FormikControl control='textarea' label='Description' name='description' /><br/>
                    <FormikControl control='select' label='Select a topic' name='selectOption' options={dropdownOptions} /><br/>
                    <FormikControl control='radio' label='Radio topic' name='radioOptions' options={radioOptions} /><br/>
                    <FormikControl control='checkbox' label='Checkbox topics' name='checkboxOptions' options={checkboxOptions} /><br/>
                    <FormikControl control='date' label='Pick a date' name='birthDate' /><br/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>

    )
}

export default FormikContainer
