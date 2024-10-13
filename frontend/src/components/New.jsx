import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../context/ProductContex';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/new.css';

export default function New() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { createNew } = useContext(ProductContext);

  // checking admin
  useEffect(() => {
    if(!isAdmin) {
      toast.error('Access Denied');
      navigate('/');
    }
  }, [isAdmin]);

  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null,
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
    }));
  };
    
  const addProduct = async (e) => {
    e.preventDefault();
    setAdding(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('image', formData.image);

      createNew(data);
  }

  return (
    <div className='mt-3' style={{ padding: '0 1rem' }}>
      <h2>Add a New Product</h2>
      <br />
      <div className="new-form col col-12 col-sm-10 col-md-8 col-lg-6">
        <form onSubmit={addProduct}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              min={0}
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              aria-label="Select category"
            >
              <option value="">Select category</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Sports">Sports</option>
              <option value="Beauty">Beauty</option>
              <option value="ChildCare">ChildCare</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input
              className="form-control"
              id="image"
              type="file"
              name="image"
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={adding}>
            {adding ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  )
}
