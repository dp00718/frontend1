import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const MyContextProvider = ({children}) => {
const [open,setOpen] = useState(false)
const [message,setMessage] = useState('')
const [showPassword, setShowPassword] = useState(true);
const [showPassword1, setShowPassword1] = useState(true);
const [loader,setLoader] = useState(false)
const [open1,setOpen1] = useState(false)
const [login,setLogin] = useState(false)
const [edit,setEdit] = useState(false)
const [userdata,setUserdata] = useState(()=>{
  const storeduser = sessionStorage.getItem('user');
  return storeduser? JSON.parse(storeduser):null
})


const Navigate = useNavigate()
const[data,setData]=useState([])
useEffect(()=>{
  axios.get('https://back-end-xi-nine.vercel.app/api')
  .then((a)=>setData(a.data.data))
})
// token start

// token over
const [token,setToken] = useState(()=>{
  const storedToken = sessionStorage.getItem('token');
  return storedToken? storedToken:''
})
// for name and token close
const handelclick = () => {
    setToken('')
  
}
// Login page open
const handelclick1 = () =>{

 document.querySelector('body').style.overflow="hidden"
}

// Login page to be close
const handelclick2 = () => {
    sessionStorage.removeItem('user');
    setUserdata(null)   
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('shipping');
    sessionStorage.removeItem('wish');
    sessionStorage.removeItem('order');
    setToken('');
    setCart([])
    setShipping(null)
    setWish([])
    setOrder([])
    Navigate('/')
    setOpenaccount(false)
  }

// Registration page to be open
const handelclick3 = () => {
  Navigate('/registration')
  setLogin(false)
}

// Signup page to be open
const handelclick4 = () => {
  Navigate('/signup')
}

// home page to be open
const handelclick5 = () => {
  Navigate('/')
  setLogin(false)
}

// category page to be open
const handelclick6 = () => {
  Navigate('/category')
}

// open singleproductpage
const handelclick7 = () => {
  Navigate('/singleproduct')
}

// open contact us page
const handelclick8 = () => {
  Navigate('/contactus')
}

const [openaccount,setOpenaccount] = useState(false)


// Header page open and logout button to be close
// const handelclick9 = () => {
//   Navigate('/')
// }

// close login and signup page by giving navigation


const handlecartopen =() =>{
  setCartopen(true)
  document.querySelector('body').style.overflow="hidden"
}
const handlecartclose =() =>{
  setCartopen(false)
  document.querySelector('body').style.overflow="auto"
}

// open cart
const [cartopen,setCartopen] = useState(false)
// for save cart data state start
const [cart, setCart] = useState(() => {
  const savedCart = sessionStorage.getItem('cart');
  try{
  return savedCart ? JSON.parse(savedCart) : [];
} catch(error){
  console.error('Error passing cart JSON:', error);
  return [];
}
});
// for save cart data state end
const[sizeerror,setSizeerror] = useState(false)
const[size,setSize]=useState(null)
const handlecart = async(categoryid,productid,productimg,productname,productprice) =>{

  if(!token){
    window.location.href='/login'
    return
  }
if(!size){
  setSizeerror(true)
  return
}

const response = await fetch('https://back-end-xi-nine.vercel.app/add-to-cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({categoryid,productid,productimg,productname,productprice,size})
})

const data = await response.json()

if(data.success){
  alert(data.message)
  sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
  setCart(data.cartInfo)
  setSize('')
}else{
  alert(data.error)

  setSize('')
}

}

const handleIncreaseQuantity = async (categoryid,productid,size) => {
  try {

    setLoader(true)
    const response = await fetch('https://back-end-xi-nine.vercel.app/increase-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid,size })
    });

    const data = await response.json();
    if(data.success){
      alert(data.message)
      sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      setCart(data.cartInfo)

   
    }else{
      alert(data.error)
   
     
    }
    
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }finally{
    setLoader(false)
  }
};


const handleDecreaseQuantity = async (categoryid,productid,size) => {
  try {

    setLoader(true)
    const response = await fetch('https://back-end-xi-nine.vercel.app/decrease-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid,size })
    });

    const data = await response.json();
    if(data.success){
      alert(data.message)
      sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      setCart(data.cartInfo)
   
    
    }else{
      alert(data.error)

    
    }
    
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }finally{
    setLoader(false)
  }
};

const removeProductFromCart = async (categoryid,productid,size) => {
  try {

    setLoader(true)
    const response = await fetch('https://back-end-xi-nine.vercel.app/remove-from-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid,size })
    });

    const data = await response.json();
    if(data.success){
      alert(data.message)
      sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      setCart(data.cartInfo)
  
    }else{
      alert(data.error)
      
   
    }
    
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }finally{
    setLoader(false)
  }
};


const TotalValue =cart && cart.reduce((acc, item) => acc + (item.productprice * item.quantity), 0);


