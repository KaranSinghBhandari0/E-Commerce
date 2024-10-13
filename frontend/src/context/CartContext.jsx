import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setItemWithExpiry, getItemWithExpiry } from '../utils/tokenExpiry';

// Create a context
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const Backend_Url = "http://localhost:3000";
  const navigate = useNavigate();
  const authToken = getItemWithExpiry('authToken');

  const [products, setProducts] = useState([]);
  // Function to add a product to the cart
  const addToCart = async (productID, product) => {
    // If not logged in
    if (!authToken) {
      addToGuestCart(productID, product);
      return;
    }

    // If logged in
    try {
      const res = await axios.post(`${Backend_Url}/cart/add`, { productID }, {
        headers: { token: `${authToken}` },
      });
      if (res.status === 200) {
        toast.success('Added to cart');
        await getCartProducts(); // Refresh cart products
      }
    } catch (error) {
      toast.error('Failed to add');
      console.log(error);
    }
  };

  // Function to get cart products
  const getCartProducts = async () => {
    // If not logged in
    if (!authToken) {
      setProducts(getGuestCart()); // Get guest cart products
      return;
    }

    try {
      const res = await axios.get(`${Backend_Url}/cart/getCartProducts`, {
        headers: { token: `${authToken}` },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete a cart item
  const deleteCartItem = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item from your cart?");
    
    if (!confirmDelete) {
      return;
    }

    // If not logged in
    if (!authToken) {
      deleteGuestCart(id);
      await getCartProducts(); // Refresh cart products
      return;
    }

    try {
      const res = await axios.delete(`${Backend_Url}/cart/remove/${id}`, {
        headers: { token: `${authToken}` },
      });
      if (res.status === 200) {
        toast.success('Item removed from cart');
        await getCartProducts(); // Refresh cart products
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update cart quantity
  const updateCartQuantity = async (productId, newQuantity) => {
    // If not logged in
    if (!authToken) {
      updateGuestCart(productId, newQuantity);
      await getCartProducts(); // Refresh cart products
      return;
    }

    try {
      await axios.put(`${Backend_Url}/cart/update`, { productId, quantity: newQuantity }, {
        headers: { token: `${authToken}` },
      });
      await getCartProducts(); // Refresh cart products
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };



  // Function to add guest cart products
  const addToGuestCart = (productID, product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.productID === productID);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ productID, product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Added to cart');
  };

  // Function to get guest cart products
  const getGuestCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
  };

  // Function to delete a product from the guest cart
  const deleteGuestCart = (productID) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Filter out the product to be deleted
    cart = cart.filter(item => item.productID !== productID);
    
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // Function to update quantity in the guest cart
  const updateGuestCart = (productID, newQuantity) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update the quantity of the specified product
    const existingProductIndex = cart.findIndex(item => item.productID === productID);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      toast.error('Product not found');
    }
  };


  return (
    <CartContext.Provider value={{ addToCart, getCartProducts, products, deleteCartItem, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
