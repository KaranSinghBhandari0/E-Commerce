import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setItemWithExpiry, getItemWithExpiry } from '../utils/tokenExpiry';
import { ProductContext } from '../context/ProductContex';
import '../css/orders.css';

export default function Orders() {
  const navigate = useNavigate();
  const [searchPaymentId, setSearchPaymentId] = useState('');
  const {getOrders, orders, orderDetails, fetchOrderDetails} = useContext(ProductContext);

  useEffect(() => {
    // if user is not logged in
    if (!getItemWithExpiry('authToken')) {
      toast.error('Login to continue');
      navigate('/login');
      return;
    }
    getOrders();
  }, []);
    
  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrderDetails(searchPaymentId);
  };

  return (
    <div>
      {/* Order details div */}
      <div className="order-details mt-3">
        <h5>Fetch Your Order Details</h5>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder='Enter your payment ID here...'
            value={searchPaymentId}
            onChange={(e) => setSearchPaymentId(e.target.value)}
            required
          />
          <button type="submit" className='btn btn-success'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Order details display */}
        {orderDetails && (
          <div className="mt-3">
            <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
            <p><strong>Payment ID:</strong> {orderDetails.id}</p>
            <p><strong>Amount:</strong> {orderDetails.amount /100}</p>
            <p><strong>Currency:</strong> {orderDetails.currency}</p>
            <p><strong>Status:</strong> {orderDetails.status}</p>
            <p><strong>Date:</strong> {new Date(orderDetails.created_at).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      {/* All orders div */}
      <div className="orders mt-3">
        <h3>Your Orders</h3>
        {orders.length === 0 ? (
          <p>No Orders found...</p>
        ) : (
          orders.map((order, index) => (
            <ul key={index}>
              <li>
                <strong>Order ID:</strong> {order.orderId}
                <br />
                <strong>Payment ID:</strong> {order.paymentId}
              </li>
            </ul>
          ))
        )}
      </div>
    </div>
  );
}
