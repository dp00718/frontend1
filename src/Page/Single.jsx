import React, { useContext } from 'react';
import MyContext from '../Common/MyContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaHeart } from 'react-icons/fa';
import '../Styles/Singleproduct.scss';  
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { useParams } from 'react-router-dom';

const Single = () => {
    const { showSize,data,sizeerror,handlecart,size,handlewish,isProductInWish,loader } = useContext(MyContext);
    const { category, product } = useParams();

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
                            .filter(inner => inner.single_product_category === product)                  
                            .map((inner) => {
                                return (
                                     <>
                                    <div className="single-product">
                                                    <img src={inner.imgs}  alt="" />
                                                    <div className='single_details'>
                                                    {
                                                        inner.side_imgs.map((inner1) =>{
                                                            return (
                                                            <img className='inner_side' src={inner1.in_imgs} alt="" style={{height:'100px', width:'100px', border:'1px solid black'}}/>
                                                            )
                                                        })
                                                       } 
                                                    <h3>{inner.single_product_category}</h3>
                                                    <p className='product_star'><StarBorderPurple500Icon style={{background:'yellow', fontSize:20,}}/>{inner.rating}</p>
                                                    <p className="price">{inner.product_price}</p>
    
                                                    <span>Sizes:</span>
                                                    <div className="size-list">
                                                        {
                                                            inner.size_main.map((s) => {
                                                                return (
                                                                    <p className="size" key={s} style={{backgroundColor:size===(s.size) && "grey", color:size===s.size && 'white' }} onClick={()=>showSize(s.size)}>{s.size}</p>
                                                                   
                                                                );
                                                            })
                                                        }
    
    
                                                    </div>
    
                                                   { sizeerror && !size&&<h4>select size</h4>}
                                                    <div className='header_cart_wish_button'>
                                                    <button onClick={()=>handlecart(outer.id,inner.id,inner.imgs,inner.single_product_category,inner.product_price)}><ShoppingCartIcon style={{fontSize:20}}/></button>
                                                    {  !isProductInWish(outer.id,inner.id)?
                                                    <button onClick={()=>handlewish(outer.id,inner.id,inner.imgs,inner.single_product_category,inner.product_price)}>{loader   ?'ADDING...':<FaHeart/>}</button>:
                                                    <button onClick={() => window.location.href='/wish'}>Go To Wish </button>
                                                    }
                                                    </div>
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
        </div>
    );
}

export default Single;
