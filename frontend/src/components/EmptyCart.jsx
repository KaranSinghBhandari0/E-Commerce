import React from 'react'
import emptyCart from '../images/emptyCart.webp';
import '../css/cart.css'

export default function EmptyCart() {
  return (
    <div className='empty-cart-div mt-3'> 
        <img src={emptyCart} alt="Empty Cart" className='empty-cart' />
        <h3>Your Cart is <span>Empty!</span></h3>
        <p>Please come back after adding some items</p>
        <a href={'/'}>
            <button className='btn btn-success'>Shop now</button>
        </a>
    </div>
  )
}
