import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import '../css/card.css'
import '../css/home.css'

export default function Category() {
    const location = useLocation(); 
    const products = location.state?.products ?? []; // Ensure products is always an array

    return (
        <div className="products-container mt-3">
            {products.length > 0 ? (
                products.map((product, index) => (
                    <Card key={product.id || index} product={product} />
                ))
            ) : (
                <p>No products available for this category.</p>
            )}
        </div>
    );
}
