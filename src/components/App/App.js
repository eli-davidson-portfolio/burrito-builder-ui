import React, { useState, useEffect } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

const App = (props) =>  {
const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
    .then(data => {setOrders(data.orders)})
  },[])

  const handleNewOrder = (newOrder) => {
    console.log("adding Order", newOrder)
    setOrders(prevOrders => [...prevOrders, newOrder])
  }

  useEffect(() => {
      console.log(orders)
  },[orders])

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm handleNewOrder={handleNewOrder}/>
        </header>
      { orders &&  <Orders orders={orders}/>}
      </main>
    )
}


export default App;
