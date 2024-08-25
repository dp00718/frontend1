import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';
import './Cart.scss';



const Cart = () => {
  const { cart,TotalValue, setCart,cartopen, handlecartclose, handleDecreaseQuantity, handleIncreaseQuantity, removeProductFromCart, token } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://back-end-xi-nine.vercel.app/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setCart(data.cartInfo);
        sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      } catch (error) {
      alert(error.message)
      } finally {
       
        setLoading(false); 
      }
    };

    fetchCartItems();
  }, [setCart, token]);

  // if (loading) {
  //   return <p>Loading...</p>; 
  // }

  return (
    <>
      {cartopen && (
        <div className="all">
          <div className="overlay">
            <h2 onClick={handlecartclose}>NIR .</h2>
          </div>
          <div className="sidebar-menu">
            <span onClick={handlecartclose} className="cart_main_close">
              <h4>CLOSE</h4>
            </span>
          

            <p>{TotalValue}</p>

            
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <div className="cart_item" key={item.productid + item.size}>
                  <div className="cart_productimg">
                    <img src={item.productimg} alt="" height={100} width={100} />
                  </div> 
                  <div className="cart_item_controls">
                    <p>{item.size}</p>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleDecreaseQuantity(item.categoryid, item.productid, item.size)}>-</button>
                    <p>{item.quantity}</p>
                    <button onClick={() => handleIncreaseQuantity(item.categoryid, item.productid, item.size)}>+</button>
                    <button onClick={() => removeProductFromCart(item.categoryid, item.productid, item.size)}>Remove</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}

              <button onClick={() =>window.location.href='/checkout'}>checkout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
