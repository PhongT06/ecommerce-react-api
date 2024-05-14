import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// internal imports
import './App.css'; //keep as CSS stylesheet so global CSS styling
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import Home from './components/Home';
import NotFound from './components/NotFound';
import CustomerDetails from './components/CustomerDetails';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetails from './components/ProductDetails';
import ProductUpdateForm from './components/ProductUpdateForm';
import OrderForm from './components/OrderForm';
import OrderDetails from './components/OrderDetails';
import OrderList from './components/OrderList';

function App(){
  return (
    <div className="app-container">
      <Routes>
        {/* all different pages now instead of inside a component */}
        <Route path='/' element={<Home />} />
        <Route path='/customers' element={<CustomerList /> } /> 
        <Route path='/add-customer' element={<CustomerForm />} />
        <Route path='/edit-customer/:id' element={<CustomerForm />} />
        <Route path='/customers/:id' element={<CustomerDetails />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/edit-product/:productId" element={<ProductUpdateForm />} />
        <Route path="/orders" component={OrderList} />
        <Route path="/place-order" element={<OrderForm />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/orders/:customerId" element={<OrderList />} />
        {/* catch all the other paths not associated with a page */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

function OrderListWrapper({ match }) {
  const customerId = match.params.customerId;
  return <OrderList customerId={customerId} />;
}

export default App



// OLD App component
// function App(props) {
//   // initializing state with hooks for functional components
//   const [selectedCustomerId, setCustomerId] = useState(null)
  
//   // you don't always need to mount your component if you don't need your component to 
//   // do anything when it initially renders
  
//   // need to be setup this way when we pass a function/event into a child component
//   const handleCustomerSelect = (customerId) => {
//     setCustomerId(customerId)
//   }

//   return (
//     <div className='app-container'>
//       <h1> {props.title} </h1>
//       <CustomerList onCustomerSelect= { handleCustomerSelect } />
//       { selectedCustomerId && 
//         <div>
//           <h2>Selected Customer: {selectedCustomerId}</h2> 
//           <OrderList customerId={selectedCustomerId} />
//         </div>
//       }
//     </div>
//   )
// }