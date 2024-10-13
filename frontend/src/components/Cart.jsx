import React, { useState, useContext, useEffect } from 'react'
import '../css/cart.css'
import EmptyCart from './EmptyCart'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { ProductContext } from '../context/ProductContex';
import Spinner from './Spinner'

export default function Cart() {
    const {getCartProducts , products, deleteCartItem, updateCartQuantity} = useContext(CartContext);
    const { handleBuy } = useContext(ProductContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                await getCartProducts();
            } catch (error) {
                console.error("Failed to fetch cart products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCartProducts();
    }, []);
    
    const calculateSubtotal = () => {
        return products.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    if(loading) {
        return (
            <div className="d-flex justify-content-center align-items-center mt-3">
                <div className="mx-auto">
                    <Spinner/>
                    <p>Loading Cart...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='mt-3'>
            <h2 className='ms-2'>Cart</h2>
            {
                products.length === 0 ? <EmptyCart /> : (
                    <div className='cart-parent mt-3'>
                        <div className="items-container">
                            {products.map((item) => (
                                <div className="item" key={item.product._id}>
                                    <img src={item.product.image} alt={item.product.name} />
                                    <div className="item-body">
                                    <h6><Link style={{color: 'black' , textDecoration:'none'}} to={`/product/${item.product._id}`} >{item.product.name}</Link></h6>
                                        <div>
                                            <div className="quantity-controls">
                                                <button onClick={() => updateCartQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateCartQuantity(item.product._id, item.quantity + 1)}>+</button>
                                            </div>
                                            <i className="fa-solid fa-trash" onClick={()=> {deleteCartItem(item.product._id)}}></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="subtotal mt-2">
                            <h5>Subtotal</h5>
                            <p>({products.length} Items)</p>
                            <p>Your Order is eligible for free delivery</p>
                            <button className='btn btn-success' onClick={() => handleBuy(calculateSubtotal())}>₹ {calculateSubtotal()}</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
    
}
