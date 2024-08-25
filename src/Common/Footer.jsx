import React, { useContext } from 'react'
import AssistantIcon from '@mui/icons-material/Assistant';
import '../Styles/Footer.scss'
import MyContext from './MyContext';

const Footer = () => {

const {handelclick3,handelclick4,handelclick5,handelclick6,handelclick8} = useContext(MyContext)


  return (
    <>
    <div className='footer_main'>
      <div className='footer_main_first'>
      <div>
        <li onClick={handelclick5}>Website</li>
        <li onClick={handelclick6}>Category</li>
        <li>Elements</li>
      </div>
      <div>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
      </div>
      <div>
        <li>Brand</li>
        <li>Best Seller</li>
      </div>
      <div>
        <li>FAQs</li>
        <li>About Us</li>
        <li>Contact Us</li>
      </div>
      </div>
      <div className='footer_main_second'>
        <h4>Next Product Launch</h4>
        <span className='footer_main_second_icon'><AssistantIcon/></span>
      </div>
    </div>

    <div className='footer_main2'>
    <div className='footer_main2_first' onClick={() => window.location.href='/'}>NIR .</div>
    <div className='footer_main2_second'>
    <div className='second_main1' onClick={handelclick8}>Contact-Us</div>
    <div className='second_main2' onClick={handelclick4}>Sign-Up</div>
    <div className='second_main2' onClick={handelclick3}>Registrstion</div>
    </div>
    <div className='third_main'>T & C</div>
    </div>

    <div className='footer_main3'>
    <div className='footer_main3_first' onClick={() => window.location.href='/'}>NIR .</div>
    <div className='footer_main3_second'>
    <div className='third_main1' onClick={handelclick8}>Contact-Us</div>
    </div>
    </div>

    </>
  )
}

export default Footer
