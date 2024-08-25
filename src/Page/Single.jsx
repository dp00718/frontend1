import React, { useContext } from 'react';
import MyContext from '../Common/MyContext';
import { useParams } from 'react-router-dom';
import './Product.scss';  // Make sure to import the SCSS file

const Single = () => {
    const { data,sizeerror,handlecart,size,setSize,handlewish,isProductInWish,loader } = useContext(MyContext);
    const { category,product } = useParams();


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
                                    .filter(inner=>inner.single_product_category===product)
                                    .map((inner) => {
                                        return (
                                            <div className="product-item">
                                                <img src={inner.imgs} alt="" onClick={()=>window.open(`/category/${outer.product_category}/${inner.single_product_category}`)}/>
                                                <h3>{inner.single_product_category}</h3>
                                                <p className="price">{inner.product_price}</p>

                                                <div className="size-list">
                                                    {
                                                        inner.size_main.map((s) => {
                                                            return (
                                                                <p className="size" style={{backgroundColor:size===(s.size) && "grey"}} onClick={()=>setSize(s.size)}>{s.size}</p>
                                                               
                                                            );
                                                        })
                                                    }


                                                </div>

                                               { sizeerror && !size&&<h4>select size</h4>}

                                                <button onClick={()=>handlecart(outer.id,inner.id,inner.imgs,inner.product_name,inner.product_price)}>Add To Cart</button>
                                                {  !isProductInWish(outer.id,inner.id)?
                                                <button onClick={()=>handlewish(outer.id,inner.id,inner.imgs,inner.product_name,inner.product_price)}>{loader   ?'ADDING...':'Add to Wishlist'}</button>:
                                                <button onClick={() => window.location.href='/wish'}>Go To Wish </button>
                                                }
                                                
                                            </div>
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
