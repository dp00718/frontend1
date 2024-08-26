import Contact from '../src/Page/Contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from '../src/Page/Registration';
import Alert from '../src/Common/Alert';
import Loader from '../src/Common/Loader/Loader';
import Header from '../src/Common/Header';
import Cart from '../src/Common/cart/Cart';
import Singleproduct from '../src/Page/Singleproduct';
import Home from '../src/Common/Home';
import Product from '../src/Page/Product';
import Single from '../src/Page/Single';
import Accountmodal from '../src/Page/Accountmodal';
import Information from '../src/Page/Information';
import Checkout from '../src/Checkout/Checkout';
import Payment from '../src/Payment/Payment';
import Wishlist from '../src/Wishlist/Wishlist';
import Confirm from '../src/Confirm/Confirm';
import Order from '../src/Order/Order';
import Footer from '../src/Common/Footer';
import MyContextProvider from '../src/Common/MyContextProvider';
import Login from './Page/Login1';


function App() {
  return (
    <div>

<BrowserRouter>
<MyContextProvider>

<Header/>
<Cart/>
<Accountmodal/>
<Alert/>
<Loader/>
<Routes>
  
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/singleproduct' element={<Singleproduct/>}/>
        <Route path='/contactus' element={<Contact/>}/>
        <Route path='/category/:category' element={<Product/>}/>
        <Route path='/category/:category/:product1' element={<Single/>}/>
        <Route path='/account-information' element={<Information/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/wish' element={<Wishlist/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
        <Route path='/order' element={<Order/>}/>




   


</Routes>

<Footer/>


</MyContextProvider>
</BrowserRouter>

    </div>
  );
}

export default App;
