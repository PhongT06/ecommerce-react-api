import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import NavBar from './NavBar';

function CustomerDetails() {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
      alert('Customer deleted successfully!');
      setTimeout(() => {
        navigate('/customers');
      }, 500);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  if (!customer) {
    return (
        <div>
        <NavBar />
            <div style={{ textAlign: 'center'}}>
                <h1 className='display-4 font-weight-bold mb-4 mt-4' style={{ color: '#5cb874' }}>
                    Loading...
                </h1>
        </div>
        </div>
    );
  }

  return (
    <div>
      <NavBar />
        <div style={{ textAlign: 'center'}}>
        <h1 className='display-4 font-weight-bold mb-4 mt-4' style={{ color: '#5cb874' }}>
            Customer Details
        </h1>
        <div className="p-4 border rounded shadow mx-auto my-5 w-50">
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete Customer
        </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;