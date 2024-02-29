import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products'); // Update the URL accordingly
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    // Redirect to EditProduct.js with the product ID as a parameter
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = (productId) => {
    // Show confirmation dialog using alert
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      // Call confirmDelete directly when the user confirms deletion
      confirmDelete(productId);
    }
  };

  const confirmDelete = async (productId) => {
    try {
      // Make a DELETE request to your backend endpoint
      await fetch(`http://localhost:8080/products/${productId}`, {
        method: 'DELETE',
      });

      // Update the state to reflect the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );

      // Close the confirmation dialog
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>All Products</h2>

      <div className="card-container">
        {products.map((product) => (
          <div key={product._id} className="card">
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
            <div className="button-container">
              <button
                className="edit-button px-3 mr-8 bg-blue-500 text-white rounded-md"
                onClick={() => handleEdit(product._id)}
              >
                Edit
              </button>
              <button
                className="delete-button px-3 bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
