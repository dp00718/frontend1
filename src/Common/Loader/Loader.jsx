import React, { useContext } from 'react'
import '../../Styles/Loader.scss'
import MyContext from '../MyContext'



const Loader = () => {

const {loader} = useContext(MyContext)

    return (

<>
{
    loader &&

    <div class="loader-main">
    <div class="loader"></div>
  </div>
}
  </>
  )
}

export default Loader
