import { ProductContext } from '../context/ProductContex';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, Link } from 'react-router-dom';
import '../css/show.css';
import { CartContext } from '../context/CartContext';
import Spinner from './Spinner'

export default function Show() {
    const { id } = useParams();
    const { isAdmin } = useContext(AuthContext);
    const { fetchProductDetails, handleDelete, product, handleBuy } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchProductDetails(id);
    }, []);

    if(!product) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-3">
                <div className="mx-auto">
                    <Spinner/>
                    <p>Loading Product Details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="card3">
            <img
                src={product.image}
                className="img-fluid"
                alt={product.name}
            />
            <div className="card3-body">
                <h5>{product.name}</h5>
                <span style={{ color: 'green' }}>In stock</span>
                <p>500+ purchased in last 30 days</p>
                <p><b> Price: ₹ {product.price.toLocaleString('en-IN')}</b></p>
                <p><b>Product Description: </b>{product.description}</p>
                <div className="card3-row">
                    <button className="btn btn-success col-md-8 col-12" onClick={() => handleBuy(product.price)}>
                        Buy Now
                    </button>
                    <button className="btn btn-warning col-md-8 col-12" onClick={() => {addToCart(product._id,product)}}>
                        Add to Cart
                    </button>
                </div>
                <br />
                {isAdmin && 
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to={`/edit/${id}`}>
                            <button className="btn btn-primary"><i className="fa-solid fa-pen"></i> Update</button>
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(id)}>
                            <i className="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}
