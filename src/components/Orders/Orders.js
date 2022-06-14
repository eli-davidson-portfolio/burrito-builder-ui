import React from 'react';
import './Orders.css';
import { Order } from "../Order/Order"

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <Order key={order.id} name={order.name} ingredients={order.ingredients} />
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;