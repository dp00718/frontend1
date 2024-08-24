import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MyContext from '../Common/MyContext';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../Styles/Signup.scss'



const Signup = () => {
  const {setOpen,setMessage,setLoader,showPassword,setShowPassword,showPassword1,setShowPassword1,handelclick1,handelclick5} = useContext(MyContext)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

const formik = useFormik({
    initialValues: {
    UserName:'',
    MobileNo:'',
    Email:'',
    Password:'',
    ConfirmPassword:'',
    },
    
    validationSchema:yup.object({
      UserName: yup.string().required('User Name is required'),
      MobileNo: yup.string().required('Only Numeric is required'),
      Email: yup.string().email('Enter a valid email address').required('Email Address is required'), 
      Password: yup.string().required('Enter a valid password'),
      ConfirmPassword: yup.string().required('Confirm-Password should be match with password'),
      }),
    
      onSubmit: async(values,{ resetForm }) => {
        setLoader(true)
        const response= await fetch('https://back-end-xi-nine.vercel.app/signup' ,{
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


    <div className='signup_main'>

    <form className='signup_page' onSubmit={formik.handleSubmit}>

          <h2>Sign-Up Details</h2>

    <div className='signup_name'>
        
       <TextField
          id="UserName"
          label="User-Name"
          value={formik.values.UserName}
          onChange={formik.handleChange}
          error={formik.touched.UserName && Boolean(formik.errors.UserName)}
          helperText={formik.touched.UserName && formik.errors.UserName} 
          className='signup_page_main'
        />

        <TextField
          id="MobileNo"
          label="Mobile.No"
          value={formik.values.MobileNo}
          onChange={formik.handleChange}
          error={formik.touched.MobileNo && Boolean(formik.errors.MobileNo)}
          helperText={formik.touched.MobileNo && formik.errors.MobileNo} 
          className='signup_page_main'
        />

        <TextField
          id="Email"
          label="Email-ID"
          value={formik.values.Email}
          onChange={formik.handleChange}
          error={formik.touched.Email && Boolean(formik.errors.Email)}
          helperText={formik.touched.Email && formik.errors.Email} 
          className='signup_page_main'
        />
       
        <TextField
          id="Password"
          label="Password"
          type={showPassword1 ? 'password' : 'text'}
          value={formik.values.Password}
          onChange={formik.handleChange}
          error={formik.touched.Password && Boolean(formik.errors.Password)}
          helperText={formik.touched.Password && formik.errors.Password}
          className='signup_page_main'
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword1}
                  edge="end"
                >
                  {showPassword1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),}}
        />

        <TextField
          id="ConfirmPassword"
          label="Confirm-Password"
          type={showPassword ? 'password' : 'text'}
          value={formik.values.ConfirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.ConfirmPassword && Boolean(formik.errors.ConfirmPassword)}
          helperText={formik.touched.ConfirmPassword && formik.errors.ConfirmPassword}
          className='signup_page_main'
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

        <Button variant="contained"  className='signup_page_button' type='submit'>SUBMIT</Button>
        <h4 className='signup_close' onClick={handelclick1}>Login</h4>

        <span className='login_close_button' onClick={handelclick5}><HighlightOffIcon/></span> 
        
        </form>

    </div>
  )
}

export default Signup