const [shipping,setShipping] = useState(()=>{
  const storedShipping = sessionStorage.getItem('shipping');
  try{
  return storedShipping? JSON.parse(storedShipping):null
} catch(error){
  console.error('Error passing shipping JSON:', error);
  return null;
}
});

const [wish, setWish] = useState(() => {
  const savedwish = sessionStorage.getItem('wish');
  try{
  return savedwish ? JSON.parse(savedwish) : [];
} catch(error){
  console.error('Error passing wish JSON:', error);
  return [];
}
});

const handlewish = async(categoryid,productid,productimg,productname,productprice) =>{
  if(!token){
setMessage('please login first')
alert(true)
setTimeout(() => {
setLogin()
}, (3000));
return;
  }


   setLoader(true)
   const response = await fetch('https://back-end-xi-nine.vercel.app/add-to-wish', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({categoryid,productid,productimg,productname,productprice})
   })

   const data = await response.json()

   if(data.success){
     alert(data.message)
     sessionStorage.setItem('wish', JSON.stringify(data.wishInfo));
     setWish(data.wishInfo)

   }else{
     alert(data.error)
   
   }
   setLoader(false)
  
 }


const removeProductFromWish = async (categoryid,productid) => {
  try {

    setLoader(true)
    const response = await fetch('https://back-end-xi-nine.vercel.app/remove-from-wish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid })
    });

    const data = await response.json();
    if(data.success){
      alert(data.message)
      sessionStorage.setItem('wish', JSON.stringify(data.wishInfo));
      setWish(data.wishInfo)
    
    }else{
      alert(data.error)
     
    }
    
    
  } catch (error) {
    console.error('Error removing from wish:', error);
  }finally{
    setLoader(false)
  }
};


 const isProductInWish = (categoryid,productid) => {
  if (wish) {
      return wish.find(item =>item.categoryid===categoryid && item.productid === productid );
  }
  return false;
};

const [order, setOrder] = useState(() => {
  const savedorder = sessionStorage.getItem('wish');
  try{
  return savedorder ? JSON.parse(savedorder) : [];
} catch(error){
  console.error('Error passing order JSON:', error);
  return [];
}
});


const  generateCaptcha = () =>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [enter, setEnter] = useState('');
    const [error, setError] = useState(false);

  
  
    const handleRefresh = () => {
      setCaptcha(generateCaptcha());
      setEnter('')
      setError(false)
    };
  
    const handleSubmit = async () => {
      if (enter === captcha) {
        setEnter('');
        setLoader(true);
    
        try {
          const response = await fetch('https://back-end-xi-nine.vercel.app/add-to-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ orderDate: new Date() })
          });
    
          const data = await response.json();
    
          if (data.success) {
            alert(data.message);
            sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
            sessionStorage.setItem('order', JSON.stringify(data.orderInfo));
            setCart(data.cartInfo);
            setOrder(data.orderInfo);
            window.location.href='/confirm'
          } else {
            alert(data.error);
          }
        } catch (error) {
          console.error('Error during order submission:', error);
          setMessage('An error occurred while processing your order. Please try again.');
        } finally {
          setLoader(false);
        }
      } else {
        setError(true);
        setCaptcha(generateCaptcha());
      }
    };

    const removeProductFromOrder = async (categoryid,productid) => {
      try {
    
        setLoader(true)
        const response = await fetch('https://back-end-xi-nine.vercel.app/remove-from-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ categoryid,productid })
        });
    
        const data = await response.json();
        if(data.success){
          alert(data.message)
          sessionStorage.setItem('order', JSON.stringify(data.orderInfo));
          setOrder(data.orderInfo)
        
        }else{
          alert(data.error)
         
        }
        
        
      } catch (error) {
        console.error('Error removing from wish:', error);
      }finally{
        setLoader(false)
      }
    };

return (
<MyContext.Provider value={{removeProductFromOrder,handleSubmit,handleRefresh,error, setError,enter, setEnter,captcha, setCaptcha,generateCaptcha,order, setOrder,wish, setWish,handlewish,removeProductFromWish,isProductInWish,edit,setEdit,shipping,setShipping,TotalValue,handleIncreaseQuantity,handleDecreaseQuantity,removeProductFromCart,cart, setCart,userdata,setUserdata,openaccount,setOpenaccount,handlecart,size,setSize,sizeerror,setSizeerror,login,setLogin,data,handlecartclose,handelclick8,handlecartopen,cartopen,setCartopen,setShowPassword1,showPassword1,handelclick1,handelclick2,handelclick3,handelclick4,handelclick5,handelclick6,open1,setOpen1,handelclick,token,setToken,open,setOpen,message,setMessage,showPassword,setShowPassword,loader,setLoader,handelclick7}} >
{children}
</MyContext.Provider>
)
}

export default MyContextProvider