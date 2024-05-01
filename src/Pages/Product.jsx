import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { addItem } from "../Redux/Features/CartSlice";

function Product() {
  const { id } = useParams();
  const cardItems = useSelector((state) => state.CartState.cartItems);
  console.log(cardItems);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const handleColorClick = (color) => {
    setSelectedColor(color === selectedColor ? null : color);
    setProductColor(color);
  };

  useEffect(() => {
    axios(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  const [productColor, setProductColor] = useState("");
  const [amount, setAmount] = useState(1);

  const CartProduct = {
    // cartID: product.id + productColor,
    productID: Number(id),
    image: data && data.attributes.image,
    title: data && data.attributes.title,
    price: data && data.attributes.price,
    amount: Number(amount),
    productColor,
    company: data && data.attributes.company,
  };
  console.log(CartProduct);

  const addToCart = () => {
    dispatch(addItem({ product: CartProduct }));
  };

  if (data == null) {
    return <Loader />;
  }
  return (
    <div className="pb-[100px]">
      <div className="flex gap-5 justify-between flex-wrap product">
        <img
          className="w-[500px] h-[390px] object-cover rounded-xl"
          src={data.attributes.image && data.attributes.image}
          alt={data.attributes.title}
        />
        <div>
          <h1 className="text-3xl font-semibold">
            {data.attributes.title.toUpperCase()}
          </h1>
          <h2 className="text-2xl my-2 font-semibold">
            {data.attributes.company}
          </h2>
          <h2 className="text-2xl mb-5">${data.attributes.price / 100}</h2>
          <p className="max-w-[500px] text-justify text-[17px]">
            {data.attributes.description}
          </p>
          <p className="text-xl my-3">Colors</p>
          <div className="flex gap-3">
            {data.attributes.colors.map((color, index) => (
              <span
                key={index}
                onClick={() => handleColorClick(color)}
                style={{
                  backgroundColor: color,
                  border:
                    selectedColor === color ? "2px solid #463AA1" : "none",
                }}
                className="w-6 h-6 rounded-[50%] cursor-pointer"
              ></span>
            ))}
          </div>
          <p className="text-xl my-3">Amount</p>
          <select
            onChange={(e) => setAmount(e.target.value)}
            className="select select-info w-full max-w-xs"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
          </select>
          <br />
          <button onClick={addToCart} className="btn btn-primary mt-5">
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
