import React from "react";
import { useSelector } from "react-redux";

function Orders() {
  const ordersFromLocalStorage = localStorage.getItem("orders");
  const orders = JSON.parse(ordersFromLocalStorage);
  console.log(orders);

  return (
    <div>
      <div class="border-b border-base-300 pb-5">
        <h2 class="text-3xl font-medium tracking-wider capitalize">
          Your Orders
        </h2>
      </div>
      <table class="table table-zebra mt-10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Products</th>
            <th>Cost</th>
            <th class="hidden sm:block">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orders && orders.firstName}</td>
            <td>{orders && orders.address}</td>
            <td>{orders && orders.products}</td>
            <td>{orders && orders.orderTotal}</td>
            <td class="hidden sm:block">{orders && orders.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
