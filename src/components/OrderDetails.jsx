import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import NavBar from './NavBar';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (!order) {
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
        <h2>Order Details</h2>
        <Card>
          <Card.Body>
            <Card.Title>Order ID: {order.order_id}</Card.Title>
            <Card.Text>Order Date: {order.date}</Card.Text>
            <Card.Text>Customer: {order.customer.name}</Card.Text>
            <Card.Text>Products:</Card.Text>
            <ListGroup>
              {order.products.map((product) => (
                <ListGroup.Item key={product.product_id}>
                  {product.name} - ${product.price}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default OrderDetails;