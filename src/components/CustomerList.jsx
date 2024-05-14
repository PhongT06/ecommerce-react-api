import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ListGroup, Button, Container } from 'react-bootstrap'; 
import axios from 'axios';

// internal imports
import '../App.css'; 
// import CustomerForm from './CustomerForm';
import OrderList from './OrderList';
import NavBar from './NavBar';
import CustomerDetails from './CustomerDetails';

export class CustomerList extends Component {
    // Step 1 of Component LifeCycle: Initialization
    // useState hooks take the place of constructors
    constructor(){
        super();
        this.state = {
            customers: [],
            selectedCustomerId: null,
        }
        this.selectCustomer = this.selectCustomer.bind(this); //makes sure we call this method and ONLY this method
    }
    // Step 2 of Component LifeCycle: Mounting
    // class component method name convention
    // componentDidMount(){
    //     // where any API calls want to be made right away when the page is render
    //     // simulate an API call to fetch customer data 
    //     const fetchedCustomers = [
    //         { id: 1, name: 'Edwin'},
    //         { id: 2, name: 'Alexa'},
    //         { id: 3, name: 'Mary'}
    //     ]
    //     // store this in state management
    //     // Step 3 of Componnent LifeCycle: Updating
    //     this.setState({ customers: fetchedCustomers })
    // }

    async componentDidMount() {
        try {
          const response = await axios.get('http://127.0.0.1:5000/customers');
          const fetchedCustomers = response.data;
          this.setState({ customers: fetchedCustomers });
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      }
    
    // method to update State
    // custom method we made
    // selectCustomer =  (id) => {
    //     console.log(id)
    //     this.setState({ selectedCustomerId: id })
    //     // we are going to also pass id into our parent component
        
    //     // this is being impatient not waiting for state to be set
    //     // this.props.onCustomerSelect( name )
    //     // console.log('customer selected: ', this.state.selectedCustomerId)
    // }
    
    async selectCustomer(id) {
        console.log(id);
        this.setState({ selectedCustomerId: id });

    try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        const selectedCustomer = response.data;
        // Do something with the selected customer data, e.g., update the state or pass it to another component
        } catch (error) {
        console.error('Error fetching customer details:', error);
  }
}

    // Step 4 of Component LifeCycle: Unmounting
    // class component method name convention
    // gets called immediately after mounting method is finished
    componentWillUnmount(){
        // this is where you'd put any cleanup for events or api calls
        console.log('CustomerList Component is being unmounted')
    }
 
