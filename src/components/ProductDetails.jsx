import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import NavBar from './NavBar';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return (
      <div>
        <NavBar />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div>
        <h2>Product Details</h2>
        <Card>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>Price: ${product.price}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetails;