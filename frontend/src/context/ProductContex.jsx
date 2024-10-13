import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {setItemWithExpiry, getItemWithExpiry} from '../utils/tokenExpiry'

// Create a context
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const Backend_Url = "https://e-commerce-backend-a5jr.onrender.com";
  const navigate = useNavigate();
  const authToken = getItemWithExpiry('authToken');

  const [randomProducts, setRandomProducts] = useState([]);    // For random home products
  const [product, setProduct] = useState(null);               // For individual product details

  // Get random products on the home page
  const getProducts = async () => {
    try {
      const res = await axios.get(`${Backend_Url}/products/random`);
      if (res.status === 200) {
        setRandomProducts(res.data.products);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products');
    }
  };

  // Fetch random products on mount
  useEffect(() => {
    getProducts();
  }, []);

  // Fetch product details
  const fetchProductDetails = async (id) => {
    try {
      const res = await axios.get(`${Backend_Url}/products/${id}`);
      if (res.status === 200) {
        setProduct(res.data.product); // Set the product details in context
      }
    } catch (error) {
      console.error(error);
      toast.error('Server Error');
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Backend_Url}/products/${id}`, {
        headers: {
          'token': `${authToken}`,
        },
      });
      toast.success('Product Deleted');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Server Error');
    }
  };

  // Create a new product
  const createNew = async (data) => {
    try {
      const res = await axios.post(`${Backend_Url}/products/new`, data, {
        headers: {
          'token': `${authToken}`,
        },
      });
      if (res.status === 200) {
        toast.success('New product added successfully');
        navigate(`/product/${res.data.product._id}`); // Navigate to the newly added product
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Failed to add product");
    }
  };

  // Update a product
  const updateProduct = async (id, data) => {
    try {
      const res = await axios.put(`${Backend_Url}/products/${id}`, data, {
        headers: {
          'token': `${authToken}`,
        },
      });
      if (res.status === 200) {
        toast.success('Product updated successfully!');
        navigate(`/product/${id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Failed to update product");
    }
  };

  // get products by category
  const handleProduct = async (currProduct) => {
    try {
      const response = await axios.get(`${Backend_Url}/products/category/${currProduct}`);
      navigate('/category', { state: { products: response.data.products } });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('No products available');
      } else {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    }
  };

  // buy product
  const handleBuy = async (amount) => {
    if (!getItemWithExpiry('authToken')) {
      toast.error('Login to continue');
      navigate('/login');
      return;
    }
  
    const orderUrl = `${Backend_Url}/payment/create-order`;
  
    try {
      const { data } = await axios.post(orderUrl, { amount }, { headers: { token: `${authToken}` } });
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Test Payment",
        description: "Demo Transaction",
        order_id: data.order.id,
        handler: function (response) {
          // Nested async function to handle the API call
          const savePayment = async () => {
            try {
              await axios.post(
                `${Backend_Url}/payment/save-order`,
                { orderId: data.order.id, paymentId: response.razorpay_payment_id },
                { headers: { token: `${authToken}` } }
              );
              toast.success(`Payment successful`);
            } catch (error) {
              console.error('Error saving payment:', error);
              toast.error('Failed to save payment information');
            }
          };
          savePayment(); // Call the nested async function
        },
        prefill: {
          email: "testuser@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in creating Razorpay order", error);
      toast.error('Failed to create order. Please try again later.');
    }
  };

  // get all orders
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await axios.get(`${Backend_Url}/payment/orders`, {
        headers: { token: `${authToken}` },
      });
      setOrders(res.data.orders);
    } catch (error) {
      toast.error('Server Error');
      console.log(error);
    }
  };

  // fetch order details
  const [orderDetails, setOrderDetails] = useState(null);
  const fetchOrderDetails = async (searchPaymentId) => {
    try {
      const response = await axios.get(`${Backend_Url}/payment/order-details/${searchPaymentId}`);
      setOrderDetails(response.data.orderDetails);
    } catch (error) {
      console.error("Error fetching order details", error);
      toast.error('Failed to fetch order details');
    }
  };

  return (
    <ProductContext.Provider value={{ randomProducts, getProducts, product, fetchProductDetails, handleDelete, createNew, updateProduct, handleProduct, handleBuy, getOrders, orders, fetchOrderDetails, orderDetails  }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
