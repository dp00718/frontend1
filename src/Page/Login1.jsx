import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../Styles/Login.scss'
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MyContext from '../Common/MyContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Login = () => {

  const {setWish, setOrder,setCart,setLogin,  setShipping,setUserdata,showPassword,setShowPassword,setOpen,setMessage,setLoader,setToken,handelclick5} = useContext(MyContext)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const formik = useFormik({
        initialValues: {
        Username:'',
        Password:'',
        },
        
        validationSchema:yup.object({
          Username: yup.string().required('Username is required'),
          Password: yup.string().required('Enter a valid password'),
          }),
    
          onSubmit: async(values,{ resetForm }) => {
            setLoader(true)
            const response = await fetch('https://back-end-xi-nine.vercel.app/login' ,{
              method: 'POST',
              body:JSON.stringify(values),
              headers: {
                'Content-type': 'application/json',
                },
            
            })
          
            const data=await response.json()

            if(data.success===true){
          setMessage(data.message)
              setOpen(true)
              setToken(data.data)
              setUserdata(data.accountInfo)
              sessionStorage.setItem('cart',JSON.stringify(data.cartInfo))  
              setCart(data.cartInfo)
              sessionStorage.setItem('user',JSON.stringify(data.accountInfo))  
              setShipping(data.shippingInfo);
              sessionStorage.setItem('shipping', JSON.stringify(data.shippingInfo));
              sessionStorage.setItem('wish', JSON.stringify(data.wishInfo));
              setWish(data.wishInfo)
              sessionStorage.setItem('token',data.data) 
              sessionStorage.setItem('order', JSON.stringify(data.orderInfo));
              setOrder(data.orderInfo)
              setWish(data.wishInfo)  
              setOrder(data.orderInfo)
              setLogin(false)
              resetForm()
              window.location.href='/'
            }
      
            else{
              setMessage(data.error)
              setOpen(true)
      
            }
            setLoader(false)
          }
        
        });

  return (
        <>
  
 
    
    <div className='login_main'>
      
    <h2 >Login Details</h2>

    <form className='login_page' onSubmit={formik.handleSubmit}>
    <span className='login_close_button' onClick={handelclick5}><HighlightOffIcon/></span> 

    <div className='login_page_main'>
      
    
   <TextField
      id="Username"
      label="email"
      value={formik.values.Username}
      onChange={formik.handleChange}
      error={formik.touched.Username && Boolean(formik.errors.Username)}
      helperText={formik.touched.Username && formik.errors.Username} 
      className='logindetails'
      variant="standard"
    
    /> <br />

    <TextField
      id="Password"
      label="Password"
      type={showPassword ? 'password' : 'text'}
      value={formik.values.Password}
      onChange={formik.handleChange}
      error={formik.touched.Password && Boolean(formik.errors.Password)}
      helperText={formik.touched.Password && formik.errors.Password}
      className='logindetails'
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

    <Button variant="contained"  className='registration_page_button' type='submit'>SUBMIT</Button>
    <div className='login_main_botton'>
     <h4>Not Registered Yet !</h4>
     <h4 className='login_register'  onClick={() =>window.location.href='/register'}>Register ?</h4>
    </div>

    </form>



</div>
</>

  )
}

export default Login