  render() {
    
    const { customers, selectedCustomerId } = this.state;

    return (
        <div>
          <NavBar />
            <div style={{ textAlign: 'center'}}>
            <h1 className='display-4 font-weight-bold mb-4 mt-4' style={{ color: '#5cb874' }}>
                Customer Lists
            </h1>
            </div>
          <ListGroup className="border rounded shadow mx-auto my-4 w-50" defaultActiveKey="#link1">
            {customers.map(customer => (
              <ListGroup.Item
                key={customer.customer_id}
                className="d-flex justify-content-around align-items-center"
                action
                onClick={() => this.selectCustomer(customer.customer_id)}
              >
                {customer.name}
                <div>
                  <Button
                    className='ms-4 me-2'
                    as={Link}
                    to={`../edit-customer/${customer.customer_id}`}
                    variant='outline-success'
                  >
                    Edit
                  </Button>
                  <Button
                    className='ms-2'
                    as={Link}
                    to={`/customers/${customer.customer_id}`}
                    variant='outline-primary'
                  >
                    View Details
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {selectedCustomerId && (
            <Container fluid className='d-flex flex-column align-items-center'>
              <h2>Selected Customer: {selectedCustomerId}</h2>
              <OrderList customerId={selectedCustomerId} />
            </Container>
          )}
        </div>
      );
    }
}
    export default CustomerList
    
    




    
    // OLD CustomerList Component
    //     return (
    //         <div>
    //         <NavBar />
    //             <ListGroup className="border rounded mx-auto my-4 w-50" defaultActiveKey="#link1">
    //                {myCustomers.map( customer  => (
    //                 <ListGroup.Item className="d-flex justify-content-around align-items-center"action onClick={() => this.selectCustomer(customer.id)}>
    //                     {customer.name}
    //                     <Button className='ms-4 w-50' as={Link} to={`../edit-customer/${customer.id}`} variant='outline-success'>Edit</Button>
    //                 </ListGroup.Item>
    //                ))}
    //             </ListGroup>
    //             { this.state.selectedCustomerId &&
    //                 <Container fluid className='d-flex flex-column align-items-center'>
    //                     <h2>Selected Customer: {this.state.selectedCustomerId}</h2> 
    //                     <OrderList customerId={this.state.selectedCustomerId} />
    //                 </Container>
    //             }
    //       </div>
    //     )
    //   }
    // }

{/* <div className='customer-list'>
    <h1>All the Customers!</h1>
        <div>
        {myCustomers.map( customer => (
            <div>
                <h3 key={customer.id} className="customer-card" onClick={ () => this.selectCustomer(customer.id) }>
                Customer Name: {customer.name}
                </h3>
                <Link to={`../edit-customer/${customer.id}`}>Edit</Link>
            </div>
        ))}
        </div>  
        { this.state.selectedCustomerId && 
        <div>
            <h2>Selected Customer: {this.state.selectedCustomerId}</h2> 
            <OrderList customerId={this.state.selectedCustomerId} />
        </div>
    }
</div>  */}



// export class CustomerList extends Component {
//     // Step 1 of Component LifeCycle: Initialization
//     constructor(props){
//         super(props);
//         this.state = {
//             customers: [],
//             selectedCustomerId: null
//         }
//     }
//     // Step 2 of Component LifeCycle: Mounting
//     // class component method name convention
//     componentDidMount(){
//         // where any API calls want to be made right away when the page is render
//         // simulate an API call to fetch customer data 
//         const fetchedCustomers = [
//             { id: 1, name: 'Edwin'},
//             { id: 2, name: 'Alexa'},
//             { id: 3, name: 'Mary'}
//         ]
//         // store this in state management
//         // Step 3 of Componnent LifeCycle: Updating
//         this.setState({ customers: fetchedCustomers })
//     }
    
//     // Step 3 of Component LifeCycle: Updating
//     // class component method name convention
//     componentDidUpdate(prevProps, prevState) {
//         // we only call upon props from parent container IF the state changed
//         if (prevState.selectedCustomerId !== this.state.selectedCustomerId){
//             this.props.onCustomerSelect( this.state.selectedCustomerId )
//         }
//     }
    
//     // method to update State
//     // custom method we made
//     selectCustomer =  (id) => {
//         console.log(id)
//         this.setState({ selectedCustomerId: id })
//         // we are going to also pass id into our parent component
        
//         // this is being impatient not waiting for state to be set
//         // this.props.onCustomerSelect( name )
//         // console.log('customer selected: ', this.state.selectedCustomerId)
//     }
    
//     // Step 4 of Component LifeCycle: Unmounting
//     // class component method name convention
//     // gets called immediately after mounting method is finished
//     componentWillUnmount(){
//         // this is where you'd put any cleanup for events or api calls
//         alert('CustomerList Component is being unmounted')
//     }
    
    
//   render() {
    
//     const myCustomers = this.state.customers
//     return (
//       <div className='customer-list'>
//         <CustomerForm />
//         <h1>All the Customers!</h1>
//             <div>
//             {myCustomers.map( customer => (
//                 <h3 className="customer-card" key={customer.id} onClick={ () => this.selectCustomer(customer.id) }>
//                     Customer Name: {customer.name}
//                 </h3>
//             ))}
//             </div>  
//       </div>
//     )
//   }
// }