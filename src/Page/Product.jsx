import React, { useContext } from 'react';
import MyContext from '../Common/MyContext';
import { useParams } from 'react-router-dom';
import './Product.scss';  

const Product = () => {
    const { data } = useContext(MyContext);
    const { category } = useParams();

    return (
        <div className="product">
            {
                data
                    .filter(outer => outer.product_category === category)
                    .map((outer) => {
                        return (
                            <>
                                {
                                    outer.product_container.map((inner) => {
                                        return (
                                            <div className="product-item">
                                                <img src={inner.imgs1} alt="" onClick={()=>window.open(`/category/${outer.product_category}/${inner.product_category_name}`)}/>
                                                <h3>{inner.product_name}</h3>
                                                <p className="price">{inner.product_price}</p>

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

export default Product;
