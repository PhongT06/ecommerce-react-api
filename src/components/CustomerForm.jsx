import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';

function CustomerForm() {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCustomerDetails();
    }
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
      setCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (id) {
        // Update existing customer
        await axios.put(`http://127.0.0.1:5000/customers/${id}`, customerData);
        setMessage('Customer updated successfully!');
      } else {
        // Add new customer
        await axios.post('http://127.0.0.1:5000/customers', customerData);
        setMessage('New customer added successfully!');
      }
      setShow(true);
    } catch (error) {
      console.error('Error:', error.response.data);
      setMessage('Error processing your request. Please try again.');
      setShow(true);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center'}}>
            <h1 className='display-4 font-weight-bold mb-4 mt-4' style={{ color: '#5cb874' }}>
                Add/Edit Customer Form
            </h1>
            </div>
      <Form className="p-4 border rounded shadow mx-auto my-5 w-50" onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Name">
          <Form.Control
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPhone" label="Phone" className="my-3">
          <Form.Control
            type="tel"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingEmail" label="Email">
          <Form.Control
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </FloatingLabel>
        <Button type="submit" className="mt-3" variant="outline-success">
          {id ? 'Update Customer' : 'Add Customer'}
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{id ? 'Customer Updated' : 'Customer Added'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => navigate('/customers')}>
            Go to Customers
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomerForm;




















// import React, { useState,  } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios'; 
// import { Form, FloatingLabel, Button, Modal } from 'react-bootstrap';

// // internal imports
// import NavBar from './NavBar';

// function CustomerForm() {
//     // might want props?
//     const [customerData, setCustomerData] = useState({
//         name: '',
//         phone: '',
//         email: ''
//     })
//     const { id } = useParams();
//     const [show, setShow] = useState(false);
//     const [message, setMessage] = useState(''); 

//     // methods to handle closing the Modal and showing the Modal
//     const handleClose = () => setShow(false);
    
    
//     // local to this component only
//     // inline styling 
//     // const formStyles = { 
//     //     display: 'flex', 
//     //     flexDirection: 'column', 
//     //     alignItems: 'start', 
//     //     justifyContent: 'space-between', 
//     //     height: '250px'
//     // }
    
//     const handleChange = (event) => {
//         event.preventDefault();
//         let { name, value } = event.target; // grabbing the name attribute & value attribute & setting to these variable names
//         // using the spread operator ... to grab the data thats ALREADY in customerData
//         const newData = { ...customerData}
//         for (let [key, val] of Object.entries(newData)) {
//             if (key == name) {
//                 newData[key] = value
//             }
//         }
//         console.log(newData)
//         setCustomerData(newData)
//     }
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         let response = null
//         if (id) {
//             response = await axios.put(`http://127.0.0.1:5000/customers/${id}`, customerData); //
//             console.log(response.data) 
//             setMessage('Successfully Updated User!')
//         } else {
//             try {
//                 const response = await axios.post(
//                     'http://127.0.0.1:5000/customers',
//                     customerData,
//                     {
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     }
//                 );
//                 console.log(response.data);
//                 setMessage('Successfully Added New Customer');

//             } catch (error) {
//                 console.error('Error:', error.response.data);
//                 setMessage('Error Processing Your Request. Please Try Again');

//             }
//         }
//             setShow(true)
//     }
//     //         response = await axios.post(`https://httpbin.org/post`, {
//     //             body: customerData, headers: {'Content-Type': "application/json"}
//     //         })
//     //         console.log(response.data)
//     //         setMessage('Successfully Created New User!')
//     //     }
        
//     //     // if (response.status_code == 200){
//     //         setShow(true)   
//     // //     } else {
//     // //         setShow(true)
//     // //         setMessage('Error Processing Your Request. Please Try Again')
//     // //     }
//     // // }
    
//   return (
//     <div>
//         <NavBar />
//         <Form className='p-4 border rounded shadow mx-4 my-4'onSubmit={handleSubmit}>
//             <FloatingLabel
//             controlId="floatingInput"
//             label="Name"
//             >
//                 <Form.Control type="text" name='name' value={customerData.name} onChange={handleChange} placeholder="name@example.com" />
//             </FloatingLabel>
//             <FloatingLabel controlId="floatingPassword" label="Phone" className="my-3">
//                 <Form.Control type="text" name="phone" value={customerData.phone} onChange={handleChange} placeholder="Password" />
//             </FloatingLabel>
//             <FloatingLabel controlId="floatingPassword" label="Email">
//                 <Form.Control type="email" name="email" value={customerData.email} onChange={handleChange} placeholder="Password" />
//             </FloatingLabel>
//             <Button type="submit"  className="mt-3" variant="outline-success">Success</Button>
//         </Form>
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//             <Modal.Title>SUCCESS!!!</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>Woohoo! {message} </Modal.Body>
//             <Modal.Footer>
//             <Button variant="success" onClick={handleClose}>
//                 Close
//             </Button>
//             </Modal.Footer>
//         </Modal>
      
//     </div>
//   )
// }

// export default CustomerForm







{/* <form style={formStyles} onSubmit={handleSubmit}>
    <h3> Add/Edit Customer </h3>
    <label htmlFor='name'>Name:</label>
    <input type='text' name="name" value={customerData.name} onChange={handleChange} />
    <label htmlFor='phone'>Phone:</label>
    <input type='text' name="phone" value={customerData.phone} onChange={handleChange} />
    <label htmlFor='email'>Email:</label>
    <input type='text' name="email" value={customerData.email} onChange={handleChange} />
    <button type='submit'>Submit</button>
</form> */}