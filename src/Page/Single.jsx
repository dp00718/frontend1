import React, { useContext } from 'react';
import MyContext from '../Common/MyContext';
import { useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaHeart } from 'react-icons/fa';
import '../Styles/Single.scss';  // Make sure to import the SCSS file
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { yellow } from '@mui/material/colors';

const Single = () => {
    const { data,sizeerror,handlecart,size,setSize,handlewish,isProductInWish,loader } = useContext(MyContext);
    const { category, product, product1 } = useParams();


    return (
        <div className="product">
            {
                data
                    .filter(outer => outer.product_category === category)
                    .map((outer) => {
                        return (
                            <>
                                {
                                    outer.product_container
                                    .filter(inner => inner.product_name === product1)
                                    .map((inner) => {
                                        return (
                                            <>
                                            {
                                                inner.product
                                                .map((inner1) => {
                                                    return (
                                                        <>
                                                    <div className="product-item">
                                                    <img src={inner1.imgs} alt="" />
                                                    <h3>{inner1.single_product_category}</h3>
                                                    <p className='product_star'><StarBorderPurple500Icon style={{background:'yellow', fontSize:20}}/>{inner1.rating}</p>
                                                    <p className="price">{inner1.product_price}</p>
    
                                                    <div className="size-list">
                                                        {
                                                            inner1.size_main.map((s) => {
                                                                return (
                                                                    <p className="size" key={s} style={{backgroundColor:size===(s.size) && "grey"}} onClick={()=>setSize(s.size)}>{s.size}</p>
                                                                   
                                                                );
                                                            })
                                                        }
    
    
                                                    </div>
    
                                                   { sizeerror && !size&&<h4>select size</h4>}
                                                    <div className='header_cart_wish_button'>
                                                    <button onClick={()=>handlecart(outer.id,inner.id,inner.imgs,inner.single_product_category,inner.product_price)}><ShoppingCartIcon/></button>
                                                    {  !isProductInWish(outer.id,inner.id)?
                                                    <button onClick={()=>handlewish(outer.id,inner.id,inner.imgs,inner.single_product_category,inner.product_price)}>{loader   ?'ADDING...':<FaHeart/>}</button>:
                                                    <button onClick={() => window.location.href='/wish'}>Go To Wish </button>
                                                    }
                                                    </div>
                                                    
                                                </div>
                                                </>
                                                    );
                                                })
                                            }
                                            </>
                                        );
                                    })
                                }
                            </>
                        );
                    })
            }
        </div>
    );
}

export default Single;
