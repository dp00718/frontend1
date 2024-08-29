import React, { useContext } from 'react'
import '../Styles/Accountmodal.scss'
import { IoHome } from 'react-icons/io5'
import MyContext from '../Common/MyContext'

const Accountmodal = () => {

    const {openaccount,handelclick2} = useContext(MyContext)

  return (

    <>
    
    {
        openaccount &&

<div class="search-list">
    
<li onClick={() => window.location.href='/'}>
  <span><IoHome/></span>
  <span class="text">Home</span></li>
<li onClick={() => window.location.href='/account-information'}>
  <span><IoHome/></span>
  <span class="text">Account</span>
</li>
<li onClick={handelclick2}>
  <span><IoHome/></span>
  <span class="text" >Logout</span>
</li>


</div>
}
</>
 
  )
}

export default Accountmodal