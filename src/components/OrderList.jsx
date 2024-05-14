import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

function OrderList() {
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    fetchCustomerOrders();
  }, [customerId]);

  const fetchCustomerOrders = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/orders/${customerId}`);
      setOrders(response.data);

      // Fetch customer details to display their name
      const customerResponse = await axios.get(`http://127.0.0.1:5000/customers/${customerId}`);
      setCustomerName(customerResponse.data.name);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Container fluid className='text-center'>
        <h2>{customerName}'s Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found for this customer.</p>
        ) : (
          <ListGroup className="border rounded mx-auto my-4 w-50">
            {orders.map((order) => (
              <ListGroup.Item
                key={order.order_id}
                className="d-flex justify-content-around align-items-center p-4"
                action
              >
                Order ID: {order.order_id} Date: {order.date}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
    </div>
  );
}

export default OrderList;