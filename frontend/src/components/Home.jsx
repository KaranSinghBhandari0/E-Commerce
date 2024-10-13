import { ProductContext } from '../context/ProductContex';
import { useContext, useEffect } from 'react';
import saleImg from '../images/Sale.png';
import Carousel from './Carousel';
import '../css/home.css';
import Card from './Card';

export default function Home() {
  const { randomProducts, getProducts } = useContext(ProductContext);

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {/* carousel */}
      <Carousel />

      <br />

      {/* showing some products */}
      <img src={saleImg} alt="" style={{ height: '100px', width: '100px' }} />
      <div className="products-container mt-3">
        {randomProducts.length > 0 ? ( // Check if products are available
          randomProducts.slice(4, 8).map((product, index) => (
            <Card key={index} product={product} discount={50} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

    </div>
  );
}
