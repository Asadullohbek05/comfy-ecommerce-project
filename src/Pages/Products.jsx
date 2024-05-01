import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { useSelector } from "react-redux";

function Products() {
  const mode = useSelector((state) => state.Furnitures.mode);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowColumn, setRowColumn] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [company, setCompany] = useState("all");
  const [sort, setSort] = useState("a-z");
  const [rangeValue, setRangeValue] = useState(100000);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearch("");
    setCategory("all");
    setCompany("all");
    setSort("a-z");
    setRangeValue(100000);
    setIsChecked(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const api = `https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${sort}&price=${rangeValue}&shipping=${isChecked}`;

    console.log(api);
    axios(api)
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios(
      `https://strapi-store-server.onrender.com/api/products?page=${currentPage}`
    )
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  if (data === null) {
    return <Loader />;
  }

  return (
    <div className="pb-[100px] pt-[30px]">
      <form
        className={
          mode == "light"
            ? `bg-slate-100 forma flex p-5  gap-3 justify-between items-center flex-wrap  rounded-xl`
            : `bg-[#181920] forma flex p-5  gap-3 justify-between items-center flex-wrap rounded-xl`
        }
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Search Product</span>
          </label>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="input input-bordered  w-[250px]"
            value={search}
          />
        </div>
        <div className="form-control">
          <label className="label-text">
            <span className="label">Select Category</span>
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered h-[30px] w-[250px]"
            value={category}
          >
            <option>all</option>
            <option>Tables</option>
            <option>Chairs</option>
            <option>Kids</option>
            <option>Sofas</option>
            <option>Beds</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label-text">
            <span className="label">Select Company</span>
          </label>
          <select
            onChange={(e) => setCompany(e.target.value)}
            className="select select-bordered h-[30px] w-[250px]"
            value={company}
          >
            <option>all</option>
            <option>Modenza</option>
            <option>Luxora</option>
            <option>Artifex</option>
            <option>Sofas</option>
            <option>Comfora</option>
            <option>Homestead</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label-text">
            <span className="label">Sort By</span>
          </label>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered h-[30px] w-[250px]"
            value={sort}
          >
            <option>a-z</option>
            <option>z-a</option>
            <option>high</option>
            <option>low</option>
          </select>
        </div>
        <div>
          <label className="label-text flex justify-between">
            <span className="label">Select Price</span>
            <span className="label">${rangeValue}</span>
          </label>
          <input
            type="range"
            min={100}
            max={100000}
            value={rangeValue}
            onChange={handleRangeChange}
            className="range range-primary w-[250px]"
          />
          <label className="label-text flex justify-end">
            <span className="label font-bold">Max :$10.000</span>
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label flex flex-col w-[250px]">
            <span className="label-text mb-2">Free Shipping</span>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary w-[250px]">
          search
        </button>
        <button
          onClick={handleReset}
          className="btn btn-accent text-white w-[250px]"
        >
          reset
        </button>
      </form>

      <div className="flex justify-between items-center mt-10">
        <h1 className="text-2xl">{data.length} products</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setRowColumn(true)}
            type="button"
            className={
              rowColumn == true
                ? `text-xl btn btn-circle btn-sm btn-primary text-primary-content`
                : `text-xl btn btn-circle btn-sm btn-ghost text-based-content`
            }
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
            </svg>
          </button>

          <button
            onClick={() => setRowColumn(false)}
            type="button"
            className={
              rowColumn == false
                ? `text-xl btn btn-circle btn-sm btn-primary text-primary-content`
                : `text-xl btn btn-circle btn-sm btn-ghost text-based-content`
            }
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="divider"></div>

      <div
        className={
          rowColumn == true
            ? `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-8 pb-12`
            : "products"
        }
      >
        {data &&
          data.map((item) => {
            return (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className={
                  rowColumn == true
                    ? `card bg-base-100 shadow-xl rounded-2xl`
                    : `products-card bg-base-100 shadow-xl rounded-2xl`
                }
              >
                <figure>
                  <img
                    src={item.attributes.image}
                    alt="Shoes"
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="text-xl font-bold text-center mt-1">
                    {item.attributes.title}
                  </h2>
                  <h2 className="text-xl font-bold text-center mt-1">
                    {item.attributes.company}
                  </h2>
                </div>
                <p className="mb-5 text-center">${item.attributes.price}</p>
              </Link>
            );
          })}
      </div>

      <div className="join mt-5 flex justify-end">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="join-item btn"
          disabled={currentPage === 1}
        >
          PREV
        </button>
        <button className="join-item btn">{currentPage}</button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="join-item btn"
          disabled={currentPage === 3}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default Products;
