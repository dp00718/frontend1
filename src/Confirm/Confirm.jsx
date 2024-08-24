import React, { useContext } from 'react'
import './Confirm.scss'
import { FaCheckCircle } from 'react-icons/fa';
import MyContext from '../Common/MyContext';

const Confirm = () => {
    const {token} = useContext(MyContext)
  return (
<>
    {token ?
        <div className="confirmation-container">
        <div className="confirmation-box">
          <div className="confirmation-icon">
            <FaCheckCircle />
          </div>
          <div className="confirmation-message">
            Your Order Has Been Placed
          </div>

          <div className='order-btn' onClick={() => window.location.href ='/order'}>Order Details</div>
        </div>
      </div>:

<div>D</div>
    }

    </>
  )
}

export default Confirm