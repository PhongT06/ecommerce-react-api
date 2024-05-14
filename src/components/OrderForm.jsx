import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function OrderForm() {
  const [orderData, setOrderData] = useState({
    date: '',
    customer_id: '',
  });
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:5000/orders', orderData);
      alert('Order placed successfully!');
      navigate('/customers');
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Failed to place order: ${error.response.data.message}`);
      } else {
        alert('Failed to place order. Please try again.');
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center' }}>
        <h1 className='display-4 font-weight-bold mb-4 mt-4' style={{ color: '#5cb874' }}>
          Place Order Form
        </h1>
      </div>
      <Form className="p-4 border rounded shadow mx-auto my-4 w-50" onSubmit={handleSubmit}>
        <FloatingLabel controlId="orderDate" label="Order Date" className="mb-3">
          <Form.Control
            type="date"
            name="date"
            value={orderData.date}
            onChange={handleChange}
            placeholder="Select order date"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="orderCustomer" label="Customer">
          <Form.Control
            as="select"
            name="customer_id"
            value={orderData.customer_id}
            onChange={handleChange}
            placeholder="Select a customer"
            required
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.name}
              </option>
            ))}
          </Form.Control>
        </FloatingLabel>
        <Button variant="outline-success" type="submit" className="mt-3">
          Place Order
        </Button>
      </Form>
    </div>
  );
}

export default OrderForm;