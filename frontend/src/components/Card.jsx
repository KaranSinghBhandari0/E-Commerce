import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import '../css/card.css';
import { CartContext } from '../context/CartContext';

export default function Card({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card" style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`} > <img src={product.image} className="card-img-top d-block mx-auto" alt="..."/> </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }} > <h5 className="card-title">{product.name}</h5> </Link>
        <p className="card-text">₹ {product.price.toLocaleString('en-IN')}</p>
        <button className="btn" style={{ backgroundColor: '#f000ff', color: 'white' }} onClick={() => {addToCart(product._id,product)}}>Add to cart</button>
      </div>
    </div>
  );
}
