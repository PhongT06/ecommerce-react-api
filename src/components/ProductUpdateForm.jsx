import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import NavBar from './NavBar';

function ProductUpdateForm() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
  });
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`);
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:5000/products/${productId}`, productData);
      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center' }}>
        <h1 className='display-4 font-weight-bold mb-4 mt-4' style={{ color: '#5cb874' }}>
          Update Product
        </h1>
      </div>
      <Form className="p-4 border rounded shadow mx-auto my-4 w-50" onSubmit={handleSubmit}>
        <FloatingLabel controlId="productName" label="Product Name" className="mb-3">
          <Form.Control
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="productPrice" label="Price">
          <Form.Control
            type="number"
            name="price"
            step="0.01"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </FloatingLabel>
        <Button variant="outline-success" type="submit" className="mt-3">
          Update Product
        </Button>
      </Form>
    </div>
  );
}

export default ProductUpdateForm;