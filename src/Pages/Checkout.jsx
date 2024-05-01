import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Redux/Features/CartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const numItemsInCart = useSelector((state) => state.CartState.numItemsInCart);
  const numItems = useSelector((state) => state.CartState.cartItems);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.CartState
  );
  const handleOrder = (e) => {
    e.preventDefault();
    const orderDetails = {
      firstName: name,
      address,
      date: new Date().toLocaleTimeString() + " - " + new Date().toDateString(),
      products: numItemsInCart,
      orderTotal: `$${(orderTotal / 100).toFixed(2)}`,
    };
    const orderDetailsString = JSON.stringify(orderDetails);
    localStorage.setItem("orders", orderDetailsString);
    dispatch(clearCart());
    setName("");
    setAddress("");
    localStorage.removeItem("cart");
    toast.success("Your order placed successfully");
    navigate("/orders");
  };

  if (numItems.length == 0) {
    return (
      <h2 className="border-b border-base-300 pb-5 text-3xl font-medium tracking-wider capitalize">
        Your Cart Is Empty
      </h2>
    );
  }
  return (
    <div>
      <section className="align-element pt-5 pb-20">
        <div className="border-b border-base-300 pb-5">
          <h2 className="text-3xl font-medium tracking-wider capitalize">
            place your order
          </h2>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
          <form onSubmit={handleOrder} className="flex flex-col gap-y-4">
            <h4 className="font-medium text-xl capitalize">
              shipping information
            </h4>
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text capitalize">first name</span>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                className="input input-bordered undefined"
                value={name}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="address" className="label">
                <span className="label-text capitalize">address</span>
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                name="address"
                className="input input-bordered undefined"
                value={address}
                required
              />
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary btn-block">
                place your order
              </button>
            </div>
          </form>
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Subtotal</span>
                <span className="font-medium">
                  ${(cartTotal / 100).toFixed(2)}
                </span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Shipping</span>
                <span className="font-medium">
                  ${(shipping / 100).toFixed(2)}
                </span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Tax</span>
                <span className="font-medium">${(tax / 100).toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm mt-4 pb-2">
                <span>Order Total</span>
                <span className="font-medium">
                  ${(orderTotal / 100).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
