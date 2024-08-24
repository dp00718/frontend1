import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import '../Styles/Registration.scss'
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MyContext from '../Common/MyContext';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';



const Registration = () => {
  const {setOpen,setMessage,setLoader,showPassword,setShowPassword,handelclick2} = useContext(MyContext)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const formik = useFormik({
    initialValues: {
    firstname:'',
    lastname:'',
    emailaddress:'',
    password:'',
    },
    
    validationSchema:yup.object({
      firstname: yup.string().required('First Name is required'),
      lastname: yup.string().required('Last Name is required'),
      emailaddress: yup.string().email('Enter a valid email address').required('Email Address is required'), 
      password: yup.string().required('Enter a valid password'),
      }),
    
      onSubmit: async(values,{ resetForm }) => {
        setLoader(true)
        const response= await fetch('https://back-end-xi-nine.vercel.app/registration' ,{
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
    <div className='registration_main'>
      

        <form className='registration_page' onSubmit={formik.handleSubmit}>
          <h3>Registration Form</h3>
        <div className='registration_name'>
        
       <TextField
          id="firstname"
          label="First Name"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname} 
          className='first_name'
          variant="standard"
          // InputLabelProps={{
          //   style:{color:'black', fontWeight:'bold'}
          // }}
        />
        <TextField
          id="lastname"
          label="Last Name"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname} 
          className='last_name'
          variant="standard"
          // InputLabelProps={{
          //   style:{color:'black', fontWeight:'bold'}
          // }}
        />
        </div>

        <div className='email_main'>
     
        <TextField
          id="emailaddress"
          label="Email Address"
          value={formik.values.emailaddress}
          onChange={formik.handleChange}
          error={formik.touched.emailaddress && Boolean(formik.errors.emailaddress)}
          helperText={formik.touched.emailaddress && formik.errors.emailaddress} 
          className='email_password'
          variant="standard"
        />

        </div>

        <div className='password_main'>
       
        <TextField
          id="password"
          label="Password"
          type={showPassword ? 'password' : 'text'}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          className='email_password'
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),}}
          
        />

        </div>

        <Button variant="contained"  className='registration_page_button' type='submit' onClick={handelclick2}>SUBMIT</Button>
        <Button onClick={handelclick2}>Close</Button>

        </form>

        <link to="/registration"/>

    </div>
  )
}

export default Registration
