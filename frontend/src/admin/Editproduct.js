import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${productId}`);
        const data = await response.json();
        console.log('Fetched product details:', data);
        setProduct(data);
        setEditedProduct({
          name: data.name || '',
          category: data.category || '',
          price: data.price || '',
          image: data.image || '',
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleInputChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedProduct({
        ...editedProduct,
        image: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Display confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to save changes?');

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedProduct),
        });

        if (response.ok) {
          console.log('Product details updated successfully!');
          // Navigate to ProductList.js after successful update
          window.location.href = '/admin/view-product'; // You can use react-router navigation if available
        } else {
          console.error('Failed to update product details.');
        }
      } catch (error) {
        console.error('Error updating product details:', error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-4">Edit Product</h2>

      <div className="product-details">
        <form onSubmit={handleFormSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={editedProduct.category || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
