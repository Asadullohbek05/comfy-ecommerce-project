import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, editItem } from "../Redux/Features/CartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const numItemsInCart = useSelector((state) => state.CartState.cartItems);
  const userData = useSelector((state) => state.Furnitures.userData);
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.CartState
  );

  console.log(cartTotal, shipping, tax, orderTotal);
  console.log(`qoshilgan objectlar:`, numItemsInCart);
  const dispatch = useDispatch();

  const removeItemFromTheCart = (productID) => {
    console.log(productID);
    dispatch(removeItem(productID));
  };
  const handleAmount = (e) => {
    dispatch(editItem(e));
    console.log(e);
  };

  if (numItemsInCart.length == 0) {
    return (
      <h2 className="border-b border-base-300 pb-5 text-3xl font-medium tracking-wider capitalize">
        Your Cart Is Empty
      </h2>
    );
  }
  return (
    <>
      <div className="py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <h2 className="border-b border-base-300 pb-5 text-3xl font-medium tracking-wider capitalize">
              Shopping Cart
            </h2>
            {numItemsInCart &&
              numItemsInCart.map((item) => {
                return (
                  <div
                    className="lg:col-span-8 pt-10 border-b border-base-300"
                    key={item.id}
                  >
                    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap  last:border-b-0">
                      <img
                        src={item.image}
                        alt="avant-garde lamp"
                        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
                      />
                      <div className="sm:ml-16 sm:w-48">
                        <h3 className="capitalize font-medium">{item.title}</h3>
                        <h4 className="mt-2 capitalize text-sm text-neutral-content">
                          {item.company}
                        </h4>
                        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                          color :
                          <span
                            className="badge badge-sm"
                            style={{ backgroundColor: item.productColor }}
                          ></span>
                        </p>
                      </div>
                      <div className="sm:ml-12">
                        <div className="form-control max-w-xs">
                          <label htmlFor="amount" className="label p-0">
                            <span className="label-text">
                              Amount {item.amount}
                            </span>
                          </label>
                          <select
                            onChange={(e) =>
                              handleAmount({
                                productID: item.productID,
                                amount: e.target.value,
                              })
                            }
                            name="amount"
                            id="amount"
                            className="mt-2 select select-base select-bordered select-xs"
                            value={item.amount}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                        <button
                          onClick={() => removeItemFromTheCart(item.productID)}
                          className="mt-2 link link-primary link-hover text-sm"
                        >
                          remove
                        </button>
                      </div>
                      <p className="font-medium sm:ml-auto">
                        ${(item.price / 100).toFixed(2)}
                      </p>
                    </article>
                  </div>
                );
              })}
          </div>
          <div className="lg:col-span-4 lg:pl-4 mt-8 lg:mt-0">
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
            {!userData ? (
              <Link className="btn btn-primary btn-block mt-8" to="/login">
                Please login
              </Link>
            ) : (
              <Link to="/checkout" className="btn btn-primary btn-block mt-8">
                Proceed to checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
