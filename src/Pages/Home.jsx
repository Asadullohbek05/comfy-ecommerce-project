import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import img1 from "../Images/1.webp";
import img2 from "../Images/2.webp";
import img3 from "../Images/3.webp";
import img4 from "../Images/4.webp";

function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios("https://strapi-store-server.onrender.com/api/products?featured=true")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (data == null) {
    return <Loader />;
  }
  return (
    <>
      <div className="py-16 flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 flex flex-col justify-center items-start home-content">
          <h1 className="text-6xl max-w-[500px] font-bold home-title">
            We are changing the way people shop
          </h1>
          <p className="max-w-[500px] text-[18px] my-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="carousel  w-full px-4  p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item">
              <img
                src={img1}
                className="rounded-box w-[350px] h-[300px] md:h-[450px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img2}
                className="rounded-box w-[350px] h-[300px] md:h-[450px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img3}
                className="rounded-box w-[350px] h-[300px] md:h-[450px] object-cover"
              />
            </div>
            <div className="carousel-item">
              <img
                src={img4}
                className="rounded-box w-[350px] h-[300px] md:h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-semibold">Featured Products</h2>
        <div className="divider"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 py-12 pb-[100px]">
          {data &&
            data.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  className="card bg-base-100 shadow-xl"
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
                    <p className="mt-2 text-center">
                      ${item.attributes.price / 100}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
