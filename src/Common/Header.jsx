import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import MyContext from './MyContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FaHeart } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import "../Styles/Header.scss"



const Header = () => {

  const {cart,userdata,handelclick5,token,handlecartopen,openaccount,setOpenaccount} = useContext(MyContext)


  return (
    
    <div className='header_main'>
      <div className='header_main_left'>
      <h2 onClick={handelclick5}>NIR .</h2>
      </div>

      <div className='header_main_right'>

      {token ?
      <span onClick={() =>setOpenaccount(!openaccount)} style={{backgroundColor:'rgba(255, 0, 0, 0.393)'}} className='logout'>< IoMdArrowDropdown/>{userdata&& userdata.firstname}</span> :
      <Button color="success" className='header_button' onClick={() =>window.location.href='/login'}><AccountCircleIcon style={{fontSize:30}}/></Button>
      }


      
      <Button onClick={handlecartopen}><ShoppingCartIcon style={{fontSize:25}}/>{cart?cart.length:0}</Button>
      <Button onClick={() => window.location.href='/wish'}><FaHeart style={{fontSize:25}}/></Button>


      </div>

    </div>
      
  )
}

export default Header
