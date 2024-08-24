import React, { useContext } from 'react'
import '../Styles/Contact.scss'
import { FaFacebookSquare } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaTwitterSquare } from "react-icons/fa";
import { FaGooglePlusSquare } from "react-icons/fa";
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField'
import MyContext from '../Common/MyContext';





const Contact = () => {
  const {setOpen,setMessage,setLoader} = useContext(MyContext)
  const formik = useFormik({
    initialValues: {
    name:'',
    email:'',
    mobileNo:'',
    message:'',
    },
    
    validationSchema:yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Enter a valid email address').required('Email Address is required'),
      mobileNo: yup.string().required('Mobile No is required'),
      message: yup.string().required('message is required'), 
      }),
    
      onSubmit: async(values,{ resetForm }) => {
        setLoader(true)
     const response=   await fetch('https://back-end-xi-nine.vercel.app/contact' ,{
          method: 'POST',
          body:JSON.stringify(values),
          headers: {
            'Content-type': 'application/json',
            },
        })
      const data=await response.json()

      if(data.success===true){
        // alert(data.message)
    setMessage(data.message)
        setOpen(true)
        resetForm()
      }

      else{
        setMessage(data.error)
        setOpen(true)
      }
      setLoader(false)
    }
    });

  return (
    <div className='contact_main'>

      <div className='contact_details'>
        <div className='location'>
            <h2>LOCATION</h2>
            <p>D-105 
            Nirvan Clinic <br />
            Makarpura St Depot 
            Vadodara <br />
            390010</p>
        </div>

        <div className='follow_us'>
            <h2>FOLLOW US</h2>
            <div className='follow_us_icons'>
            <span> <FaFacebookSquare /></span>
            <span><PiInstagramLogoFill /></span>
            <span><FaTwitterSquare /></span>
            <span><FaGooglePlusSquare /></span>

            </div>

            <h5>@2024 Privacy Policy</h5>
        </div>

      </div>

      <form className='contact_form' onSubmit={formik.handleSubmit}>
         <h2>contact form</h2>

         <TextField
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name} 
          label="Name"
          variant="standard"
          className='textfield_all'
          InputLabelProps={{
            style:{color:'black', fontWeight:'bold'}
          }}
          />

         <TextField 
         id="email"
         email="email"
         value={formik.values.email}
         onChange={formik.handleChange}
         error={formik.touched.email && Boolean(formik.errors.email)}
         helperText={formik.touched.email && formik.errors.email} 
         label="Email"
         variant="standard"
         className='textfield_all'
         InputLabelProps={{
          style:{color:'black', fontWeight:'bold'}
        }}
         />

          <TextField
          id="mobileNo"
          name="mobileNo"
          value={formik.values.mobileNo}
          onChange={formik.handleChange}
          error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
          helperText={formik.touched.mobileNo && formik.errors.mobileNo} 
          label="Mobile No"
          variant="standard"
          className='textfield_all'
          InputLabelProps={{
            style:{color:'black', fontWeight:'bold'}
          }}
          />

         <TextField
         id="message"
         message="message"
         rows={4}
         multiline
         value={formik.values.message}
         onChange={formik.handleChange}
         error={formik.touched.message && Boolean(formik.errors.message)}
         helperText={formik.touched.message && formik.errors.message} 
         label="Message"
         variant='standard'
         className='textfield_all'
         InputLabelProps={{
          style:{color:'black', fontWeight:'bold'}
        }}
         />
         
         <Button variant="contained" className='contact_form_button' type='submit'>SUBMIT</Button>

      </form>

      
    
    </div>
    
  )
}

export default Contact
