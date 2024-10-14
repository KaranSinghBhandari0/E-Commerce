import { ProductContext } from '../context/ProductContex';
import { useContext, useEffect } from 'react';
import saleImg from '../images/Sale.png';
import Carousel from './Carousel';
import '../css/home.css';
import Card from './Card';

import sports from '../images/sports-equipments.jpg';
import electronics from '../images/electronics.avif';
import furniture from '../images/furniture.avif';
import childCare from '../images/childCare.jpg';
import clothing from '../images/clothing.avif';
import beauty from '../images/beauty.avif';

export default function Home() {
  const { randomProducts, getProducts, handleProduct } = useContext(ProductContext);

  // Initialize Bootstrap tooltips when the component mounts
  useEffect(() => {
    getProducts();

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    
    return () => {
      // Cleanup tooltips when the component unmounts
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);

  // Function to handle image click and hide the tooltip
  const handleImageClick = (category, event) => {
    handleProduct(category);

    // Hide the tooltip manually when the image is clicked
    const tooltip = window.bootstrap.Tooltip.getInstance(event.target);
    if (tooltip) {
      tooltip.hide();
    }
  };

  return (
    <div>
      {/* carousel */}
      <Carousel />

      <br />

      <h3 className='ms-2 mt-3 mb-3'>Shop by Category</h3>

      <div className="category">
        <img src={clothing} alt="Clothing" data-bs-toggle="tooltip" title="Clothing" onClick={(e) => handleImageClick("Clothing", e)} />
        <img src={electronics} alt="Electronics" data-bs-toggle="tooltip" title="Electronics" onClick={(e) => handleImageClick("Electronics", e)} />
        <img src={furniture} alt="Furniture" data-bs-toggle="tooltip" title="Furniture" onClick={(e) => handleImageClick("Furniture", e)} />
        <img src={childCare} alt="Child Care" data-bs-toggle="tooltip" title="Child Care" onClick={(e) => handleImageClick("ChildCare", e)} />
        <img src={sports} alt="Sports" data-bs-toggle="tooltip" title="Sports" onClick={(e) => handleImageClick("Sports", e)} />
        <img src={beauty} alt="Beauty" data-bs-toggle="tooltip" title="Beauty" onClick={(e) => handleImageClick("Beauty", e)} />
      </div>

      <br />

      {/* showing some products */}
      <img src={saleImg} alt="Sale" style={{ height: '100px', width: '100px' }} />
      <div className="products-container mt-3">
        {randomProducts.length > 0 ? (
          randomProducts.slice(4, 8).map((product, index) => (
            <Card key={index} product={product} discount={50} />
          ))
        ) : (
          <div>
          <p>Loading products...</p>
          <h4 style={{ color: 'red' , textAlign: 'center'}}>
          <i className="fa-solid fa-triangle-exclamation"></i>
            The backend may work slowly please be patient (estimated waiting time 1min) 
          </h4>
          </div>
        )}
      </div>
    </div>
  );
}
