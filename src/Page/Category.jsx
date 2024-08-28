import React, { useContext } from 'react';
import MyContext from '../Common/MyContext';
import './Category.scss'; // Import the SCSS file

const Category = () => {
  const { data } = useContext(MyContext);
  return (
    <div className="category-container">
      {data.map((outer) => (
        <>
        <img
          key={outer.id} // Ensure each item has a unique key
          src={outer.home_page_route_category_page_img}
          alt=""
          height={200}
          width={200}
          className="category-image"
          onClick={()=>window.open(`/category/${outer.product_category}`)}
        />
        </>
      ))}
    </div>
  );
};

export default Category;
