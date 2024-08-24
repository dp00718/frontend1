import React, { useContext, useEffect } from 'react'
import '../Styles/Alert.scss'
import MyContext from './MyContext'
import { MdDoneAll } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";



const Alert = () => {

  const {open,setOpen,message} = useContext(MyContext)

  useEffect(()=>{
    if(open){
        setTimeout(() => {
            setOpen(false)
        },3000);
    }
  })

  
const backgroundColor = message.includes('Thanks')?'green':'red'

const icon = backgroundColor === 'green' ?  <MdDoneAll /> :  <IoIosAlert />;


  return (

    <>

    {
        open &&
        <div>
        <div class="alert" style={{backgroundColor}}>
      <span> {icon} </span>
        <i class="fa-regular fa-circle-check"></i>
      {message}
      </div>
    </div>
    }
   
    </>
  
  )
}


export default Alert
