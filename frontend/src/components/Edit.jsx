import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContex';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAdmin } = useContext(AuthContext);
    const { updateProduct, fetchProductDetails, product } = useContext(ProductContext);

    // Check if admin
    useEffect(() => {
        if (!isAdmin) {
            toast.error('Access Denied');
            navigate('/');
        }
    }, [isAdmin, navigate]);
    
    const [updating, setUpdating] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
    });

    // Fetch product details
    useEffect(() => {
        fetchProductDetails(id);
    }, [id]);

    // Update local state with fetched product details
    useEffect(() => {
        setData({
            name: product.name || '',
            price: product.price || '',
            description: product.description || '',
            image: null, // Resetting image input
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setData(prevData => ({ ...prevData, image: files[0] }));
        } else {
            setData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);

        // Append new image only if a new one is uploaded
        if(data.image) {
            formData.append('image', data.image);
        }

        await updateProduct(id, formData);
    };

    return (
        <div className="mt-3" style={{ padding: '0 1rem' }}>
            <h2>Edit Product</h2>
            <br />
            <div className="new-form col-12 col-sm-10 col-md-8 col-lg-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={data.name}
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
                            value={data.description}
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
                            value={data.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        {product.image && (
                            <div>
                                <p>Current Image:</p>
                                <img src={product.image} alt="Existing Product" style={{ height: '100px', width: '100px' }} />
                            </div>
                        )}
                        <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={handleChange}
                        />
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={updating}>
                        {updating ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
}
